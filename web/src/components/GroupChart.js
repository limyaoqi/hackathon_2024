"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const GroupChart = ({ group }) => {
  // Extract labels (months) and data (performance)
  const labels = group.productivity.map((entry) => entry.month);
  const performanceData = group.productivity.map((entry) => entry.performance);

  // Calculate the accumulated data
  const accumulatedData = performanceData.reduce((acc, curr, idx) => {
    acc.push((acc[idx - 1] || 0) + curr); // Add previous sum to current value
    return acc;
  }, []);

  const data = {
    labels,
    datasets: [
      {
        label: `${group.name} Productivity`,
        data: performanceData,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        // fill: true,
        pointStyle: "circle",
        pointRadius: 5,
        pointHoverRadius: 10,
        pointBackgroundColor: "rgba(255, 99, 71, 0.6)",
        pointBorderColor: "rgba(255, 99, 71, 1)",
      },
      {
        label: `${group.name} Accumulated Productivity`,
        data: accumulatedData,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        // fill: false,
        pointStyle: "rect",
        pointRadius: 5,
        pointHoverRadius: 10,
        pointBackgroundColor: "rgba(54, 162, 235, 0.6)",
        pointBorderColor: "rgba(54, 162, 235, 1)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Monthly Performance of ${group.name}`,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Months",
        },
      },
      y: {
        title: {
          display: true,
          text: "Performance",
        },
        beginAtZero: true,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default GroupChart;
