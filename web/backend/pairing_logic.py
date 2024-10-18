from datetime import datetime, timedelta
import numpy as np
import joblib

# Constants
THRESHOLD = 6
HIGH_PRODUCTIVITY_THRESHOLD = 8
TEAM_SIZE = 5
COOLDOWN_PERIOD = timedelta(days=90)  # 3 months cooldown period
EXPIRY_PERIOD = timedelta(days=180)  # 6 months expiry period

# Load the trained model (you will need to train and save it separately)
model = joblib.load('best_xgb_model.pkl')

# Prepare input for predictive model (use actual worker data here)
def prepare_input(worker1, worker2):
    # Replace random features with actual worker attributes
    features = {
        'age': worker1['age'],  # Assuming worker1 and worker2 are dictionaries or objects with attributes
        'experience': worker1['experience'],
        'skill_level': worker1['skill_level'],
    }
    return [[features['age'], features['experience'], features['skill_level']]]

# Predict productivity using the model
def predict_productivity(worker1, worker2):
    input_data = prepare_input(worker1, worker2)
    predicted_score = model.predict(input_data)
    return predicted_score[0]

# Determine whether a pair should be reconsidered based on thresholds and time-based logic
def should_reconsider_pair(worker1, worker2, pair_productivity):
    pair = (worker1['id'], worker2['id'])
    if pair in pair_productivity:
        productivity = pair_productivity[pair]['score']
        times_worked = pair_productivity[pair]['times_worked']
        last_collaborated = pair_productivity[pair].get('last_collaborated', datetime.min)

        # Exclude pair if productivity is below threshold and they have worked together multiple times
        if productivity < THRESHOLD and times_worked >= 3:
            if datetime.now() - last_collaborated <= COOLDOWN_PERIOD:
                return False  # Still in cooldown period
        # Reset historical data if collaboration is too old
        if datetime.now() - last_collaborated >= EXPIRY_PERIOD:
            pair_productivity[pair] = {'score': 0, 'times_worked': 0, 'last_collaborated': datetime.min}
    return True

# Form a team around a leader
def form_team(leader, workers, pair_productivity, compatibility_scores):
    team = [leader]
    high_productivity_pairs = []

    # Prioritize workers with high productivity
    for worker in workers:
        if len(team) >= TEAM_SIZE:
            break
        pair = (leader['id'], worker['id'])
        if pair in pair_productivity and pair_productivity[pair]['score'] >= HIGH_PRODUCTIVITY_THRESHOLD:
            high_productivity_pairs.append(worker)

    # Add high-productivity pairs to the team
    team.extend(high_productivity_pairs)

    # Add remaining workers based on compatibility and reconsideration logic
    for worker in workers:
        if len(team) >= TEAM_SIZE:
            break
        if worker not in team and should_reconsider_pair(leader, worker, pair_productivity):
            compatibility_score = compatibility_scores.get((leader['id'], worker['id']), 0)
            if compatibility_score > 5:  # Threshold for compatibility
                team.append(worker)

    return team

# Assign teams based on leaders and remaining workers
def assign_teams(workers, pair_productivity, compatibility_scores):
    # teams = []

    # # Sort workers based on total productivity to select leaders
    # sorted_workers = sorted(workers, key=lambda w: w['total_productivity'], reverse=True)
    # leaders = sorted_workers[:len(workers) // TEAM_SIZE]  # Select top workers as leaders

    # # Form teams around the leaders
    # for leader in leaders:
    #     remaining_workers = [worker for worker in workers if worker not in leaders]
    #     team = form_team(leader, remaining_workers, pair_productivity, compatibility_scores)
    #     teams.append(team)

    #     # Remove selected team members from the pool of remaining workers
    #     workers = [worker for worker in workers if worker not in team]

    return workers

# Adjust teams if productivity is too low
def adjust_teams_if_needed(teams, workers, pair_productivity):
    unassigned_workers = set(workers) - set(sum(teams, []))

    for team in teams:
        team_productivity = sum(pair_productivity.get((team[i]['id'], team[j]['id']), {'score': 0})['score']
                                for i in range(len(team)) for j in range(i + 1, len(team)))

        if team_productivity < THRESHOLD * TEAM_SIZE:
            low_performer = team[-1]
            for replacement in unassigned_workers:
                if predict_productivity(team[0], replacement) > predict_productivity(team[0], low_performer):
                    team.remove(low_performer)
                    team.append(replacement)
                    break

    return teams

# Form teams and adjust them if productivity is too low
def form_and_adjust_teams(workers, pair_productivity, compatibility_scores):
    teams = assign_teams(workers, pair_productivity, compatibility_scores)
    # teams = adjust_teams_if_needed(teams, workers, pair_productivity)
    return teams
