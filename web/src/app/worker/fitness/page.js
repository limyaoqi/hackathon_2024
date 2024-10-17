import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const WorkerFitnessPage = () => {
  // Mocked fitness data
  const fitnessData = {
    move: { progress: 70, calories: 350 }, // Move ring
    exercise: { progress: 50, minutes: 30 }, // Exercise ring
    stand: { progress: 80, hours: 10 }, // Stand ring
    steps: 12300, // Steps count
    distance: 5.4, // Distance in kilometers
    calories: 490, // Calories burned
    duration: 11.5, // Duration of activity in hours
  };

  return (
    <div>
      <h2>Worker Fitness Tracker</h2>

      {/* Activity Rings Section */}
      <div className="rings-section">
        {/* Move Ring */}
        <div>
          <h3>Move</h3>
          <CircularProgressbar
            value={fitnessData.move.progress}
            text={`${fitnessData.move.calories} Cal`}
            styles={buildStyles({
              textColor: "#fff",
              pathColor: "#f54e42",
            })}
          />
        </div>

        {/* Exercise Ring */}
        <div>
          <h3>Exercise</h3>
          <CircularProgressbar
            value={fitnessData.exercise.progress}
            text={`${fitnessData.exercise.minutes} min`}
            styles={buildStyles({
              textColor: "#fff",
              pathColor: "#4caf50",
            })}
          />
        </div>

        {/* Stand Ring */}
        <div>
          <h3>Stand</h3>
          <CircularProgressbar
            value={fitnessData.stand.progress}
            text={`${fitnessData.stand.hours} hrs`}
            styles={buildStyles({
              textColor: "#fff",
              pathColor: "#3e98c7",
            })}
          />
        </div>
      </div>

      {/* Metrics Section */}
      <div className="metrics-section">
        <h3>Steps</h3>
        <p>{fitnessData.steps.toLocaleString()} steps</p>

        <h3>Distance</h3>
        <p>{fitnessData.distance} km</p>

        <h3>Calories Burned</h3>
        <p>{fitnessData.calories} Cal</p>

        <h3>Activity Duration</h3>
        <p>{fitnessData.duration} hours</p>
      </div>
    </div>
  );
};

export default WorkerFitnessPage;
