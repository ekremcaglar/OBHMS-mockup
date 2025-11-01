import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { PORT_ENGINE_DATA, STARBOARD_ENGINE_DATA, MOCK_FLEET_DATA } from '../../constants';
import StatusIndicator from '../StatusIndicator';
import Icon from '../Icon';
import Heatmap from '../charts/Heatmap';
import MetricCard from '../MetricCard';
import { useI18n } from '../../context/I18nContext';

interface EngineHealthProps {
  onAircraftSelect: (id: string) => void;
}

const EngineTelemetryChart: React.FC<{
  data: any[];
  dataKeyPort: string;
  dataKeyStarboard: string;
  name: string;
  unit: string;
  color: { port: string; starboard: string };
}> = ({ data, dataKeyPort, dataKeyStarboard, name, unit, color }) => {
    return (
        <div className="h-48">
            <h4 className="text-sm font-semibold text-center text-gray-400 mb-2">{name} ({unit})</h4>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} syncId="engineSync" margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="time" stroke="#9ca3af" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis stroke="#9ca3af" fontSize={10} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ background: '#1f2937', borderColor: '#374151', borderRadius: '0.5rem', fontSize: '12px' }} />
                    <Line type="monotone" dataKey={dataKeyPort} name="Port" stroke={color.port} strokeWidth={2} dot={false} isAnimationActive={false} />
                    <Line type="monotone" dataKey={dataKeyStarboard} name="Starboard" stroke={color.starboard} strokeWidth={2} dot={false} isAnimationActive={false} />
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

  const initialData = PORT_ENGINE_DATA.map((port, index) => ({
      time: port.time,
      port_egt: port.egt,
      starboard_egt: STARBOARD_ENGINE_DATA[index]?.egt,
      port_n1: port.n1,
      starboard_n1: STARBOARD_ENGINE_DATA[index]?.n1,
      port_oil: port.oil,
      starboard_oil: STARBOARD_ENGINE_DATA[index]?.oil,
      port_vibration: port.vibration,
      starboard_vibration: STARBOARD_ENGINE_DATA[index]?.vibration,
  }));
  
  const [engineData, setEngineData] = useState(initialData);

  useEffect(() => {
    const interval = setInterval(() => {
        setEngineData(prevData => {
            const newData = [...prevData.slice(1)];
            const lastPoint = prevData[prevData.length - 1];
            
            const newPoint = {
                time: lastPoint.time + 1,
                port_egt: lastPoint.port_egt + (Math.random() * 4 - 2),
                starboard_egt: lastPoint.starboard_egt + (Math.random() * 5 - 2.5),
                port_n1: lastPoint.port_n1 + (Math.random() * 0.2 - 0.1),
                starboard_n1: lastPoint.starboard_n1 + (Math.random() * 0.2 - 0.1),
                port_oil: lastPoint.port_oil + (Math.random() * 2 - 1),
                starboard_oil: lastPoint.starboard_oil + (Math.random() * 2 - 1),
                port_vibration: Math.max(0, lastPoint.port_vibration + (Math.random() * 0.05 - 0.025)),
                starboard_vibration: Math.max(0, lastPoint.starboard_vibration + (Math.random() * 0.1 - 0.05)),
            };
            newData.push(newPoint);
            return newData;
        });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
        
        <div className="lg:col-span-2 space-y-6">
            <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 shadow-lg backdrop-blur-sm space-y-4">
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
                    <EngineTelemetryChart data={engineData} dataKeyPort="port_egt" dataKeyStarboard="starboard_egt" name={t('egt')} unit="°C" color={{port: '#8884d8', starboard: '#ffc658'}} />
                    <EngineTelemetryChart data={engineData} dataKeyPort="port_n1" dataKeyStarboard="starboard_n1" name={t('n1_rpm')} unit="%" color={{port: '#82ca9d', starboard: '#ff8042'}} />
                    <EngineTelemetryChart data={engineData} dataKeyPort="port_oil" dataKeyStarboard="starboard_oil" name={t('oil_pressure')} unit={t('psi')} color={{port: '#0088FE', starboard: '#00C49F'}} />
                    <EngineTelemetryChart data={engineData} dataKeyPort="port_vibration" dataKeyStarboard="starboard_vibration" name={t('vibration')} unit={t('ips')} color={{port: '#FFBB28', starboard: '#FF8042'}} />
                </div>
            </div>
            <div className="h-80">
                <MetricCard metric={{id:'heatmap-chart', title: t('engine_param_correlation'), value: '', unit: '', status: 'nominal', description: t('engine_param_correlation_desc')}}>
                    <Heatmap />
                </MetricCard>
            </div>
        </div>
      </div>
    </div>
  );
};

export default EngineHealth;