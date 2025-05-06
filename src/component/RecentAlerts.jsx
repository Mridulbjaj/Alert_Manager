// components/RecentAlerts.js
import React from "react";

const alerts = [
  {
    id: 1,
    type: "Malware Detection",
    description: "Suspicious file detected on endpoint-01",
    time: "2 mins ago",
    severity: "High",
  },
  {
    id: 2,
    type: "Unauthorized Access",
    description: "Login attempt from unknown IP",
    time: "15 mins ago",
    severity: "Medium",
  },
  {
    id: 3,
    type: "Phishing Attempt",
    description: "Suspicious email flagged by spam filter",
    time: "30 mins ago",
    severity: "Low",
  },
];

export default function RecentAlerts() {
  return (
    <div className="bg-[#111] rounded-lg p-4 border border-gray-800">
      <h3 className="text-lg font-semibold mb-3">Recent Alerts</h3>
      <ul className="divide-y divide-gray-800">
        {alerts.map((alert) => (
          <li key={alert.id} className="py-2">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-semibold text-white">{alert.type}</p>
                <p className="text-xs text-gray-400">{alert.description}</p>
              </div>
              <div className="text-right">
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  alert.severity === "High"
                    ? "bg-red-600 text-white"
                    : alert.severity === "Medium"
                    ? "bg-yellow-500 text-black"
                    : "bg-green-600 text-white"
                }`}>
                  {alert.severity}
                </span>
                <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
