"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Select,
  SelectItem,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableColumn,
} from "@nextui-org/react";

export default function Home() {
  const router = useRouter();
  const [timeRange, setTimeRange] = useState("daily");
  const [topWorkers, setTopWorkers] = useState([]);
  const [topGroups, setTopGroups] = useState([]);

  useEffect(() => {
    // Fetch top workers from the Flask backend
    fetch("http://localhost:5000/top-workers")
      .then((response) => response.json())
      .then((data) => {
        setTopWorkers(data);
      })
      .catch((error) => console.error("Error fetching workers:", error));

    // Fetch top teams from the Flask backend
    fetch("http://localhost:5000/top-teams")
      .then((response) => response.json())
      .then((data) => {
        setTopGroups(data);
      })
      .catch((error) => console.error("Error fetching teams:", error));
  }, []);

  const exportToExcel = () => {
    // Implementation for Excel export would go here
    console.log("Exporting to Excel...");
  };

  return (
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
            {topWorkers.length}
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

      {/* Productivity Chart */}
      <div className="grid grid-cols-2 gap-5">
        {/* WORKERS */}
        <div className="">
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              Top Workers
            </h2>
            <Button
              size="sm"
              color="primary"
              variant="light"
              onClick={() => router.push("/workers")}
            >
              See More
            </Button>
          </div>

          {/* TABLE */}
          <Table
            aria-label="Example table with custom cells"
            selectionMode="single"
          >
            <TableHeader>
              <TableColumn>RANK</TableColumn>
              <TableColumn>NAME</TableColumn>
              <TableColumn>POINTS</TableColumn>
            </TableHeader>
            <TableBody>
              {topWorkers &&
                topWorkers.map((worker, index) => (
                  <TableRow
                    key={worker.id}
                    onClick={() => router.push(`/workers/${worker.id}`)}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{worker.name}</TableCell>
                    <TableCell>{worker.total_productivity}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>

        {/* GROUPS */}
        <div>
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Groups</h2>
            <Button
              size="sm"
              color="primary"
              variant="light"
              onClick={() => router.push("/groups")}
            >
              See More
            </Button>
          </div>

          {/* TABLE */}
          <Table
            aria-label="Example table with custom cells"
            selectionMode="single"
          >
            <TableHeader>
              <TableColumn>NO.</TableColumn>
              <TableColumn>NAME</TableColumn>
              <TableColumn>LEADER</TableColumn>
            </TableHeader>
            <TableBody>
              {topGroups &&
                topGroups.map((group, index) => (
                  <TableRow
                    key={group.id}
                    onClick={() => router.push(`/groups/${group.id}`)}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{group.team_id}</TableCell>
                    <TableCell>{group.leader}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
