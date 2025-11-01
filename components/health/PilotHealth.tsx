import React, { useState, useEffect } from 'react';
import { PILOT_DATA, PILOT_FATIGUE_TREND, PILOT_LIVE_BIOMETRICS } from '../../constants';
import Icon from '../Icon';
import { useI18n } from '../../context/I18nContext';
import { LineChart, BarChart, Line, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area } from 'recharts';
import MetricCard from '../MetricCard';
import PilotSkillsRadarChart from './charts/PilotSkillsRadarChart';

const BiometricChart: React.FC<{ initialData: {x:number, y:number}[]; title: string; unit: string; color: string;}> = ({ initialData, title, unit, color }) => {
    const [data, setData] = useState(initialData);

    useEffect(() => {
        const interval = setInterval(() => {
            setData(prevData => {
                const newData = [...prevData.slice(1)];
                const lastPoint = prevData[prevData.length - 1];
                const newY = lastPoint.y + (Math.random() - 0.5) * (lastPoint.y * 0.1);
                newData.push({ x: lastPoint.x + 1, y: Math.max(0, newY) });
                return newData;
            });
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-24">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id={`color-${title}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={color} stopOpacity={0.8}/>
                        <stop offset="95%" stopColor={color} stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <Tooltip
                        contentStyle={{ background: 'rgba(31, 41, 55, 0.8)', borderColor: '#374151', borderRadius: '0.5rem', fontSize: '12px' }}
                        labelFormatter={() => ''}
                        formatter={(value) => [`${(value as number).toFixed(1)} ${unit}`, title]}
                    />
                    <Area type="monotone" dataKey="y" stroke={color} fill={`url(#color-${title})`} strokeWidth={2} />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};


const PilotHealth: React.FC = () => {
    const { t } = useI18n();
    const fatigueStatus = PILOT_DATA.fatigueIndex < 30 ? 'nominal' : PILOT_DATA.fatigueIndex < 60 ? 'warning' : 'critical';
    const fatigueColor = {
        nominal: 'text-green-500',
        warning: 'text-yellow-500',
        critical: 'text-red-500',
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-2 bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-xl p-6 shadow-lg backdrop-blur-sm flex flex-col space-y-6">
                <div className="flex items-center space-x-6">
                    <img src={`https://i.pravatar.cc/150?u=${PILOT_DATA.callsign}`} alt="Pilot" className="w-24 h-24 rounded-full border-4 border-gray-300 dark:border-gray-600" />
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{PILOT_DATA.name}</h2>
                        <p className="text-lg text-sky-600 dark:text-cyan-400 font-mono">"{PILOT_DATA.callsign}"</p>
                    </div>
                </div>
                 <div className="space-y-3 text-sm">
                        <div className="flex justify-between items-center bg-gray-100 dark:bg-gray-700/50 px-3 py-2 rounded-md"><span className="text-gray-600 dark:text-gray-400">{t('status')}:</span> <span className={`font-semibold text-base ${PILOT_DATA.status === 'Cleared for Flight' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>{t('cleared_for_flight')}</span></div>
                        <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">{t('total_flight_hours')}:</span> <span className="font-semibold text-gray-800 dark:text-white">{PILOT_DATA.totalFlightHours}</span></div>
                        <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">{t('platform_hours')}:</span> <span className="font-semibold text-gray-800 dark:text-white">{PILOT_DATA.kaanHours}</span></div>
                        <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">{t('last_flight')}:</span> <span className="font-semibold text-gray-800 dark:text-white">{PILOT_DATA.lastFlight}</span></div>
                </div>
                 <div className="bg-white dark:bg-gray-800/50 rounded-xl p-4">
                     <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('certifications')}</h3>
                     <div className="flex flex-wrap gap-2">
                        {PILOT_DATA.certifications.map(cert => (
                            <span key={cert} className="bg-sky-100 dark:bg-cyan-500/20 text-sky-800 dark:text-cyan-300 text-xs font-semibold px-2.5 py-1 rounded-full border border-sky-200 dark:border-cyan-500/30 flex items-center space-x-1.5">
                                <Icon name="CheckCircle" className="w-3.5 h-3.5" />
                                <span>{cert}</span>
                            </span>
                        ))}
                     </div>
                </div>
            </div>
            <div className="lg:col-span-3 grid grid-cols-1 gap-6">
                <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-xl p-6 shadow-lg backdrop-blur-sm">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('live_biometrics')}</h3>
                    <div className="grid grid-cols-3 gap-4">
                        <BiometricChart initialData={PILOT_LIVE_BIOMETRICS.heartRate} title={t('heart_rate')} unit={t('bpm')} color="#ef4444" />
                        <BiometricChart initialData={PILOT_LIVE_BIOMETRICS.respiration} title={t('respiration')} unit={t('rpm')} color="#22c55e" />
                        <BiometricChart initialData={PILOT_LIVE_BIOMETRICS.gForce} title="G-Force" unit="G" color="#3b82f6" />
                    </div>
                </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-80">
                    <MetricCard metric={{id: 'pilot-fatigue-chart', title: t('fatigue_trend_last_10'), value: '', unit: '', status: 'nominal', description: 'Fatigue index over last 10 flights.'}}>
                         <ResponsiveContainer width="100%" height="100%">
                             <BarChart data={PILOT_FATIGUE_TREND} margin={{ top: 20, right: 10, left: -25, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                <XAxis dataKey="flight" name="Flight #" stroke="#9ca3af" fontSize={12} />
                                <YAxis domain={[0, 40]} stroke="#9ca3af" fontSize={12} />
                                <Tooltip contentStyle={{ background: '#1f2937', borderColor: '#374151', borderRadius: '0.5rem' }} />
                                <Bar dataKey="fatigueIndex" name="Fatigue Index" fill="#f59e0b" />
                             </BarChart>
                         </ResponsiveContainer>
                    </MetricCard>
                    <MetricCard metric={{id:'pilot-skills', title:"Pilot Skills Assessment", value: '', unit: '', status: 'nominal', description: "Pilot's proficiency vs Squadron average."}}>
                         <PilotSkillsRadarChart />
                     </MetricCard>
                </div>
            </div>
        </div>
    );
};

export default PilotHealth;