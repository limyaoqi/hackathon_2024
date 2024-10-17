import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

const WorkerWeeklyChart = ({ data }) => {
  const chartRef = useRef(null);

  // Helper function to group data by week (7 days)
  const getWeeklyData = (data) => {
    let weeklyData = [];
    let weeklyPerformance = 0;

    data.forEach((d, i) => {
      weeklyPerformance += d.performance; // Accumulate the performance for the week

      // Every 7 days or at the last day, push the weekly total to the array
      if ((i + 1) % 7 === 0 || i === data.length - 1) {
        weeklyData.push(weeklyPerformance);
        weeklyPerformance = 0; // Reset the weekly performance for the next week
      }
    });

    return weeklyData;
  };

  // Helper function to get the accumulated data
  const getAccumulatedData = (weeklyData) => {
    let accumulatedData = [];
    weeklyData.reduce((acc, current) => {
      const sum = acc + current;
      accumulatedData.push(sum);
      return sum;
    }, 0);
    return accumulatedData;
  };

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    // Get both weekly and accumulated performance data
    const weeklyData = getWeeklyData(data); // Original weekly data
    const accumulatedData = getAccumulatedData(weeklyData); // Accumulated weekly data

    const weeklyChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: weeklyData.map((_, index) => `Week ${index + 1}`), // X-axis labels: Week 1, Week 2, ..., Week N
        datasets: [
          {
            label: "Weekly Performance",
            data: weeklyData, // Y-axis data: Original performance per week
            borderColor: "rgba(75, 192, 192, 1)", // Color for the original data line
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            // fill: true,
            pointStyle: "circle",
            pointRadius: 5,
            pointHoverRadius: 10,
            pointBackgroundColor: "rgba(255, 99, 71, 0.6)",
            pointBorderColor: "rgba(255, 99, 71, 1)",
          },
          {
            label: "Accumulated Performance",
            data: accumulatedData, // Y-axis data: Accumulated performance
            borderColor: "rgba(54, 162, 235, 1)", // Color for the accumulated data line
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            // fill: false,
            pointStyle: "rect",
            pointRadius: 5,
            pointHoverRadius: 10,
            pointBackgroundColor: "rgba(255, 99, 132, 0.5)",
            pointBorderColor: "rgba(255, 99, 132, 1)",
          },
        ],
      },
      options: {
        scales: {
          x: { display: true, title: { display: true, text: "Week" } },
          y: { display: true, title: { display: true, text: "Performance" } },
        },
        responsive: true,
      },
    });

    return () => weeklyChart.destroy();
  }, [data]);

  return (
    <div style={{ overflowX: "auto", width: "100%" }}>
      <canvas ref={chartRef} />
    </div>
  );
};

export default WorkerWeeklyChart;
