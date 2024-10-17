"use client";
import { useEffect, useState } from "react";
import groupsData from "@/data/groups";
import workersData from "@/data/workers";
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

export default function Group({ params }) {
  const router = useRouter();
  const [group, setGroup] = useState();
  const [workers, setWorkers] = useState();

  useEffect(() => {
    let curGroup = groupsData.find(
      (group) => group.id.toString() === params.id
    );
    setGroup(curGroup);

    let ourWorkers = [];
    for (let worker of workersData) {
      if (
        curGroup.leader === worker.name ||
        curGroup.members.includes(worker.name)
      ) {
        ourWorkers.push(worker);
      }
    }
    setWorkers(ourWorkers);
  }, [params]);

  return (
    group && (
      <div className="container mx-auto p-10">
        <h1 className=" font-bold text-4xl">{group.name}</h1>
        <p className="mb-5">ID: {group.id}</p>

        {/* <div className="flex justify-center"> */}
        <div className="max-w-6xl mx-auto">
          <GroupChart group={group} />
        </div>
        {/* </div> */}

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
            {workers.map((worker) => (
              <TableRow
                key={worker.id}
                className=""
                onClick={() => router.push(`/workers/${worker.id}`)}
              >
                <TableCell className=" font-bold">{worker.id}</TableCell>
                <TableCell>
                  <User name={worker.name} />
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
                <TableCell>
                  <Chip
                    className="capitalize"
                    color={worker.role === "Leader" ? "warning" : "default"}
                    size="sm"
                    variant="flat"
                  >
                    {worker.role}
                  </Chip>
                </TableCell>
                <TableCell>{worker.points}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  );
}
