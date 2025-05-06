// components/DashboardPage.js
import React from "react";

const threats = [
  {
    id: 1,
    title: "Malware - endpoint-01",
    severity: "High",
    time: "2025-05-05 10:42",
    status: "Investigating",
  },
  {
    id: 2,
    title: "Unauthorized Access - server-03",
    severity: "Medium",
    time: "2025-05-04 22:15",
    status: "Resolved",
  },
  {
    id: 3,
    title: "Suspicious File - laptop-09",
    severity: "Low",
    time: "2025-05-03 18:30",
    status: "Monitoring",
  },
];

const severityColor = {
  High: "bg-red-600",
  Medium: "bg-yellow-500 text-black",
  Low: "bg-green-600",
};

export default function DashboardPage() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white p-6 font-sans">
      <h1 className="text-3xl font-bold mb-6">Threat Dashboard</h1>

      {/* Summary Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-[#111] p-4 rounded-lg border border-gray-800">
          <h2 className="text-gray-400 text-sm">Total Threats</h2>
          <p className="text-2xl font-semibold mt-2">36</p>
        </div>
        <div className="bg-[#111] p-4 rounded-lg border border-gray-800">
          <h2 className="text-gray-400 text-sm">Critical Alerts</h2>
          <p className="text-2xl font-semibold mt-2 text-red-500">5</p>
        </div>
        <div className="bg-[#111] p-4 rounded-lg border border-gray-800">
          <h2 className="text-gray-400 text-sm">Active Endpoints</h2>
          <p className="text-2xl font-semibold mt-2">27</p>
        </div>
      </div>

      {/* Threat Table */}
      <div className="bg-[#111] p-4 rounded-lg border border-gray-800">
        <h2 className="text-xl font-semibold mb-4">Recent Threats</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-400 border-b border-gray-700">
              <th className="py-2">Title</th>
              <th className="py-2">Severity</th>
              <th className="py-2">Time</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {threats.map((threat) => (
              <tr
                key={threat.id}
                className="border-b border-gray-800 hover:bg-[#1a1a1a] cursor-pointer"
              >
                <td className="py-2">{threat.title}</td>
                <td className="py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${severityColor[threat.severity]}`}
                  >
                    {threat.severity}
                  </span>
                </td>
                <td className="py-2">{threat.time}</td>
                <td className="py-2">{threat.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
