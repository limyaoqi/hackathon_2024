import joblib

THRESHOLD = 6  # Productivity threshold
TEAM_SIZE = 5  # Number of workers per team

# Load the trained XGBoost model
model = joblib.load('best_xgb_model.pkl')

# Example productivity data structure
pair_productivity = {
    ('A', 'B'): {'score': 7, 'times_worked': 2},
    ('A', 'C'): {'score': 5, 'times_worked': 1},
    ('B', 'C'): {'score': 9, 'times_worked': 3},
}

def prepare_input(worker1, worker2):
    # Dummy data for worker attributes
    # You can replace these values with random or specific values as needed
    features = {
        'age': np.random.randint(20, 50),  # Random age between 20 and 50
        'experience': np.random.randint(1, 11),  # Random experience in years between 1 and 10
        'skill_level': np.random.randint(1, 11),  # Random skill level between 1 and 10
        # Add more attributes as needed
    }
    return [[features['age'], features['experience'], features['skill_level']]]

def should_reconsider_pair(worker1, worker2, pair_productivity):
    pair = (worker1, worker2)
    if pair in pair_productivity:
        productivity = pair_productivity[pair]['score']
        times_worked = pair_productivity[pair]['times_worked']
        if productivity < THRESHOLD and times_worked >= 3:
            return False
        return True
    return True

def predict_productivity(worker1, worker2):
    input_data = prepare_input(worker1, worker2)
    predicted_score = model.predict(input_data)
    return predicted_score[0]

def form_team(leader, workers, pair_productivity):
    team = [leader]
    for worker in workers:
        if len(team) >= TEAM_SIZE:
            break
        if should_reconsider_pair(leader, worker, pair_productivity):
            team.append(worker)
    return team

def assign_teams(workers, pair_productivity):
    teams = []
    leaders = []
    unassigned_workers = workers.copy()

    # Sort unassigned workers based on their total pair productivity
    unassigned_workers.sort(key=lambda x: sum([pair_productivity.get((x, w), {'score': 0})['score'] for w in workers]), reverse=True)

    # Assign leaders for the teams
    for _ in range(len(unassigned_workers) // TEAM_SIZE):
        leader = unassigned_workers.pop(0)
        leaders.append(leader)

    # Form teams based on leaders
    for leader in leaders:
        team = form_team(leader, unassigned_workers, pair_productivity)
        teams.append(team)
        for member in team:
            if member in unassigned_workers:
                unassigned_workers.remove(member)

    return teams

def adjust_teams(teams, unassigned_workers, pair_productivity):
    for team in teams:
        team_productivity = sum([pair_productivity.get((team[i], team[j]), {'score': 0})['score']
                                 for i in range(len(team)) for j in range(i + 1, len(team))])

        if team_productivity < THRESHOLD * TEAM_SIZE:
            low_performer = team[-1]
            for replacement in unassigned_workers:
                if predict_productivity(team[0], replacement) > predict_productivity(team[0], low_performer):
                    team.remove(low_performer)
                    team.append(replacement)
                    break

    return teams
