from flask import Flask, jsonify
import firebase_admin
import os
from firebase_admin import credentials, firestore
from flask_cors import CORS
from pairing_logic import assign_teams, adjust_teams
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


@app.route('/assign-teams', methods=['GET'])
def assign_teams_route():
    # Retrieve workers from Firestore and extract needed attributes
    workers_ref = db.collection('workers').stream()
    workers = [doc.to_dict()['worker_id'] for doc in workers_ref]  # Example: using 'worker_id' from Firestore data

    # Pull pair_productivity data from Firestore, if available
    # You can add logic to store and retrieve pair productivity data from Firestore if needed
    pair_productivity = {
        # Example: ('Worker_A', 'Worker_B'): {'score': 7, 'times_worked': 2},
    }

    # Call assign_teams to create initial teams based on workers from Firestore
    teams = assign_teams(workers, pair_productivity)

    return jsonify({"teams": teams})

@app.route('/adjust-teams', methods=['POST'])
def adjust_teams_route():
    # Fetch teams from Firestore (you can store teams from previous assignments)
    teams_ref = db.collection('teams').stream()
    teams = [doc.to_dict()['members'] for doc in teams_ref]  # Assuming 'members' field holds team member IDs

    # Fetch unassigned workers
    unassigned_workers_ref = db.collection('workers').where('is_active', '==', True).stream()
    unassigned_workers = [doc.to_dict()['worker_id'] for doc in unassigned_workers_ref if doc.to_dict()['worker_id'] not in teams]

    # Pull pair_productivity data from Firestore, if available
    pair_productivity = {
        # Example: ('Worker_A', 'Worker_B'): {'score': 7, 'times_worked': 2},
    }

    # Adjust teams based on performance
    adjusted_teams = adjust_teams(teams, unassigned_workers, pair_productivity)

    return jsonify({"adjusted_teams": adjusted_teams})


if __name__ == '__main__':
    app.run(debug=True, port=5000)
