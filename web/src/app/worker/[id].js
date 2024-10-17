import { useState } from 'react';

// Mock data - replace with real API data
const mockWorkerData = {
  id: "W123",
  name: "John Smith",
  role: "harvester", // or "security"
  currentTask: "Harvesting Block A",
  startTime: "08:00 AM",
  efficiency: 85,
  // Mock data for heatmap
  activityData: [
    { x: 1, y: 1, value: 80 },
    { x: 1, y: 2, value: 90 },
    { x: 2, y: 1, value: 70 },
    { x: 2, y: 2, value: 85 },
    // Add more data points as needed
  ],
  // Mock data for security route
  routeData: [
    { lat: 0, lng: 0, timestamp: "09:00" },
    { lat: 30, lng: 30, timestamp: "09:30" },
    { lat: 60, lng: 60, timestamp: "10:00" },
    { lat: 90, lng: 90, timestamp: "10:30" },
  ]
};

export default function WorkerDetailPage() {
  const [timeRange, setTimeRange] = useState('today');
  
  // Function to render the heatmap grid for harvesting/fertilizing
  const renderHeatmap = () => {
    const gridSize = 8;
    const cells = [];
    
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        // Calculate intensity based on mock data (replace with real data)
        const intensity = Math.random() * 100;
        const backgroundColor = `rgba(234, 88, 12, ${intensity / 100})`; // Orange with varying opacity
        
        cells.push(
          <div
            key={`${x}-${y}`}
            className="w-12 h-12 border border-gray-200"
            style={{ backgroundColor }}
            title={`Activity Level: ${Math.round(intensity)}%`}
          />
        );
      }
    }
    
    return (
      <div className="grid grid-cols-8 gap-0 bg-white rounded-lg p-2">
        {cells}
      </div>
    );
  };

  // Function to render the security route map
  const renderSecurityMap = () => {
    const mapSize = 400;
    const points = mockWorkerData.routeData;
    
    return (
      <div className="relative w-[400px] h-[400px] bg-gray-100 rounded-lg">
        {/* Map background grid */}
        <div className="absolute inset-0 grid grid-cols-4 grid-rows-4">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="border border-gray-200" />
          ))}
        </div>
        
        {/* Route line */}
        <svg className="absolute inset-0" viewBox="0 0 100 100">
          <path
            d={`M ${points.map(p => `${p.lat} ${p.lng}`).join(' L ')}`}
            fill="none"
            stroke="blue"
            strokeWidth="2"
          />
          {/* Route points */}
          {points.map((point, i) => (
            <g key={i}>
              <circle
                cx={point.lat}
                cy={point.lng}
                r="2"
                fill="blue"
              />
              <text
                x={point.lat + 2}
                y={point.lng - 2}
                className="text-xs"
                fill="gray"
              >
                {point.timestamp}
              </text>
            </g>
          ))}
        </svg>
      </div>
    );
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{mockWorkerData.name}</h1>
          <p className="text-gray-600">ID: {mockWorkerData.id} • {mockWorkerData.role.charAt(0).toUpperCase() + mockWorkerData.role.slice(1)}</p>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2 border rounded-md bg-white shadow-sm"
        >
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-600">Current Task</h3>
          <p className="text-2xl font-bold text-gray-900">{mockWorkerData.currentTask}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-600">Start Time</h3>
          <p className="text-2xl font-bold text-gray-900">{mockWorkerData.startTime}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-600">Efficiency</h3>
          <p className="text-2xl font-bold text-gray-900">{mockWorkerData.efficiency}%</p>
        </div>
      </div>

      {/* Activity Visualization */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Activity Visualization</h2>
        <div className="flex justify-center">
          {mockWorkerData.role === 'harvester' ? (
            <div>
              <h3 className="text-center mb-4 text-gray-600">Area Coverage Heatmap</h3>
              {renderHeatmap()}
              <div className="mt-4 flex justify-center items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-orange-500 opacity-20" />
                  <span className="text-sm text-gray-600">Low Activity</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-orange-500 opacity-60" />
                  <span className="text-sm text-gray-600">Medium Activity</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-orange-500" />
                  <span className="text-sm text-gray-600">High Activity</span>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <h3 className="text-center mb-4 text-gray-600">Security Route Map</h3>
              {renderSecurityMap()}
              <div className="mt-4 text-center text-sm text-gray-600">
                Blue line shows the patrol route • Dots indicate checkpoints
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Progress Metrics */}
      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Progress Metrics</h2>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-600">Task Completion</span>
              <span className="text-sm font-medium text-gray-900">75%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-600">Area Coverage</span>
              <span className="text-sm font-medium text-gray-900">60%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '60%' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}