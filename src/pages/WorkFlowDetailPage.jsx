import React from 'react';
import HeaderSection from '../component/HeaderSection';
import Navbar from '../component/Navbar';
import WorkflowSteps from '../component/WorkflowSteps';
import WorkflowLogs from '../component/WorkflowLogs';

export default function WorkflowDetailPage() {
    return (
        <div className="bg-[#0a0a0a] text-white min-h-screen font-sans">
            <Navbar />
            <div className="p-8 text-white">
                <HeaderSection />
                <div className="mt-8 border border-white p-4 rounded-md bg-[#1a1a1a]">
                    <WorkflowSteps />
                </div>

                    <WorkflowLogs />
            </div>
        </div>
    );
};
