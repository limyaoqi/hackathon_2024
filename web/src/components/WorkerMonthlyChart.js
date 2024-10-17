import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

const WorkerMonthlyChart = ({ data }) => {
  const chartRef = useRef(null);

  // Accumulate performance data for each month
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

  // Accumulate performance over months
  const accumulateOverMonths = (monthlyData) => {
    let accumulatedData = [];
    let runningTotal = 0;

    monthlyData.forEach((monthlyPerformance) => {
      runningTotal += monthlyPerformance; // Accumulate the performance over months
      accumulatedData.push(runningTotal); // Store the accumulated total
    });

    return accumulatedData;
  };

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    const monthlyData = accumulateMonthlyPerformance(data);
    const accumulatedMonthlyData = accumulateOverMonths(monthlyData);

    const monthlyChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        datasets: [
          {
            label: "Monthly Performance",
            data: monthlyData,
            borderColor: "rgba(153, 102, 255, 1)",
            backgroundColor: "rgba(153, 102, 255, 0.2)",
            pointStyle: "circle",
            pointRadius: 5,
            pointHoverRadius: 10,
            pointBackgroundColor: "rgba(255, 99, 71, 0.6)",
            pointBorderColor: "rgba(255, 99, 71, 1)",
          },
          {
            label: "Accumulated Performance",
            data: accumulatedMonthlyData,
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
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
          x: { display: true, title: { display: true, text: "Month" } },
          y: { display: true, title: { display: true, text: "Performance" } },
        },
        responsive: true,
      },
    });

    return () => monthlyChart.destroy();
  }, [data]);

  return (
    <div style={{ overflowX: "auto", width: "100%" }}>
      <canvas ref={chartRef} />
    </div>
  );
};

export default WorkerMonthlyChart;
