const statusColors = {
  true: 'bg-yellow-100 text-yellow-600',
  false: 'bg-blue-100 text-blue-600',
};

const confidenceColors = {
  malicious: 'bg-red-100 text-red-600',
  Medium: 'bg-yellow-100 text-yellow-700',
};

const verdictColors = {
  "false positive": 'bg-red-100 text-red-600',
  "true positive": 'bg-green-100 text-green-600',
  "Pending": 'text-gray-400',
};

const ThreatTable = ({recentAlerts}) => {
  return (
    recentAlerts.length===0?
    <div className="flex justify-center items-center h-full">
      <p className="text-gray-400">No recent alerts available.</p>
    </div>
    : 
    <div className="max-w-full overflow-auto px-4 py-4">
      <table className="min-w-full bg-[#1f1f1f] text-white rounded-lg overflow-hidden">
        <thead>
          <tr className="text-left text-gray-400 border-b border-gray-700">
            <th className="py-3 px-4">Threat</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4">Agent</th>
            <th className="py-3 px-4">Confidence</th>
            <th className="py-3 px-4">Verdict</th>
          </tr>
        </thead>
        <tbody>
          {recentAlerts.map((row, idx) => (
            <tr key={idx} className="border-b border-gray-800 hover:bg-gray-800">
              <td className="py-3 px-4 font-semibold">{row.threatName}</td>
              <td className="py-3 px-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium inline-block ${statusColors[row.processed] || ''}`}>
                  {row.processed? 'Processed' : 'New'}
                </span>
              </td>
              <td className="py-3 px-4">{row.computerName}</td>
              <td className="py-3 px-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium inline-block ${confidenceColors[row.confidenceLevel] || ''}`}>
                  {row.confidenceLevel}
                </span>
              </td>
              <td className="py-3 px-4">
                {row.Agent_Verdict === "Pending" ? (
                  <span className="text-sm font-medium text-gray-400">Pending</span>
                ) : (
                  <span className={`px-3 py-1 rounded-full text-sm font-medium inline-block ${verdictColors[row.Agent_Verdict] || ''}`}>
                    {row.Agent_Verdict}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ThreatTable;
