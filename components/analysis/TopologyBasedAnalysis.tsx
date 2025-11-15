import React from 'react';
import TopologyDiagram from './TopologyDiagram';

const TopologyBasedAnalysis: React.FC = () => {
    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Topology-Based Analysis</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
                This page will display the aircraft's system architecture and allow users to track fault propagation across connected systems.
            </p>
            <TopologyDiagram />
        </div>
    );
};

export default TopologyBasedAnalysis;