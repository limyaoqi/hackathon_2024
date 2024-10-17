const workerProd = [{ day: 1, performance: Math.floor(Math.random() * 7) + 9 }];

// Generate the data and accumulate the performance for each day
for (let day = 2; day <= 365; day++) {
  const previousDayPerformance = workerProd[day - 2].performance; // Get the performance of the previous day
  const newPerformance = Math.floor(Math.random() * 7) + 9; // Generate a random performance for the current day
  const accumulatedPerformance = previousDayPerformance + newPerformance; // Accumulate the performance
  workerProd.push({ day: day, performance: accumulatedPerformance });
}

export default workerProd;
