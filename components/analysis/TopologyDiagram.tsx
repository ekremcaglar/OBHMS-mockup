import React, { useState, useEffect } from 'react';
import { MOCK_SYSTEM_DATA } from '../../constants';

const TopologyDiagram: React.FC = () => {
    const [faultedSystems, setFaultedSystems] = useState<string[]>([]);

    useEffect(() => {
        return () => {
            setFaultedSystems([]);
        };
    }, []);

    const handleFault = (systemId: string) => {
        const systemsToVisit = [systemId];
        const visitedSystems = new Set<string>();

        while (systemsToVisit.length > 0) {
            const currentSystemId = systemsToVisit.shift();
            if (currentSystemId && !visitedSystems.has(currentSystemId)) {
                visitedSystems.add(currentSystemId);
                const system = MOCK_SYSTEM_DATA.find(s => s.id === currentSystemId);
                if (system) {
                    system.connections.forEach(conn => {
                        if (!visitedSystems.has(conn)) {
                            systemsToVisit.push(conn);
                        }
                    });
                }
            }
        }

        setFaultedSystems(Array.from(visitedSystems));
    };

    const handleReset = () => {
        setFaultedSystems([]);
    };

    return (
        <div>
            <button
                onClick={handleReset}
                className="bg-gray-500 text-white px-4 py-2 rounded-md mb-4"
            >
                Reset
            </button>
            <svg width="100%" height="500" className="bg-gray-800 rounded-lg">
                {MOCK_SYSTEM_DATA.map(node => (
                    <g key={node.id} transform={`translate(${node.x}, ${node.y})`} onClick={() => handleFault(node.id)} className="cursor-pointer">
                        <circle cx="0" cy="0" r="20" fill={faultedSystems.includes(node.id) ? '#ef4444' : '#2563eb'} />
                        <text x="30" y="5" fill="white">{node.name}</text>
                    </g>
                ))}
                {MOCK_SYSTEM_DATA.map(node =>
                    node.connections.map(connectionId => {
                        const connection = MOCK_SYSTEM_DATA.find(n => n.id === connectionId);
                        if (!connection) return null;
                        return (
                            <line
                                key={`${node.id}-${connection.id}`}
                                x1={node.x}
                                y1={node.y}
                                x2={connection.x}
                                y2={connection.y}
                                stroke={faultedSystems.includes(node.id) && faultedSystems.includes(connection.id) ? '#ef4444' : 'white'}
                            />
                        );
                    })
                )}
            </svg>
        </div>
    );
};

export default TopologyDiagram;