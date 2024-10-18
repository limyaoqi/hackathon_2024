"use client";

import React, { useState } from "react";

const NextMonthTeam = () => {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Hardcoded team data for next month
  const hardcodedTeams = [
    ["Worker_1", "Worker_3", "Worker_5", "Worker_7", "Worker_9"],
    ["Worker_2", "Worker_4", "Worker_6", "Worker_8", "Worker_10"],
    ["Worker_11", "Worker_12", "Worker_13", "Worker_14", "Worker_15"],
  ];

  const handleFetchTeams = () => {
    setLoading(true);
    setError("");

    // Simulate fetching delay
    setTimeout(() => {
      try {
        // Instead of fetching, we use hardcoded data
        setTeams(hardcodedTeams);
      } catch (err) {
        setError("Error fetching teams. Please try again.");
      } finally {
        setLoading(false);
      }
    }, 1000); // Simulate 1 second delay
  };

  return (
    <div className="container">
      <h1 className="text-center">Team Assignment for Next Month</h1>

      {/* Button to fetch team assignment */}
      <div className="text-center">
        <button
          className="btn btn-primary"
          onClick={handleFetchTeams}
          disabled={loading}
        >
          {loading ? "Fetching Teams..." : "Get Next Month Teams"}
        </button>
      </div>

      {/* Error display */}
      {error && (
        <div className="alert alert-danger text-center mt-3" role="alert">
          {error}
        </div>
      )}

      {/* Display the assigned teams in a table */}
      <div className="team-list mt-5">
        <h3>Assigned Teams:</h3>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Team</th>
              <th>Members</th>
            </tr>
          </thead>
          <tbody>
            {teams.length > 0 ? (
              teams.map((team, index) => (
                <tr key={index}>
                  <td>Team {index + 1}</td>
                  <td>{team.join(", ")}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="text-center">
                  No teams assigned yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NextMonthTeam;
