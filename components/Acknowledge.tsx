import React from 'react';

interface AcknowledgeProps {
  onAcknowledge: () => void;
}

const Acknowledge: React.FC<AcknowledgeProps> = ({ onAcknowledge }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#101827] text-white">
      <div className="max-w-lg p-8 bg-[#1e293b] rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Mock Data Notification</h2>
        <p className="mb-6">
          This application is currently running with mock data because the API key is not set.
          The data you see is for demonstration purposes only.
        </p>
        <button
          onClick={onAcknowledge}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Acknowledge & Proceed to Login
        </button>
      </div>
    </div>
  );
};

export default Acknowledge;
