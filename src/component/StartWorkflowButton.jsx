import React from 'react';
import { Play } from 'lucide-react';

const StartWorkflowButton = () => (
  <div className="mt-6 flex justify-center">
    <button className="flex items-center gap-2 px-6 py-2 bg-white text-black rounded-full hover:bg-gray-200 transition">
      <Play className="w-4 h-4" />
      Start Workflow
    </button>
  </div>
);

export default StartWorkflowButton;
