import React from 'react';

const steps = [
  { title: 'Fetch Alerts', status: 'Pending' },
  { title: 'Process Alerts', status: 'Pending' },
  { title: 'Update SentinelOne', status: 'Pending' },
];

const WorkflowSteps = () => (
  <>
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-xl font-semibold">Workflow Execution</h2>
        <p className="text-gray-500 text-sm">
          Execute and monitor the alert processing workflow.
        </p>
      </div>
      <div className="text-gray-300 text-sm">0%</div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      {steps.map((step, index) => (
       <div
       key={index}
       className="border border-white bg-black text-white p-4 rounded-md"
     >
     
          <p className="font-semibold mb-1">
            <span className="mr-2">⏺</span> {step.title}
          </p>
          <p className="text-gray-500 text-sm">{step.status}</p>
        </div>
      ))}
    </div>
  </>
);

export default WorkflowSteps;
