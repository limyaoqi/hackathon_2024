'use client'
import React, { useState } from "react";
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
  Button,
} from "@nextui-org/react";

// Dummy data for workers and teams
const hardcodedTeams = [
  {
    teamId: "Team_1",
    leader: "Worker_A",
    members: [
      {
        worker_id: "Worker_A",
        name: "John Doe",
        highest_task: "harvesting",
        availability: true,
        total_productivity: 85,
      },
      {
        worker_id: "Worker_B",
        name: "Jane Smith",
        highest_task: "fertilizer_application",
        availability: false,
        total_productivity: 70,
      },
      {
        worker_id: "Worker_C",
        name: "Alice Johnson",
        highest_task: "grass_control",
        availability: true,
        total_productivity: 92,
      },
    ],
  },
  {
    teamId: "Team_2",
    leader: "Worker_D",
    members: [
      {
        worker_id: "Worker_D",
        name: "Bob Brown",
        highest_task: "harvesting",
        availability: true,
        total_productivity: 88,
      },
      {
        worker_id: "Worker_E",
        name: "Chris Lee",
        highest_task: "security",
        availability: true,
        total_productivity: 75,
      },
      {
        worker_id: "Worker_F",
        name: "Mary Green",
        highest_task: "fertilizer_application",
        availability: false,
        total_productivity: 63,
      },
    ],
  },
];

const NextMonthTeam = () => {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFetchTeams = () => {
    setLoading(true);
    setError("");

    // Simulate fetching delay
    setTimeout(() => {
      try {
        setTeams(hardcodedTeams);
      } catch (err) {
        setError("Error fetching teams. Please try again.");
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-4">Team Assignment for Next Month</h1>
        <Button
          color="primary"
          onClick={handleFetchTeams}
          isLoading={loading}
        >
          {loading ? "Fetching Teams..." : "Get Next Month Teams"}
        </Button>
      </div>

      {error && (
        <Card className="mb-4">
          <CardBody>
            <p className="text-danger">{error}</p>
          </CardBody>
        </Card>
      )}

      <div className="space-y-8">
        {teams.length > 0 ? (
          teams.map((team) => (
            <Card key={team.teamId}>
              <CardBody>
                <h2 className="text-xl font-bold mb-4">{team.teamId}</h2>
                <Table aria-label={`Team ${team.teamId} members`}>
                  <TableHeader>
                    <TableColumn>WORKER</TableColumn>
                    <TableColumn>SKILLSET</TableColumn>
                    <TableColumn>AVAILABILITY</TableColumn>
                    <TableColumn>ROLE</TableColumn>
                    <TableColumn>POINTS</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {team.members.map((worker) => (
                      <TableRow key={worker.worker_id}>
                        <TableCell>
                          <User
                            name={worker.name}
                            description={worker.worker_id}
                          />
                        </TableCell>
                        <TableCell>
                          <Chip color="primary" size="sm">
                            {worker.highest_task}
                          </Chip>
                        </TableCell>
                        <TableCell>
                          <Chip
                            color={worker.availability ? "success" : "danger"}
                            size="sm"
                          >
                            {worker.availability ? "Available" : "Not Available"}
                          </Chip>
                        </TableCell>
                        <TableCell>
                          <Chip
                            color={worker.worker_id === team.leader ? "warning" : "default"}
                            size="sm"
                          >
                            {worker.worker_id === team.leader ? "Leader" : "Member"}
                          </Chip>
                        </TableCell>
                        <TableCell>
                          <Chip size="sm" variant="flat">
                            {worker.total_productivity}
                          </Chip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardBody>
            </Card>
          ))
        ) : (
          <Card>
            <CardBody>
              <p className="text-center text-gray-500">No teams assigned yet.</p>
            </CardBody>
          </Card>
        )}
      </div>
    </div>
  );
};

export default NextMonthTeam;