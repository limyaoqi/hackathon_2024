"use client";
import { useEffect, useState } from "react";
import { Avatar, Card, CardBody, Chip } from "@nextui-org/react";
import WorkerWeeklyChart from "@/components/WorkerWeeklyChart";
import WorkerMonthlyChart from "@/components/WorkerMonthlyChart";

export default function Worker({ params }) {
  const [worker, setWorker] = useState(null); // Initialize worker as null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkerData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/worker/${params.id}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setWorker(data); // Set the fetched worker data
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkerData();
  }, [params.id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    worker && (
      <div className="container mx-auto p-10">
        <Card>
          <CardBody>
            {/* PROFILE */}
            <div className="flex flex-row justify-between items-center gap-3">
              <div className="flex gap-4 items-center">
                <Avatar className="w-20 h-20 text-large" />
                <div>
                  <h1 className="font-bold text-4xl">{worker.name}</h1>
                  <div className="flex gap-2">
                    <p>ID: {worker.id}</p>
                    <Chip
                      className="capitalize"
                      color="primary"
                      size="sm"
                      variant="flat"
                    >
                      {worker.skill_level}
                    </Chip>
                    <Chip
                      className="capitalize"
                      color={worker.is_active ? "success" : "danger"}
                      size="sm"
                      variant="flat"
                    >
                      {worker.is_active ? "Available" : "Not Available"}
                    </Chip>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                {/* Display tasks and skills */}
                {Object.keys(worker.task_productivity).map((task, idx) => (
                  <Chip className="capitalize" color="primary" variant="flat" key={idx}>
                    {task} ({worker.task_productivity[task]}%)
                  </Chip>
                ))}
              </div>
            </div>

            {/* TEAM INFO */}
            <h2 className="text-center font-bold text-2xl mt-6">
              Team Information
            </h2>
            <div className="mt-4">
              <p>Team ID: {worker.current_team.team_id}</p>
              <p>Leader: {worker.current_team.leader}</p>
              <p>Team Members:</p>
              <ul className="list-disc list-inside">
                {worker.current_team.members.map((member, idx) => (
                  <li key={idx}>{member}</li>
                ))}
              </ul>
            </div>

            {/* PRODUCTIVITY */}
            <h2 className="text-center font-bold text-2xl mt-6">
              Weekly Performance
            </h2>
            <WorkerWeeklyChart
              data={Object.entries(worker.daily_productivity).map(
                ([date, performance]) => ({
                  date,
                  performance,
                })
              )}
            />

            <h2 className="text-center font-bold text-2xl mt-6">
              Monthly Performance
            </h2>
            <WorkerMonthlyChart
              data={Object.entries(worker.daily_productivity).map(
                ([date, performance]) => ({
                  date,
                  performance,
                })
              )}
            />
          </CardBody>
        </Card>
      </div>
    )
  );
}
