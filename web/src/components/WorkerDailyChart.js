import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

const WorkerDailyChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    const dailyChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: data.map((d) => `Day ${d.day}`), // X-axis labels: Day 1, Day 2, ..., Day 365
        datasets: [
          {
            label: "Daily Performance",
            data: data.map((d) => d.performance), // Y-axis data: Performance values
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            fill: true,
          },
        ],
      },
      options: {
        scales: {
          x: { display: true, title: { display: true, text: "Day" } },
          y: { display: true, title: { display: true, text: "Performance" } },
        },
      },
    });

    return () => dailyChart.destroy();
  }, [data]);

  return (
    <div>
      <canvas ref={chartRef} />
    </div>
  );
};

export default WorkerDailyChart;

{
  /* <div style={{ overflowX: "auto", width: "100%", height: "100%" }}>
  <div style={{ width: "4500px" }}>
    <canvas ref={chartRef} />
  </div>
</div>; */
}
