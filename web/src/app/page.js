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
    <div className="container mx-auto p-10">
      {/* TOP */}
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-3xl font-bold w-full">Manager Dashboard</h1>
        <div className="flex items-center gap-4 w-full justify-end">
          <Select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            placeholder="Time Range"
            className="max-w-xs"
          >
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </Select>
          <Button onClick={exportToExcel} color="primary" className="max-w-xs">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Export to Excel
          </Button>
        </div>
      </div>

      {/* MIDDLE */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-5">
        {/* Total Employees Card */}
        <Card className="">
          <CardHeader className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-gray-600">
              Total Employees
            </h3>
            <svg
              className="w-4 h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </CardHeader>
          <CardBody className="text-2xl font-bold">
            {workersData.length}
          </CardBody>
        </Card>

        {/* Average Productivity Card */}
        <Card>
          <CardHeader className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-gray-600">
              Average Productivity
            </h3>
            <svg
              className="w-4 h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
          </CardHeader>
          <CardBody className="text-2xl font-bold text-gray-900">87%</CardBody>
        </Card>

        {/* Tasks Completed Card */}
        <Card>
          <CardHeader className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-gray-600">
              Tasks Completed
            </h3>
            <svg
              className="w-4 h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </CardHeader>
          <CardBody className="text-2xl font-bold text-gray-900">161</CardBody>
        </Card>
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
