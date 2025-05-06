import React from "react";

const stats = [
  {
    title: "Total Alerts",
    value: "24",
    subtitle: "+12 from last week",
    icon: "\u21bb"
  },
  {
    title: "Processed",
    value: "18",
    subtitle: "75% of total alerts",
    icon: "\u2713"
  },
  {
    title: "Pending",
    value: "6",
    subtitle: "25% of total alerts",
    icon: "\u23F0"
  }
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="bg-[#111] rounded-lg p-4 border border-gray-800 flex flex-col relative"
        >
          <div className="absolute top-4 right-4 text-gray-50">{stat.icon}</div>
          <h3 className="text-sm text-gray-400">{stat.title}</h3>
          <p className="text-2xl font-semibold text-white">{stat.value}</p>
          <p className="text-sm text-gray-500">{stat.subtitle}</p>
        </div>
      ))}
    </div>
  );
}
