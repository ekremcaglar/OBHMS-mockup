import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { PORT_ENGINE_DATA, STARBOARD_ENGINE_DATA, MOCK_FLEET_DATA } from '../../constants';
import StatusIndicator from '../StatusIndicator';
import Icon from '../Icon';
import { useI18n } from '../../context/I18nContext';

interface EngineHealthProps {
  onAircraftSelect: (id: string) => void;
}

const EngineTelemetryChart: React.FC<{
  portData: any[];
  starboardData: any[];
  dataKey: string;
  name: string;
  unit: string;
  color: { port: string; starboard: string };
}> = ({ portData, starboardData, dataKey, name, unit, color }) => {
    
    const combinedData = portData.map((port, index) => ({
        time: port.time,
        port: port[dataKey],
        starboard: starboardData[index]?.[dataKey]
    }));
    
    return (
        <div className="h-48">
            <h4 className="text-sm font-semibold text-center text-gray-400 mb-2">{name} ({unit})</h4>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={combinedData} syncId="engineSync" margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="time" stroke="#9ca3af" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis stroke="#9ca3af" fontSize={10} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ background: '#1f2937', borderColor: '#374151', borderRadius: '0.5rem' }} />
                    <Line type="monotone" dataKey="port" name="Port" stroke={color.port} strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="starboard" name="Starboard" stroke={color.starboard} strokeWidth={2} dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

const EngineHealth: React.FC<EngineHealthProps> = ({ onAircraftSelect }) => {
  const { t } = useI18n();
  const aircraftWithEngineIssues = MOCK_FLEET_DATA.aircraft.filter(ac => 
    ac.systems.some(sys => sys.name === 'Propulsion' && sys.status !== 'nominal')
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Alerts Panel */}
        <div className="lg:col-span-1 bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 shadow-lg backdrop-blur-sm">
          <h3 className="text-lg font-semibold text-white mb-4">{t('propulsion_system_alerts')}</h3>
          <div className="space-y-4 max-h-[700px] overflow-y-auto pr-2">
            {aircraftWithEngineIssues.length > 0 ? (
              aircraftWithEngineIssues.map(ac => {
                const propulsionSystem = ac.systems.find(sys => sys.name === 'Propulsion');
                return (
                  <div key={ac.id} onClick={() => onAircraftSelect(ac.id)} className="bg-slate-800 border border-slate-700 rounded-lg p-4 flex items-start space-x-4 cursor-pointer hover:bg-slate-700 transition-colors">
                    <StatusIndicator status={propulsionSystem!.status} size="lg" />
                    <div>
                      <p className="font-bold text-white">{ac.tailNumber}</p>
                      <div className="text-sm text-gray-400 mt-1 space-y-1">
                        {propulsionSystem!.metrics.map(metric => (
                          <div key={metric.id} className="flex items-center space-x-2">
                            <Icon name={metric.status === 'critical' ? 'AlertTriangle' : 'Info'} className={`w-4 h-4 ${metric.status === 'critical' ? 'text-red-400' : 'text-yellow-400'}`} />
                            <span>{metric.title}: <span className="font-semibold text-white">{metric.value} {metric.unit}</span></span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-400 text-center py-8">{t('all_propulsion_systems_nominal')}</p>
            )}
          </div>
        </div>
        
        {/* Telemetry Panel */}
        <div className="lg:col-span-2 bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 shadow-lg backdrop-blur-sm space-y-4">
            <div className="flex justify-around text-center border-b border-gray-700 pb-4">
                <div>
                    <h3 className="text-xl font-bold text-white">{t('port_engine')}</h3>
                    <p className="text-sm text-green-400">STATUS: NOMINAL</p>
                </div>
                 <div>
                    <h3 className="text-xl font-bold text-white">{t('starboard_engine')}</h3>
                    <p className="text-sm text-yellow-400">STATUS: WARNING</p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                <EngineTelemetryChart portData={PORT_ENGINE_DATA} starboardData={STARBOARD_ENGINE_DATA} dataKey="egt" name={t('egt')} unit="°C" color={{port: '#8884d8', starboard: '#ffc658'}} />
                <EngineTelemetryChart portData={PORT_ENGINE_DATA} starboardData={STARBOARD_ENGINE_DATA} dataKey="n1" name={t('n1_rpm')} unit="%" color={{port: '#82ca9d', starboard: '#ff8042'}} />
                <EngineTelemetryChart portData={PORT_ENGINE_DATA} starboardData={STARBOARD_ENGINE_DATA} dataKey="oil" name={t('oil_pressure')} unit={t('psi')} color={{port: '#0088FE', starboard: '#00C49F'}} />
                <EngineTelemetryChart portData={PORT_ENGINE_DATA} starboardData={STARBOARD_ENGINE_DATA} dataKey="vibration" name={t('vibration')} unit={t('ips')} color={{port: '#FFBB28', starboard: '#FF8042'}} />
            </div>
        </div>
      </div>
    </div>
  );
};

export default EngineHealth;