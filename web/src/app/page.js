"use client"

import { useState } from "react";


const mockEmployees = [
  { id: 1, name: 'John Doe', tasksCompleted: 45, productivity: 92, rank: 1 },
  { id: 2, name: 'Jane Smith', tasksCompleted: 42, productivity: 88, rank: 2 },
  { id: 3, name: 'Mike Johnson', tasksCompleted: 38, productivity: 85, rank: 3 },
  { id: 4, name: 'Sarah Wilson', tasksCompleted: 36, productivity: 82, rank: 4 },
];

export default function Home() {
  const [timeRange, setTimeRange] = useState('daily');

  const exportToExcel = () => {
    // Implementation for Excel export would go here
    console.log('Exporting to Excel...');
  };

  return (
    <div className="p-8 space-y-6 bg-gray-50 text-black">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Manager Dashboard</h1>
        <div className="flex items-center gap-4">
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="daily">Daily</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          <button 
            onClick={exportToExcel} 
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export to Excel
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Employees Card */}
        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-gray-600">Total Employees</h3>
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div className="text-2xl font-bold text-gray-900">{mockEmployees.length}</div>
        </div>

        {/* Average Productivity Card */}
        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-gray-600">Average Productivity</h3>
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <div className="text-2xl font-bold text-gray-900">87%</div>
        </div>

        {/* Tasks Completed Card */}
        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-gray-600">Tasks Completed</h3>
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="text-2xl font-bold text-gray-900">161</div>
        </div>
      </div>

      {/* Productivity Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Productivity Trends</h2>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          {/* Placeholder for chart - in production, you might want to implement a pure CSS chart or use a lightweight charting library */}
          <div className="text-gray-500">
            Productivity chart placeholder - implement based on your preferred charting solution
          </div>
        </div>
      </div>

      {/* Employee Rankings Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Employee Rankings</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left py-3 px-4 text-gray-600 font-medium">Rank</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">Name</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">Tasks Completed</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">Productivity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockEmployees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-900 font-medium">{employee.rank}</td>
                  <td className="py-3 px-4 text-gray-900">{employee.name}</td>
                  <td className="py-3 px-4 text-gray-900">{employee.tasksCompleted}</td>
                  <td className="py-3 px-4 text-gray-900">{employee.productivity}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}