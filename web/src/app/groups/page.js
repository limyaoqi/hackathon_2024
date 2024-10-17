"use client";
import { useEffect, useState } from "react";
import { Card, CardBody, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(`http://localhost:5000/teams`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTeams(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) return <p>Loading teams...</p>;
  if (error) return <p>Error fetching teams: {error}</p>;

  return (
    <div className="container mx-auto p-10">
      <h1 className="font-bold text-4xl">Teams</h1>
      <Table aria-label="Team Table">
        <TableHeader>
          <TableColumn>Team ID</TableColumn>
          <TableColumn>Leader</TableColumn>
          <TableColumn>Members</TableColumn>
          <TableColumn>Total Productivity</TableColumn>
          <TableColumn>Last Active Month</TableColumn>
        </TableHeader>
        <TableBody>
          {teams.map((team) => (
            <TableRow key={team.team_id}>
              <TableCell>{team.team_id}</TableCell>
              <TableCell>{team.leader}</TableCell>
              <TableCell>{team.members.join(", ")}</TableCell>
              <TableCell>{team.total_productivity}</TableCell>
              <TableCell>{team.last_active_month}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
