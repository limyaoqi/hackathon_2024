"use client";
import { useEffect, useState } from "react";
import workersData from "@/data/workers";
import workerProd from "@/data/workerProd";
import { Avatar, Card, CardBody, Chip } from "@nextui-org/react";
import WorkerDailyChart from "@/components/WorkerDailyChart";
import WorkerMonthlyChart from "@/components/WorkerMonthlyChart";
import WorkerWeeklyChart from "@/components/WorkerWeeklyChart";

export default function Worker({ params }) {
  const [worker, setWorker] = useState();

  useEffect(() => {
    let curWorker = workersData.find((worker) => worker.id === params.id);
    setWorker(curWorker);
  }, [params]);

  return (
    worker && (
      <div className="container mx-auto p-10 ">
        {/* <Card>
          <CardBody> */}
        {/* PROFILE */}
        <div className="flex flex-row justify-between items-center gap-3 px-10">
          <div className="flex gap-4 items-center">
            <Avatar className="w-20 h-20 text-large" />
            <div>
              <h1 className=" font-bold text-4xl">{worker.name}</h1>
              <div className="flex gap-2">
                <p>ID: {worker.id}</p>
                <Chip
                  className="capitalize"
                  color={"primary"}
                  size="sm"
                  variant="flat"
                >
                  {worker.group}
                </Chip>
                <Chip
                  className="capitalize"
                  color={worker.availability ? "success" : "danger"}
                  size="sm"
                  variant="flat"
                >
                  {worker.availability ? "Available" : "Not Available"}
                </Chip>
              </div>
            </div>
            <Card>
              <CardBody className="text-center p-2">
                Rank<span className="font-bold text-3xl">{worker.rank}</span>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="text-center p-2">
                Points
                <span className="font-bold text-3xl">{worker.points}</span>
              </CardBody>
            </Card>
          </div>

          <div className=" flex gap-2">
            {worker.skillSet &&
              worker.skillSet.map(
                (skill, idx) =>
                  skill.toString() != "NaN" && (
                    <Chip
                      className="capitalize"
                      color="primary"
                      variant="flat"
                      key={idx}
                    >
                      {skill}
                    </Chip>
                  )
              )}
          </div>
        </div>

        {/* CHARTS */}
        <h2 className="text-center font-bold text-2xl mt-6">
          Weekly Performance
        </h2>
        <div className="max-w-6xl mx-auto">
          <WorkerWeeklyChart data={workerProd} />
        </div>

        <h2 className="text-center font-bold text-2xl mt-6">
          Monthly Performance
        </h2>
        <div className="max-w-6xl mx-auto">
          <WorkerMonthlyChart data={workerProd} />
        </div>
        {/* </CardBody>
        </Card> */}
      </div>
    )
  );
}
