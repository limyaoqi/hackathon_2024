import numpy as np
import pandas as pd
import xgboost as xgb
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
import matplotlib.pyplot as plt
import time
import joblib  # Import joblib for saving the model

# Step 1: Generate Synthetic Data
np.random.seed(42)

n_workers = 1000  # Increased sample size for better model training
workers = [f'Worker_{i}' for i in range(n_workers)]

data = {
    'worker_1': np.random.choice(workers, n_workers),
    'worker_2': np.random.choice(workers, n_workers),
    'experience_worker_1': np.random.randint(1, 11, n_workers),  # Experience in years
    'experience_worker_2': np.random.randint(1, 11, n_workers),
    'skill_match': np.random.randint(0, 2, n_workers),  # 0 = low skill match, 1 = high skill match
    'task_type': np.random.choice(['harvesting', 'piece-rated', 'fixed-price'], n_workers),
    'past_productivity_worker_1': np.random.randint(50, 101, n_workers),  # Previous productivity score
    'past_productivity_worker_2': np.random.randint(50, 101, n_workers),
    'times_worked_together': np.random.randint(0, 6, n_workers),  # Number of times paired
}

df = pd.DataFrame(data)

# Generate a fake productivity score with some noise
df['productivity_score'] = (
    0.3 * df['experience_worker_1'] + 
    0.3 * df['experience_worker_2'] +
    0.2 * df['skill_match'] + 
    0.1 * df['past_productivity_worker_1'] +
    0.1 * df['past_productivity_worker_2'] +
    np.random.randn(n_workers) * 5
)

# Step 2: Prepare Data for Model
# Encode categorical variables using one-hot encoding
X = pd.get_dummies(df.drop(['worker_1', 'worker_2', 'productivity_score'], axis=1), columns=['task_type'])
y = df['productivity_score']

# Split data into training and testing sets (80% train, 20% test)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Step 3: Baseline Model - Linear Regression
print("Training Linear Regression Model...")
lr_model = LinearRegression()
start_time = time.time()
lr_model.fit(X_train, y_train)
lr_train_time = time.time() - start_time

# Predict using Linear Regression
y_pred_lr = lr_model.predict(X_test)

# Step 4: XGBoost Model
print("Training XGBoost Regressor...")
xgb_model = xgb.XGBRegressor(
    objective='reg:squarederror',
    n_estimators=100,
    learning_rate=0.1,
    max_depth=5,
    random_state=42
)

start_time = time.time()
xgb_model.fit(X_train, y_train)
xgb_train_time = time.time() - start_time

# Predict using XGBoost
y_pred_xgb = xgb_model.predict(X_test)

# Step 5: Calculate Metrics for both models
def evaluate_model(y_test, y_pred, model_name, train_time):
    mse = mean_squared_error(y_test, y_pred)
    rmse = np.sqrt(mse)
    mae = mean_absolute_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)
    
    print(f"{model_name} Results:")
    print(f"Training Time: {train_time:.4f} seconds")
    print(f"RMSE: {rmse:.4f}")
    print(f"MAE: {mae:.4f}")
    print(f"R² Score: {r2:.4f}")
    print("-" * 40)

# Evaluate Linear Regression
evaluate_model(y_test, y_pred_lr, "Linear Regression", lr_train_time)

# Evaluate XGBoost
evaluate_model(y_test, y_pred_xgb, "XGBoost", xgb_train_time)

# Step 6: Hyperparameter Tuning with Grid Search for XGBoost
print("Starting Hyperparameter Tuning for XGBoost...")

param_grid = {
    'n_estimators': [100, 200],
    'learning_rate': [0.05, 0.1, 0.2],
    'max_depth': [3, 5, 7],
    'subsample': [0.8, 1.0],
    'colsample_bytree': [0.8, 1.0]
}

grid_search = GridSearchCV(
    estimator=xgb.XGBRegressor(objective='reg:squarederror', random_state=42),
    param_grid=param_grid,
    cv=5,
    scoring='r2',
    n_jobs=-1,
    verbose=1
)

grid_search.fit(X_train, y_train)
best_params = grid_search.best_params_
print("Best Hyperparameters:", best_params)

# Train the best model
best_xgb_model = grid_search.best_estimator_
start_time = time.time()
best_xgb_model.fit(X_train, y_train)
best_xgb_train_time = time.time() - start_time

# Predict using the tuned XGBoost model
y_pred_best_xgb = best_xgb_model.predict(X_test)

# Evaluate the tuned XGBoost model
evaluate_model(y_test, y_pred_best_xgb, "Tuned XGBoost", best_xgb_train_time)

# Save the best XGBoost model
model_filename = 'best_xgb_model.pkl'
joblib.dump(best_xgb_model, model_filename)
print(f"Model saved as {model_filename}")

# Optional: Display feature importance for the best XGBoost model
# xgb.plot_importance(best_xgb_model)
# plt.show()
