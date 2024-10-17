"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Card,
  CardBody,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableRow,
  TableHeader,
} from "@nextui-org/react";
import GroupChart from "@/components/GroupChart";

export default function TeamDetails({ params }) {
  const router = useRouter();
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/team/${params.id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTeam(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, [params.team_id]);

  if (loading) return <p>Loading team details...</p>;
  if (error) return <p>Error fetching team details: {error}</p>;
  console.log(team);
  return (
    team && (
      <div className="container mx-auto p-10">
        <h1 className="font-bold text-4xl">{team.team_id}</h1>
        <p className="mb-5">Last Active Month: {team.last_active_month}</p>

        <div className="max-w-6xl mx-auto">
          <GroupChart group={team} />
        </div>

        <Table aria-label="table" selectionMode="single">
          <TableHeader>
            <TableColumn>ID</TableColumn>
            <TableColumn>NAME</TableColumn>
            <TableColumn>SKILLSET</TableColumn>
            <TableColumn>AVAILABILITY</TableColumn>
            <TableColumn>ROLE</TableColumn>
            <TableColumn>POINTS</TableColumn>
          </TableHeader>
          <TableBody>
            {team.members.map((worker) => (
              <TableRow
                key={worker.id}
                onClick={() => router.push(`/workers/${worker.worker_id}`)}
              >
                <TableCell className="font-bold">{worker.worker_id}</TableCell>
                <TableCell>
                  <User name={worker.name} />
                </TableCell>
                <TableCell>
                  {worker.highest_task && (
                    <Chip
                      className="capitalize"
                      color="primary"
                      size="sm"
                      variant="flat"
                      // key={idx}
                    >
                      {worker.highest_task}
                    </Chip>
                  )}
                </TableCell>
                <TableCell>
                  <Chip
                    className="capitalize"
                    color={worker.availability ? "success" : "danger"}
                    size="sm"
                    variant="flat"
                  >
                    {worker.availability ? "Available" : "Not Available"}
                  </Chip>
                </TableCell>
                <TableCell>
                  <Chip
                    className="capitalize"
                    color={
                      worker.worker_id === team.leader ? "warning" : "default"
                    }
                    size="sm"
                    variant="flat"
                  >
                    {worker.worker_id  === team.leader ? "leader" : "member"}
                  </Chip>
                </TableCell>
                <TableCell>{worker.total_productivity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  );
}
