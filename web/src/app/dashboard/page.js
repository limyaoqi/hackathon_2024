"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  User,
} from "@nextui-org/react";
import workersData from "@/data/workers";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [workers, setWorkers] = useState(workersData);
  const [sortBy, setSortBy] = useState(false);

  useEffect(() => {
    let sortedWorkers = [...workersData];

    if (sortBy) {
      sortedWorkers = sortedWorkers.sort((a, b) => a.points - b.points);
    } else {
      sortedWorkers = sortedWorkers.sort((a, b) => a.id - b.id);
    }

    setWorkers(sortedWorkers);
  }, [sortBy]);

  return (
    <div class="container mx-auto p-10">
      <div className=" flex justify-between">
        <h1 className=" font-bold text-4xl mb-5">Dashboard</h1>
        <Button color="primary" onClick={() => setSortBy(!sortBy)}>
          {!sortBy ? "Sort By Points" : "Sort By ID"}
        </Button>
      </div>

      <Table
        aria-label="Example static collection table"
        selectionMode="single"
      >
        <TableHeader>
          <TableColumn>{!sortBy ? "ID" : "RANK"}</TableColumn>
          <TableColumn>NAME</TableColumn>
          <TableColumn>POINTS</TableColumn>
        </TableHeader>
        <TableBody>
          {workers &&
            workers.map((worker, idx) => (
              <TableRow key={worker.id}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>
                  <User
                    name={worker.name}
                    // description={"@jrgarciadev"}
                    // avatarProps={{
                    //   src: "https://avatars.githubusercontent.com/u/30373425?v=4",
                    // }}
                  />
                </TableCell>
                <TableCell>{worker.points}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
