import { useState } from "react";
import StatsCards from "../component/StatsCards";
import RecentAlerts from "../component/RecentAlerts";
import WorkflowStatus from "../component/WorkflowStatus";
import Navbar from "../component/Navbar";
export default function HomePage() {
  const [progress, setProgress] = useState(0);
  const [alerts, setAlerts] = useState([]);
  const [status, setStatus] = useState('Connecting...');
  const [recent, setRecent] = useState([]);
  const [totalAlerts, setTotalAlerts] = useState(0);
  const [processedAlerts, setProcessedAlerts] = useState(0);
  const [statusText, setStatusText] = useState('Not Started Yet!')
  const handleStartWorkflow = () => {
    const eventSource = new EventSource('http://localhost:8000/api/fetchalert');

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if(data.message==='Alert fetching is starting'){
        setStatusText('Fetching Alerts.....')
      }

      if(data.message==='LLM analysis is now starting'){
        setStatusText('Processing Alerts...')
      }

      if(data.message==='All alerts processed'){
        setProgress(20);
      }
      if(data.message==='LLM analysis completed'){
        setProgress(80)
      }
      if (data.message === 'response end') {
        setProgress(100)
        setStatus(data.message);
        eventSource.close();
        return;
      }

      setAlerts(prev => [...prev, {message: data.message, status: data.status}]);
      setProgress(progress=>progress+0.2)
      if(data.data){
        setRecent(prev => [data.data, ...prev].slice(0, 10));
      if(data.data.processed===false){
        setTotalAlerts(totalAlerts=>totalAlerts+=1);
      }else
        setProcessedAlerts(processedAlerts=>processedAlerts+=1);
      }
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
    <div className="bg-[#0a0a0a] text-white min-h-screen font-sans">
      <Navbar />
      <div className="px-6 py-5 space-y-6">
        <StatsCards totalAlerts={totalAlerts} processedAlerts={processedAlerts}/>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <div className="bg-[#111] min-h-[30rem] rounded-lg p-4 border border-gray-800">
              <h3 className="text-lg font-semibold mb-3">Recent Alerts</h3>
              <RecentAlerts recentAlerts={recent} />
            </div>
          </div>
          <WorkflowStatus alerts={alerts} onStart={handleStartWorkflow} statusText={statusText} progress={progress}/>
        </div>
      </div>
    </div>
  );
}