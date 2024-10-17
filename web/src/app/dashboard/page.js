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
  Chip,
} from "@nextui-org/react";
import workersData from "@/data/workers";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [workers, setWorkers] = useState(workersData);
  const [sortBy, setSortBy] = useState("points1");
  const [status, setStatus] = useState();
  const [skillSet, setSkillSet] = useState("all");

  useEffect(() => {
    console.log(status);
    let sortedWorkers = [...workersData];

    if (sortBy === "id") {
      sortedWorkers = sortedWorkers.sort((a, b) => a.id - b.id);
    } else if (sortBy === "points2") {
      sortedWorkers = sortedWorkers.sort((a, b) => a.points - b.points);
    } else {
      sortedWorkers = sortedWorkers.sort((a, b) => b.points - a.points);
    }

    if (status === "true") {
      sortedWorkers = sortedWorkers.filter(
        (worker) => worker.availability === true
      );
    } else if (status === "false") {
      sortedWorkers = sortedWorkers.filter(
        (worker) => worker.availability === false
      );
    }

    if (skillSet != "all") {
      sortedWorkers = sortedWorkers.filter((worker) =>
        worker.skillSet.includes(skillSet)
      );
    }

    setWorkers(sortedWorkers);

    console.log(sortBy);
  }, [sortBy, status, skillSet]);

  return (
    <div className="container mx-auto p-10">
      <div className=" flex justify-between align-middle mb-5">
        <h1 className=" font-bold text-4xl">Dashboard</h1>

        <div className=" flex gap-3 w-full justify-end">
          <Select
            aria-label="sort"
            placeholder="Skillset"
            className="max-w-xs"
            size=""
            variant="faded"
            value={sortBy}
            onChange={(target) => setSkillSet(target.target.value)}
          >
            <SelectItem key="all">All</SelectItem>
            <SelectItem key="Fertilizing">Fertilizing</SelectItem>
            <SelectItem key="Harvesting">Harvesting</SelectItem>
            <SelectItem key="Spraying">Spraying</SelectItem>
          </Select>
          <Select
            aria-label="status"
            placeholder="Status"
            className="max-w-xs"
            size=""
            variant="faded"
            value={sortBy}
            onChange={(target) => setStatus(target.target.value)}
          >
            <SelectItem key={null}>All</SelectItem>
            <SelectItem key={true}>Available</SelectItem>
            <SelectItem key={false}>Not Available</SelectItem>
          </Select>
          <Select
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
      </div>

      <Table aria-label="table" selectionMode="single">
        <TableHeader>
          <TableColumn>RANK</TableColumn>
          <TableColumn>ID</TableColumn>
          <TableColumn>NAME</TableColumn>
          <TableColumn>SKILLSET</TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn>POINTS</TableColumn>
        </TableHeader>
        <TableBody>
          {workers &&
            workers.map((worker) => (
              <TableRow key={worker.id} className="">
                <TableCell className=" font-bold">{worker.rank}</TableCell>
                <TableCell>{worker.id}</TableCell>
                <TableCell>
                  <User
                    name={worker.name}
                    // description={"@jrgarciadev"}
                    // avatarProps={{
                    //   src: "https://avatars.githubusercontent.com/u/30373425?v=4",
                    // }}
                  />
                </TableCell>
                <TableCell>
                  {worker.skillSet &&
                    worker.skillSet.map(
                      (skill, idx) =>
                        skill.toString() != "NaN" && (
                          <Chip
                            className="capitalize"
                            color="primary"
                            size="sm"
                            variant="flat"
                            key={idx}
                          >
                            {skill}
                          </Chip>
                        )
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
                <TableCell>{worker.points}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
