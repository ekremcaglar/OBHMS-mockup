import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, BarChart, Bar, CartesianGrid } from 'recharts';
import { PILOT_DATA, PILOT_FATIGUE_TREND, PILOT_LIVE_BIOMETRICS, PILOT_SKILLS_DATA } from '../../constants';
import Icon from '../Icon';
import { useI18n } from '../../context/I18nContext';

const PilotHealthMonitoringAnalysis: React.FC = () => {
    const { t } = useI18n();

    return (
        <div className="grid grid-cols-12 gap-6">
            {/* Left Column: Pilot Profile */}
            <div className="col-span-12 lg:col-span-3 bg-gray-800/50 rounded-lg p-6">
                <h2 className="text-xl font-bold text-white mb-4">{t('pilot_details_for')} {PILOT_DATA.name}</h2>
                <div className="space-y-4">
                    <div>
                        <p className="text-sm text-gray-400">{t('callsign')}</p>
                        <p className="text-lg font-semibold text-white">{PILOT_DATA.callsign}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-400">{t('readiness_status')}</p>
                        <p className={`text-lg font-semibold ${PILOT_DATA.status === 'Cleared for Flight' ? 'text-green-400' : 'text-red-400'}`}>{t('cleared_for_flight')}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-400">{t('total_flight_hours')}</p>
                        <p className="text-lg font-semibold text-white">{PILOT_DATA.totalFlightHours}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-400">{t('platform_hours')}</p>
                        <p className="text-lg font-semibold text-white">{PILOT_DATA.kaanHours}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-400">{t('last_flight')}</p>
                        <p className="text-lg font-semibold text-white">{PILOT_DATA.lastFlight}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-400">{t('certifications')}</p>
                        <ul className="list-disc list-inside text-white">
                            {PILOT_DATA.certifications.map(cert => <li key={cert}>{cert}</li>)}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Right Column: Charts */}
            <div className="col-span-12 lg:col-span-9 space-y-6">
                {/* Live Biometrics */}
                <div className="bg-gray-800/50 rounded-lg p-6">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center"><Icon name="Activity" className="mr-2" />{t('live_biometrics')}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-64">
                        <ResponsiveContainer>
                            <LineChart data={PILOT_LIVE_BIOMETRICS.heartRate}>
                                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                                <XAxis dataKey="x" hide />
                                <YAxis domain={[60, 100]} />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="y" name={t('heart_rate')} stroke="#8884d8" dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                        <ResponsiveContainer>
                            <LineChart data={PILOT_LIVE_BIOMETRICS.respiration}>
                                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                                <XAxis dataKey="x" hide />
                                <YAxis domain={[10, 25]} />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="y" name={t('respiration')} stroke="#82ca9d" dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                        <ResponsiveContainer>
                            <LineChart data={PILOT_LIVE_BIOMETRICS.gForce}>
                                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                                <XAxis dataKey="x" hide />
                                <YAxis domain={[0, 5]} />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="y" name={t('g_force')} stroke="#ffc658" dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Fatigue Trend */}
                    <div className="bg-gray-800/50 rounded-lg p-6">
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center"><Icon name="TrendingUp" className="mr-2" />{t('fatigue_trend_last_10')}</h3>
                         <div className="h-72">
                            <ResponsiveContainer>
                                <BarChart data={PILOT_FATIGUE_TREND}>
                                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                                    <XAxis dataKey="flight" label={{ value: t('flight_no'), position: 'insideBottom', offset: -5 }} />
                                    <YAxis label={{ value: t('fatigue_index'), angle: -90, position: 'insideLeft' }} />
                                    <Tooltip />
                                    <Bar dataKey="fatigueIndex" name={t('fatigue_index')} fill="#8884d8" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Pilot Skills */}
                    <div className="bg-gray-800/50 rounded-lg p-6">
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center"><Icon name="Radar" className="mr-2" />{t('pilot_skills_assessment')}</h3>
                        <div className="h-72">
                            <ResponsiveContainer>
                                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={PILOT_SKILLS_DATA}>
                                    <PolarGrid />
                                    <PolarAngleAxis dataKey="skill" />
                                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                                    <Radar name={PILOT_DATA.name} dataKey="pilot" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                                    <Radar name={t('fleet_average')} dataKey="average" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                                    <Legend />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PilotHealthMonitoringAnalysis;
