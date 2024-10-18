import random
import os
import firebase_admin
from firebase_admin import credentials, firestore
from datetime import datetime, timedelta
from dotenv import load_dotenv
from faker import Faker  # Faker for generating realistic names
import joblib  # For loading the model

load_dotenv()

cred_path = os.getenv('FIREBASE_ADMIN_SDK_JSON')

# Firebase setup
cred = credentials.Certificate(cred_path)
firebase_admin.initialize_app(cred)
db = firestore.client()

# Initialize Faker
fake = Faker()


def generate_monthly_productivity():
    """Generate monthly productivity for a team."""
    months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]
    
    # Generate random performance values for each month
    productivity = [
        {"month": month, "performance": random.randint(1000, 16000)} for month in months
    ]
    return productivity

def generate_daily_productivity():
    """Generate daily productivity records for a worker."""
    days = [datetime.now() - timedelta(days=i) for i in range(30)]  # Last 30 days
    daily_productivity = {
        day.strftime('%Y-%m-%d'): random.randint(50, 100) for day in days
    }
    return daily_productivity

def generate_pair_productivity(worker_id, all_workers):
    """Generate productivity scores with other workers for pairing."""
    productivity_scores = {}
    for other_worker in all_workers:
        if other_worker['id'] != worker_id:  # Ensure not pairing with itself
            score = random.randint(60, 100)  # Random score for pairing logic
            productivity_scores[other_worker['id']] = {
                'score': score,
                'times_worked': random.randint(1, 5),
                'last_collaborated': datetime.now() - timedelta(days=random.randint(0, 180))  # Random last collaborated date
            }
    return productivity_scores

def generate_worker_data(worker_id):
    """Generate synthetic data for a worker (without pair productivity)."""
    name = fake.name()  # Use Faker to generate a random name
    age = random.randint(18, 60)  # Random age between 18 and 60
    experience = random.randint(0, 40)  # Random experience between 0 and 40 years
    skill_level = random.choice(['Beginner', 'Intermediate', 'Expert'])  # Skill level
    task_type = random.choice(['harvesting', 'fertilizer_application', 'grass_control', 'security'])  # Random task type

    # Generate productivity scores for specific tasks
    task_productivity = {
        'harvesting': random.randint(50, 100),
        'fertilizer_application': random.randint(50, 100),
        'grass_control': random.randint(50, 100),
        'security': random.randint(50, 100),
    }
    
    # Total productivity score based on an average of task productivities
    total_productivity = sum(task_productivity.values()) / len(task_productivity)
    
    # Daily productivity records
    daily_productivity = generate_daily_productivity()

    # Current date to simulate last active month
    last_active_month = datetime.now().strftime('%Y-%m')

    worker_data = {
        'id': worker_id,
        'name': name,  # Faker generated name
        'age': age,
        'experience': experience,
        'skill_level': skill_level,
        'task_type': task_type,
        'total_productivity': total_productivity,  # Average task productivity score
        'task_productivity': task_productivity,  # Detailed task productivity
        'last_active_month': last_active_month,  # Last active month field
        'daily_productivity': daily_productivity,  # Daily productivity tracking
        'is_active': True,  
        'current_team': {},  # Placeholder for current team assignment
    }
    return worker_data

def assign_pair_productivity(worker_data, all_workers):
    """Add pair productivity to a worker."""
    worker_id = worker_data['id']
    worker_data['productivity_scores'] = generate_pair_productivity(worker_id, all_workers)
    return worker_data

def assign_workers_to_teams(n_workers=100, n_teams=10):
    """Assign workers to teams and save both worker and team data to Firestore."""
    teams = {f'Team_{i}': [] for i in range(1, n_teams + 1)}  # Initialize empty teams

    team_leaders = {}  # To track team leaders for each team

    all_workers = []  # To store all worker data for generating pair productivity

    # First phase: generate worker data
    for i in range(n_workers):
        worker_id = f'Worker_{i}'
        worker_data = generate_worker_data(worker_id)
        all_workers.append(worker_data)  # Store worker data
    
    # Second phase: assign workers to teams and update Firestore with pair productivity
    batch_workers = db.batch()
    
    for worker_data in all_workers:
        worker_id = worker_data['id']
        
        # Assign the worker to a random team
        team_id = random.choice(list(teams.keys()))

        # If the team doesn't have a leader yet, assign this worker as the leader
        if team_id not in team_leaders:
            team_leaders[team_id] = worker_id

        # Add worker to the team (no roles, just list worker IDs)
        teams[team_id].append(worker_id)
        
        # Update worker's current team information
        worker_data['current_team'] = {
            'team_id': team_id,
            'leader': team_leaders[team_id],  # Assign leader for the team
            'members': teams[team_id],  # Include all current team members
        }

        # Now generate pair productivity after all workers are created
        worker_data = assign_pair_productivity(worker_data, all_workers)

        # Save worker data to Firestore using batch
        worker_ref = db.collection('workers').document(worker_id)
        batch_workers.set(worker_ref, worker_data)
    
    # Save teams data in Firestore
    batch_teams = db.batch()
    for team_id, members in teams.items():
        team_productivity = generate_monthly_productivity()  # Generate monthly productivity
        total_productivity = sum([prod['performance'] for prod in team_productivity])  # Calculate total team productivity
        
        team_data = {
            'team_id': team_id,
            'leader': team_leaders[team_id],  # Assign team leader
            'members': members,
            'total_productivity': total_productivity,  # Total productivity over the months
            'productivity': team_productivity,  # Monthly team productivity
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

