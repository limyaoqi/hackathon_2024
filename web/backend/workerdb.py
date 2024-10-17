import random
import os
import firebase_admin
from firebase_admin import credentials, firestore
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

cred_path = os.getenv('FIREBASE_ADMIN_SDK_JSON')

# Firebase setup
cred = credentials.Certificate(cred_path)
firebase_admin.initialize_app(cred)
db = firestore.client()

def generate_worker_data(worker_id):
    """Generate synthetic data for a worker."""
    age = random.randint(18, 60)  # Random age between 18 and 60
    experience = random.randint(0, 40)  # Random experience between 0 and 40 years
    skill_level = random.randint(1, 10)  # Skill level from 1 to 10
    task_type = random.choice(['harvesting', 'piece-rated', 'fixed-price'])  # Random task type
    
    # Generate random productivity scores with 3 partners
    productivity_scores = []
    for partner_id in random.sample(range(100), 3):  # 3 random partners
        score = random.randint(0, 10)  # Random score between 0 and 10
        times_worked = random.randint(1, 5)  # Random number of times worked together
        productivity_scores.append({
            'partner': f'Worker_{partner_id}',
            'score': score,
            'times_worked': times_worked
        })
    
    # Total productivity is the average of the scores
    total_productivity = sum(score['score'] for score in productivity_scores) / len(productivity_scores)
    
    # Current date to simulate last active month
    last_active_month = datetime.now().strftime('%Y-%m')

    worker_data = {
        'worker_id': worker_id,  
        'age': age,
        'experience': experience,
        'skill_level': skill_level,
        'task_type': task_type,
        'productivity_scores': productivity_scores,
        'total_productivity': total_productivity,
        'last_active_month': last_active_month,  # Adding last active month field
        'is_active': True,  
    }
    return worker_data

def assign_workers_to_teams(n_workers=100, n_teams=10):
    """Assign workers to teams and save both worker and team data to Firestore."""
    teams = {f'Team_{i}': [] for i in range(1, n_teams + 1)}  # Initialize empty teams
    
    # Ensure at least one leader per team
    team_leaders_assigned = {team: False for team in teams.keys()}

    # Firebase batch writing for efficiency
    batch_workers = db.batch()
    batch_teams = db.batch()

    # Randomly assign workers to teams
    for i in range(n_workers):
        worker_id = f'Worker_{i}'
        worker_data = generate_worker_data(worker_id)

        # Assign the worker to a random team
        team_id = random.choice(list(teams.keys()))

        # Ensure each team gets one leader, then assign other workers as members
        if not team_leaders_assigned[team_id]:
            role = 'leader'
            team_leaders_assigned[team_id] = True
        else:
            role = 'member'

        # Add worker to the team
        teams[team_id].append({'worker_id': worker_id, 'role': role})
        
        # Update worker's team assignments
        worker_data['team_assignments'] = [{'team_id': team_id, 'role': role}]
        
        # Save worker data to Firestore using batch
        worker_ref = db.collection('workers').document(worker_id)
        batch_workers.set(worker_ref, worker_data)
    
    # Save team data to Firestore using batch
    for team_id, members in teams.items():
        team_productivity = sum(random.randint(0, 10) for _ in members)  # Random team productivity
        team_data = {
            'team_id': team_id,
            'members': members,
            'team_productivity': team_productivity,  # Team productivity
            'last_active_month': datetime.now().strftime('%Y-%m')
        }
        team_ref = db.collection('teams').document(team_id)
        batch_teams.set(team_ref, team_data)
    
    # Commit batch writes to Firestore
    batch_workers.commit()
    batch_teams.commit()

    print(f'Successfully saved {n_workers} workers and {n_teams} teams.')

if __name__ == '__main__':
    assign_workers_to_teams(n_workers=100, n_teams=10)
