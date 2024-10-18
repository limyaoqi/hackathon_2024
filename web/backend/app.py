from flask import Flask, jsonify
import firebase_admin
import os
from firebase_admin import credentials, firestore
from flask_cors import CORS
from pairing_logic import form_and_adjust_teams
from datetime import datetime, timedelta
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)
load_dotenv()

cred_path = os.getenv('FIREBASE_ADMIN_SDK_JSON')

# Firebase setup
cred = credentials.Certificate(cred_path)
firebase_admin.initialize_app(cred)
db = firestore.client()

def get_current_month():
    """Returns the current month and year as a tuple (YYYY-MM). """
    now = datetime.now()
    return now.strftime("%Y-%m")

def get_past_months(months):
    """Returns the date (YYYY-MM) for the past 'months' months ago."""
    now = datetime.now()
    past_date = now - timedelta(days=months*30)  # Roughly 30 days per month
    return past_date.strftime("%Y-%m")

@app.route('/top-workers', methods=['GET'])
def get_top_workers():
    # Retrieve the top 10 workers based on their productivity for the current period (5 months)
    current_month = get_current_month() 
    past_five_months = get_past_months(5)
    
    workers_ref = db.collection('workers').where('last_active_month', '>=', past_five_months)\
                     .order_by('total_productivity', direction=firestore.Query.DESCENDING).limit(10)
    
    workers = [doc.to_dict() for doc in workers_ref.stream()]
    if not workers:
        return jsonify({"message": "No workers found!"})
    return jsonify(workers)

@app.route('/top-teams', methods=['GET'])
def get_top_teams():
    # Retrieve the top 10 teams based on team productivity for the current period (5 months)
    current_month = get_current_month()
    past_five_months = get_past_months(5)
    
    teams_ref = db.collection('teams').where('last_active_month', '>=', past_five_months) \
                    .order_by('total_productivity', direction=firestore.Query.DESCENDING) \
                    .limit(10)
    
    teams = [doc.to_dict() for doc in teams_ref.stream()]
    if not teams:
        return jsonify({"message": "No teams found!"})
    return jsonify(teams)


@app.route('/worker/<worker_id>', methods=['GET'])
def get_worker(worker_id):
    worker_ref = db.collection('workers').document(worker_id)
    worker = worker_ref.get()

    if worker.exists:
        worker_data = worker.to_dict()
        if 'team_assignments' in worker_data and worker_data['team_assignments']:
            # Fetch the first team
            team_id = worker_data['team_assignments'][0].get('team_id')
            team_ref = db.collection('teams').document(team_id)
            team = team_ref.get()

            if team.exists:
                team_data = team.to_dict()
                # Add team information to the worker data
                worker_data['team_info'] = {
                    'team_id': team_data['team_id'],
                    'leader': next((member['worker_id'] for member in team_data['members'] if member['role'] == 'leader'), None),
                    'members': [member['worker_id'] for member in team_data['members']],
                    'productivity': team_data['productivity']  # Monthly productivity data
                }
            else:
                worker_data['team_info'] = "No team found"
        return jsonify(worker_data), 200
    else:
        return jsonify({'error': 'Worker not found'}), 404


@app.route('/worker/<worker_id>/performance', methods=['GET'])
def get_worker_performance(worker_id):
    # Fetch worker data from Firestore
    worker_ref = db.collection('workers').document(worker_id)
    worker = worker_ref.get()

    if not worker.exists:
        return jsonify({"message": "Worker not found!"}), 404

    worker_data = worker.to_dict()

    # Use actual daily productivity data stored in Firestore
    worker_prod = worker_data.get('daily_productivity', {})

    return jsonify({
        "worker_id": worker_id,
        "name": worker_data.get("name"),
        "performance": worker_prod
    })

@app.route('/teams', methods=['GET'])
def get_all_teams():
    teams_ref = db.collection('teams')
    teams = teams_ref.stream()
    
    all_teams = []
    
    for team in teams:
        team_data = team.to_dict()
        all_teams.append({
            "team_id": team_data['team_id'],
            "leader": team_data['leader'],
            "members": team_data['members'],
            "total_productivity": team_data['total_productivity'],
            "last_active_month": team_data['last_active_month'],
            "productivity": team_data['productivity']  # assuming this is a list of monthly performance
        })
    
    return jsonify(all_teams), 200


