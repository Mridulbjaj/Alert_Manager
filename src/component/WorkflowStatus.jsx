// components/WorkflowStatus.js
import React from "react";
import axios from "axios";
import { useState } from "react";

export default function WorkflowStatus() {
  const [alerts, setAlerts] = useState([]);
  const [status, setStatus] = useState('Connecting...');

  const handleStartWorkflow = () => {
    const eventSource = new EventSource('http://localhost:8000/api/fetchalert');

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.message === 'All alerts processed' || data.message === 'No unresolved alerts found') {
        setStatus(data.message);
        eventSource.close();
        return;
      }

      setAlerts(prev => [...prev, data]);
    };

    eventSource.onerror = (err) => {
      console.error('EventSource failed:', err);
      setStatus('Connection error');
      eventSource.close();
    };

    return () => {
      eventSource.close(); // clean up on unmount
    };
  };

  return (
    <div className="bg-[#111] rounded-lg p-6 border border-gray-800">
      <h3 className="text-lg font-semibold mb-2">Workflow Status</h3>
      <p className="text-sm text-gray-400 mb-4">Execute and monitor the alert processing workflow.</p>

      <div className="mb-2">
        <span className="text-sm text-gray-400">Current Progress</span>
        <span className="float-right text-sm text-gray-400">0%</span>
      </div>
      <div className="w-full h-2 bg-gray-800 rounded-full mb-4">
        <div className="h-2 bg-blue-500 rounded-full w-0"></div>
      </div>

      <div className="mb-4">
        <span className="text-sm text-gray-400">Current Step</span>
        <p className="text-white">Not started</p>
      </div>

      <div className="mb-4">
        <span className="text-sm text-gray-400">Recent Activity</span>
        <p className="text-white">–</p>
      </div>
      <div className="min-h-20 max-h-80 overflow-y-auto border border-gray-300 rounded-lg px-0 py-4 bg-black shadow-md scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200 my-4">
        <ul className="space-y-1 list-none text-xs">
          {alerts.map((alert, index) => (
            <li
              key={index}
              className={`truncate ${alert.status ? 'text-green-600' : 'text-red-600'
                }`}
            >
              {alert.message} {alert.error && `- ${alert.error}`}
            </li>
          ))}
        </ul>
      </div>



      <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded" onClick={handleStartWorkflow}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
        Start Workflow
      </button>

    </div>
  );
}