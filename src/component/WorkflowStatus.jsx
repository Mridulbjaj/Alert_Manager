
export default function WorkflowStatus({alerts, onStart, statusText, progress}) {
  
  return (
    <div className="bg-[#111] rounded-lg p-6 border border-gray-800">
      <h3 className="text-lg font-semibold mb-2">Workflow Status</h3>
      <p className="text-sm text-gray-400 mb-4">Execute and monitor the alert processing workflow.</p>

      <div className="mb-2">
        <span className="text-sm text-gray-400">Current Progress</span>
        <span className="float-right text-sm text-gray-400">{Math.ceil(progress)}%</span>
      </div>
      <div className="w-full bg-gray-300 rounded h-6 overflow-hidden">
        <div 
          className="bg-green-500 h-full transition-all duration-700 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mb-4">
        <span className="text-sm text-gray-400">Current Step</span>
        <p className="mt-2 text-gray-700 font-medium">{statusText}</p>
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



      <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded" onClick={onStart}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
        Start Workflow
      </button>

    </div>
  );
}