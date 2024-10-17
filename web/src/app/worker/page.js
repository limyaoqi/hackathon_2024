"use client";

import { useEffect, useRef, useState } from "react";
import h337 from "heatmap.js";

// Mock data structure for heatmap
const generateHeatmapData = () => {
  const points = [];
  const size = 50; // Define the grid size
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const value = Math.sin(i / 5) * Math.cos(j / 5) * Math.random(); // Generate some random data
      points.push({
        x: i * 12, // Adjust scaling to canvas size
        y: j * 8,
        value: Math.abs(value) * 100, // Scale value to make it more visible
      });
    }
  }
  return points;
};

const WorkerDetailPage = () => {
  const heatmapContainer = useRef(null);
  const [timeRange, setTimeRange] = useState("today");

  useEffect(() => {
    const container = heatmapContainer.current;

    // Configure the heatmap instance
    const heatmapInstance = h337.create({
      container,
      radius: 20,
      maxOpacity: 0.6,
      gradient: {
        0.2: "blue",
        0.4: "cyan",
        0.6: "green",
        0.8: "yellow",
        1.0: "red",
      },
    });

    // Generate data and set it to heatmap
    const heatmapData = {
      max: 100,
      data: generateHeatmapData(),
    };
    heatmapInstance.setData(heatmapData);
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto bg-gray-100">
      {/* Header section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">John Smith</h1>
          <p className="text-slate-700">ID: W123 • Harvester</p>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2 border rounded-md bg-white shadow-sm text-slate-800 border-gray-300"
        >
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </div>

      {/* Activity Heatmap */}
      <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-slate-800">
          Activity Heatmap
        </h2>
        {/* Center the heatmap using flexbox */}
        <div className="flex justify-center">
          <div
            className="relative"
            ref={heatmapContainer}
            style={{ width: "600px", height: "400px" }}
          ></div>
        </div>

        {/* Legend */}
        <div className="mt-4 flex justify-center items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-600" />
            <span className="text-sm text-slate-700">Low Activity</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-cyan-500" />
            <span className="text-sm text-slate-700">Light Activity</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500" />
            <span className="text-sm text-slate-700">Medium Activity</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-400" />
            <span className="text-sm text-slate-700">High Activity</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500" />
            <span className="text-sm text-slate-700">Intense Activity</span>
          </div>
        </div>
      </div>

      {/* Progress Metrics */}
      <div className="mt-8 bg-white rounded-lg shadow p-6 border border-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-slate-800">
          Progress Metrics
        </h2>
        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-slate-700">
                Area Coverage
              </span>
              <span className="text-sm font-medium text-slate-800">75%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: "75%" }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-slate-700">
                Task Efficiency
              </span>
              <span className="text-sm font-medium text-slate-800">60%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-green-600 h-2.5 rounded-full"
                style={{ width: "60%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerDetailPage;
