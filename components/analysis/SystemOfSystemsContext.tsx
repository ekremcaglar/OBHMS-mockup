import React, { useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MOCK_FLEET_DATA } from '../../constants';
import { Aircraft } from '../../types';

const SystemOfSystemsContext: React.FC = () => {
    const [selectedAircraftId, setSelectedAircraftId] = useState<string>(MOCK_FLEET_DATA.aircraft[0].id);

    const selectedAircraft = MOCK_FLEET_DATA.aircraft.find(ac => ac.id === selectedAircraftId) as Aircraft;

    const chartData = selectedAircraft.systems.map(system => ({
        subject: system.name,
        A: system.healthIndex,
        fullMark: 100,
    }));

    const handleAircraftChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedAircraftId(event.target.value);
    };

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                    <label htmlFor="aircraft-select" className="text-white mr-2">Select Aircraft:</label>
                    <select
                        id="aircraft-select"
                        value={selectedAircraftId}
                        onChange={handleAircraftChange}
                        className="bg-gray-700 text-white border border-gray-600 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {MOCK_FLEET_DATA.aircraft.map(ac => (
                            <option key={ac.id} value={ac.id}>{ac.tailNumber}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-900 p-4 rounded-lg">
                    <h3 className="text-xl font-semibold text-white mb-4">Subsystem Health Radar</h3>
                    <ResponsiveContainer width="100%" height={400}>
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="subject" />
                            <PolarRadiusAxis angle={30} domain={[0, 100]} />
                            <Radar name="Health Index" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                            <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none' }} />
                            <Legend />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg">
                    <h3 className="text-xl font-semibold text-white mb-4">Correlation Analysis</h3>
                    <p className="text-gray-400 mb-4">
                        A low health index in the <strong>Engine</strong> system often correlates with a decrease in the <strong>ECS</strong> and <strong>Hydraulics</strong> health over time. This indicates a potential cascading failure path.
                    </p>
                    <div className="text-white">
                        <h4 className="font-bold">Key Observations:</h4>
                        <ul className="list-disc list-inside mt-2 text-gray-400 space-y-1">
                            <li>Engine Health degradation shows a <strong>-0.65 correlation</strong> with ECS performance metrics.</li>
                            <li>High vibration alerts from the Engine system are followed by pressure warnings in Hydraulics within <strong>~10 flight hours</strong>.</li>
                            <li>Structural stress metrics show a minor increase when flight control systems report frequent errors.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SystemOfSystemsContext;