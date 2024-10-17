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

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    const weeklyData = getWeeklyData(data);

    const weeklyChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: weeklyData.map((_, index) => `Week ${index + 1}`), // X-axis labels: Week 1, Week 2, ..., Week 52
        datasets: [
          {
            label: "Weekly Performance",
            data: weeklyData, // Y-axis data: Performance per week
            borderColor: "rgba(255, 99, 132, 1)",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            fill: true,
          },
        ],
      },
      options: {
        scales: {
          x: { display: true, title: { display: true, text: "Week" } },
          y: { display: true, title: { display: true, text: "Performance" } },
        },
        responsive: true,
        // maintainAspectRatio: false,
      },
    });

    return () => weeklyChart.destroy();
  }, [data]);

  return (
    <div style={{ overflowX: "auto", width: "100%" }}>
      {" "}
      {/* Adjust width as needed */}
      <canvas ref={chartRef} />
    </div>
  );
};

export default WorkerWeeklyChart;
