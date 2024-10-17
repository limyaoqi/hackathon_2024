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
import groupsData from "@/data/groups";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [groups, setGroups] = useState(groupsData);

  return (
    <div className="container mx-auto p-10">
      {/* <div className=" flex justify-between align-middle mb-5"> */}
      <h1 className=" font-bold text-4xl mb-5">Groups</h1>

      {/* <div className=" flex gap-3 w-full justify-end">
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
      </div> */}

      <Table aria-label="table" selectionMode="single" isStriped>
        <TableHeader>
          <TableColumn>NO.</TableColumn>
          <TableColumn>NAME</TableColumn>
          <TableColumn>LEADER</TableColumn>
          <TableColumn>TEAM MEMBERS</TableColumn>
        </TableHeader>
        <TableBody>
          {groups &&
            groups.map((group, idx) => (
              <TableRow
                key={idx}
                className=""
                onClick={() => router.push(`/groups/${group.id}`)}
              >
                <TableCell className=" font-bold">{idx + 1}</TableCell>
                <TableCell>{group.name}</TableCell>
                <TableCell>
                  <User name={group.leader} />
                </TableCell>
                <TableCell className="gap-5 flex flex-col items-start">
                  {group.members &&
                    group.members.map((member, idx) => (
                      <User key={idx} name={member} />
                    ))}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
