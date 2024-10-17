"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Select,
  SelectItem,
} from "@nextui-org/react";
import workersData from "@/data/workers";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [workers, setWorkers] = useState(workersData);
  const [sortBy, setSortBy] = useState("points1");

  useEffect(() => {
    let sortedWorkers = [...workersData];

    if (sortBy === "id") {
      sortedWorkers = sortedWorkers.sort((a, b) => a.id - b.id);
    } else if (sortBy === "points2") {
      sortedWorkers = sortedWorkers.sort((a, b) => a.points - b.points);
    } else {
      sortedWorkers = sortedWorkers.sort((a, b) => b.points - a.points);
    }

    setWorkers(sortedWorkers);

    console.log(sortBy);
  }, [sortBy]);

  return (
    <div className="container mx-auto p-10">
      <div className=" flex justify-between align-middle mb-5">
        <h1 className=" font-bold text-4xl">Dashboard</h1>

        <Select
          //   label="Sort By"
          //   labelPlacement="outside"
          aria-label="sort"
          placeholder="Sort By Points (High to Low)"
          className="max-w-xs"
          size=""
          variant="faded"
          value={sortBy}
          onChange={(target) => setSortBy(target.target.value)}
        >
          <SelectItem key="id">Sort By ID</SelectItem>
          <SelectItem key="points1">Sort By Points (High to Low)</SelectItem>
          <SelectItem key="points2">Sort By Points (Low to High)</SelectItem>
        </Select>
      </div>

      <Table
        aria-label="Example static collection table"
        selectionMode="single"
      >
        <TableHeader>
          <TableColumn>{sortBy === "id" ? "ID" : "RANK"}</TableColumn>
          <TableColumn>NAME</TableColumn>
          <TableColumn>POINTS</TableColumn>
        </TableHeader>
        <TableBody>
          {workers &&
            workers.map((worker, idx) => (
              <TableRow key={worker.id} className="">
                <TableCell>
                  {sortBy === "points1" || sortBy === "id"
                    ? idx + 1
                    : Math.abs(idx - 50)}
                </TableCell>
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