@app.route('/team/<team_id>', methods=['GET'])
def get_team(team_id):
    team_ref = db.collection('teams').document(team_id)
    team = team_ref.get()

    if team.exists:
        team_data = team.to_dict()
        
        leader = team_data.get('leader')  # Directly accessing the leader string
        members = team_data.get('members', [])  # List of member IDs

        # Initialize a list to hold member data
        member_data_list = []

        # Fetch each member's data
        for member_id in members:
            member_ref = db.collection('workers').document(member_id)
            member = member_ref.get()

            if member.exists:
                member_data = member.to_dict()
                
                # Calculate total productivity and get highest task productivity
                task_productivity = member_data.get('task_productivity', {})
                total_productivity = member_data.get('total_productivity', 0)
                highest_task = max(task_productivity, key=task_productivity.get) if task_productivity else None
                highest_productivity = task_productivity[highest_task] if highest_task else None

                member_data_list.append({
                    "worker_id": member_id,
                    "name": member_data.get('name'),  # Assuming there's a name field
                    "skill_level": member_data.get('skill_level'),  # Assuming there's a skill level field
                    "experience": member_data.get('experience'),  # Assuming there's an experience field
                    "total_productivity": total_productivity,  # Total productivity of the worker
                    "highest_task": highest_task,  # Task with the highest productivity
                    "highest_productivity": highest_productivity  # Highest productivity score
                })
            else:
                # If a member does not exist, handle accordingly
                member_data_list.append({
                    "worker_id": member_id,
                    "error": "Worker not found"
                })

        # Return structured response with member data
        return jsonify({
            "team_id": team_data.get('team_id'),
            "leader": leader,
            "members": member_data_list,  # List of member data
            "productivity": team_data.get('productivity', []),  # Monthly productivity data
            "total_productivity": team_data.get('total_productivity'),  # Total productivity
            "last_active_month": team_data.get('last_active_month')  # Last active month
        }), 200
    else:
        return jsonify({'error': 'Team not found'}), 404

@app.route('/assign-team', methods=['Get'])
def fetch_data_from_firestore():
    workers = []
    pair_productivity = {}
    compatibility_scores = {}

    # Fetch workers from Firestore
    workers_ref = db.collection('workers')
    workers_docs = workers_ref.stream()

    for doc in workers_docs:
        worker_data = doc.to_dict()
        
        # Use 'id' as the key for worker ID (based on your example data)
        # worker_id = worker_data['id']  # Changed from 'worker_id' to 'id'
        workers.append(worker_data)

        # Add pair productivity from each worker's productivity_scores
        # Ensure productivity_scores contains dictionaries, not strings
        for partner_id, prod_data in worker_data.get('productivity_scores', {}).items():
            if isinstance(prod_data, dict):  # Check if it's a dictionary
                pair_key = f'({worker_id}, {partner_id})'
                pair_productivity[pair_key] = {
                    'score': prod_data.get('score'),  # Ensure we access it properly
                    'times_worked': prod_data.get('times_worked'),
                    'last_collaborated': prod_data.get('last_collaborated')
                }
        
        

        # Add compatibility scores (ensure it's a dictionary)
        for partner_id, comp_data in worker_data.get('compatibility_scores', {}).items():
            if isinstance(comp_data, dict):  # Check if it's a dictionary
                compatibility_scores[(worker_id, partner_id)] = comp_data.get('score')

    return workers, pair_productivity, compatibility_scores


@app.route('/assign-teams', methods=['Get'])
def assign_and_adjust_teams():
    try:
        # Fetch workers, pair productivity, and compatibility scores from Firestore
        workers, pair_productivity, compatibility_scores = fetch_data_from_firestore()

        # Call the logic to form and adjust teams
        teams = form_and_adjust_teams(workers, pair_productivity, compatibility_scores)

        return jsonify(teams)
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)
