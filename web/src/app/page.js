"use client"; // Ensures the component is client-side rendered

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [topWorkers, setTopWorkers] = useState([]);
  const [topTeams, setTopTeams] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch top workers
    fetch("http://localhost:5000/top-workers")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => setTopWorkers(data))
      .catch((error) => setError(error.message));

    // Fetch top teams
    fetch("http://localhost:5000/top-teams")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => setTopTeams(data))
      .catch((error) => setError(error.message));
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      {/* Display error message if fetch fails */}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {/* Left side - Top Workers */}
      <div style={{ width: "45%" }}>
        <h2>Top Workers</h2>
        <ul>
          {topWorkers.length > 0 ? (
            topWorkers.map((worker) => (
              <li key={worker.id}>
                {worker.name} - {worker.rating}
              </li>
            ))
          ) : (
            <p>No workers found</p>
          )}
        </ul>
        <Link href="/workers">See All Workers</Link>
      </div>

      {/* Right side - Top Teams */}
      <div style={{ width: "45%" }}>
        <h2>Top Teams</h2>
        <ul>
          {topTeams.length > 0 ? (
            topTeams.map((team) => (
              <li key={team.id}>
                {team.name} - {team.rating}
              </li>
            ))
          ) : (
            <p>No teams found</p>
          )}
        </ul>
        <Link href="/teams">See All Teams</Link>
      </div>
    </div>
  );
}
