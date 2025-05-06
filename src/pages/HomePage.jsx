import StatsCards from "../component/StatsCards";
import RecentAlerts from "../component/RecentAlerts";
import WorkflowStatus from "../component/WorkflowStatus";
import Navbar from "../component/Navbar";
export default function HomePage(){
    return (    
        <div className="bg-[#0a0a0a] text-white min-h-screen font-sans">
        <Navbar />
        <div className="px-6 py-5 space-y-6">
          <StatsCards />
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2">
              <RecentAlerts />
            </div>
            <WorkflowStatus />
          </div>
        </div>
      </div>
    );
}