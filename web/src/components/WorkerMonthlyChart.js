import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

const WorkerMonthlyChart = ({ data }) => {
  const chartRef = useRef(null);

  const accumulateMonthlyPerformance = (data) => {
    let monthlyData = [];
    let sum = 0;

    data.forEach((d, i) => {
      sum += d.performance;

      if ((i + 1) % 30 === 0 || i === data.length - 1) {
        monthlyData.push(sum);
        sum = 0;
      }
    });

    return monthlyData;
  };

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    const monthlyData = accumulateMonthlyPerformance(data);

    const monthlyChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: [
          "Month 1",
          "Month 2",
          "Month 3",
          "Month 4",
          "Month 5",
          "Month 6",
          "Month 7",
          "Month 8",
          "Month 9",
          "Month 10",
          "Month 11",
          "Month 12",
        ], // X-axis labels for 12 months
        datasets: [
          {
            label: "Monthly Performance",
            data: monthlyData, // Y-axis data: Accumulated performance at the end of each month
            borderColor: "rgba(153, 102, 255, 1)",
            backgroundColor: "rgba(153, 102, 255, 0.2)",
            fill: true,
          },
        ],
      },
      options: {
        scales: {
          x: { display: true, title: { display: true, text: "Month" } },
          y: { display: true, title: { display: true, text: "Performance" } },
        },
      },
    });

    return () => monthlyChart.destroy();
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default WorkerMonthlyChart;
