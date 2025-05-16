import { useState } from "react";
import { Play } from 'lucide-react';
export default function WorkflowLogs() {
  const [alerts, setAlerts] = useState([]);
  const [status, setStatus] = useState('No Logs Yet');

  const handleStartWorkflow = () => {
    const eventSource = new EventSource('https://alert-o417.onrender.com/api/fetchalert');

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('Received data:', data);
      if (data.message === 'response end') {
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
  
    <div className="mt-8 border border-white p-4 rounded-md bg-[#1a1a1a]">
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Workflow Logs</h3>
      <div className="border border-gray-700 bg-black rounded-md p-4 text-gray-400 min-h-[20rem] whitespace-pre-wrap overflow-y-auto max-h-[40rem]">
        {alerts.length > 0 ? ( <ul className="space-y-1 list-none text-xs">
          {alerts.map((alert, index) => (
            <li
              key={index}
              className={`truncate ${alert.status ? 'text-green-600' : 'text-red-600'
                }`}
            >
              {alert.message} {alert.error && `- ${alert.error}`}
            </li>
          ))}
        </ul>): status}
      </div>
    </div>
    <div className="mt-6 flex justify-center">
    <button onClick={handleStartWorkflow} className="flex items-center gap-2 px-6 py-2 bg-white text-black rounded-full hover:bg-gray-200 transition">
      <Play className="w-4 h-4" />
      Start Workflow
    </button>
  </div>
     </div>

    
  );
};

