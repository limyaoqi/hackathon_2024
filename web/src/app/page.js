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

      {/* Productivity Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">
          Productivity Trends
        </h2>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          {/* Placeholder for chart - in production, you might want to implement a pure CSS chart or use a lightweight charting library */}
          <div className="text-gray-500">
            Productivity chart placeholder - implement based on your preferred
            charting solution
          </div>
        </div>
      </div>

      {/* Employee Rankings Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">
            Employee Rankings
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left py-3 px-4 text-gray-600 font-medium">
                  Rank
                </th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">
                  Name
                </th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">
                  Tasks Completed
                </th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">
                  Productivity
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockEmployees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-900 font-medium">
                    {employee.rank}
                  </td>
                  <td className="py-3 px-4 text-gray-900">{employee.name}</td>
                  <td className="py-3 px-4 text-gray-900">
                    {employee.tasksCompleted}
                  </td>
                  <td className="py-3 px-4 text-gray-900">
                    {employee.productivity}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
