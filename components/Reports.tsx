import React, { useState, useMemo } from 'react';
import Icon from './Icon';
import { useI18n } from '../context/I18nContext';
import { REPORT_TEMPLATES, MOCK_FLEET_DATA, PILOT_DATA, MOCK_FAULT_LOGS, MOCK_MAINTENANCE_DATA } from '../constants';
import { ReportTemplate, Aircraft, AircraftSystem, Status } from '../types';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import PilotFatigueChart from './charts/PilotFatigueChart';
import MaintenanceWatchlist from './MaintenanceWatchlist';

interface GeneratedReport {
    id: string;
    name: string;
    templateId: string;
    createdAt: string;
    parameters: {
        aircraftId?: string;
        system?: string;
        pilotId?: string;
    };
}

const initialReports: GeneratedReport[] = [
    { id: `rep-${Date.now() - 200000}`, name: 'Fleet Capability Analysis', templateId: 'rt-2', createdAt: new Date(Date.now() - 200000).toISOString(), parameters: {} },
    { id: `rep-${Date.now() - 100000}`, name: 'Health Summary: KAAN-002', templateId: 'rt-1', createdAt: new Date(Date.now() - 100000).toISOString(), parameters: { aircraftId: 'ac-002' } },
    { id: `rep-${Date.now() - 50000}`, name: 'Pilot Fatigue: A. Vural', templateId: 'rt-5', createdAt: new Date(Date.now() - 50000).toISOString(), parameters: { pilotId: 'pv-01' } },
];

// --- Report Content Components ---

const Section: React.FC<{title: string, children: React.ReactNode, gridSpan?: number}> = ({ title, children, gridSpan = 12 }) => (
    <div className={`col-span-12 lg:col-span-${gridSpan}`}>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">{title}</h3>
        <div className="text-sm">{children}</div>
    </div>
);

const AircraftHealthContent: React.FC<{report: GeneratedReport}> = ({ report }) => {
    const aircraft = MOCK_FLEET_DATA.aircraft.find(ac => ac.id === report.parameters.aircraftId);
    if (!aircraft) return <p>Aircraft not found.</p>;

    return (
        <div className="grid grid-cols-12 gap-6">
            <Section title="System Health Overview">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {aircraft.systems.map(system => (
                        <div key={system.id} className={`p-3 rounded-lg border ${system.status === 'critical' ? 'border-red-500/50 bg-red-500/10' : system.status === 'warning' ? 'border-yellow-400/50 bg-yellow-400/10' : 'border-gray-600/50 bg-gray-700/20'}`}>
                            <div className="flex justify-between items-center">
                                <h4 className="font-semibold text-white">{system.name}</h4>
                                <span className="text-xs font-bold">{system.healthIndex}/100</span>
                            </div>
                             {system.metrics.length > 0 && (
                                <div className="mt-2 pt-2 border-t border-gray-600/50 space-y-1">
                                    {system.metrics.map(metric => (
                                        <div key={metric.id} className="text-xs flex justify-between">
                                            <span>{metric.title}:</span>
                                            <span className="font-semibold">{metric.value}{metric.unit}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </Section>
        </div>
    );
};

const FleetCapabilityContent: React.FC<{report: GeneratedReport}> = () => {
    const statusCounts = MOCK_FLEET_DATA.aircraft.reduce((acc, ac) => {
        acc[ac.status] = (acc[ac.status] || 0) + 1;
        return acc;
    }, {} as Record<Status, number>);

    const statusData = [
        { name: 'Nominal', value: statusCounts.nominal, fill: '#22c55e' },
        { name: 'Warning', value: statusCounts.warning, fill: '#facc15' },
        { name: 'Critical', value: statusCounts.critical, fill: '#ef4444' },
    ];
    
    const squadronData = MOCK_FLEET_DATA.aircraft.reduce((acc, ac) => {
        if (!acc[ac.squadron]) {
            acc[ac.squadron] = { name: ac.squadron, total: 0, mc: 0 };
        }
        acc[ac.squadron].total++;
        if (ac.missionCapableRate > 80) acc[ac.squadron].mc++;
        return acc;
    }, {} as any);
    
    const squadronChartData = Object.values(squadronData).map((s: any) => ({
        name: s.name.split(' ')[0],
        'MC Rate': (s.mc / s.total) * 100,
    }));


    return (
        <div className="grid grid-cols-12 gap-6">
            <Section title="Fleet Status Distribution" gridSpan={6}>
                 <div className="w-full h-64">
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={(entry) => `${entry.name}: ${entry.value}`}>
                                {statusData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
                            </Pie>
                            <Tooltip contentStyle={{ background: '#1f2937', borderColor: '#374151' }} />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                 </div>
            </Section>
            <Section title="Squadron Readiness" gridSpan={6}>
                 <div className="w-full h-64">
                     <ResponsiveContainer>
                        <BarChart data={squadronChartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                            <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                            <YAxis domain={[0,100]} unit="%" stroke="#9ca3af" fontSize={12} />
                            <Tooltip contentStyle={{ background: '#1f2937', borderColor: '#374151' }} />
                            <Bar dataKey="MC Rate" fill="#8884d8" />
                        </BarChart>
                     </ResponsiveContainer>
                 </div>
            </Section>
            <Section title="Non-Mission Capable Aircraft">
                <div className="space-y-2">
                    {MOCK_FLEET_DATA.aircraft.filter(ac => ac.missionCapableRate < 50).map(ac => (
                         <div key={ac.id} className="grid grid-cols-3 p-2 bg-gray-800/50 rounded-md">
                            <span className="font-semibold">{ac.tailNumber}</span>
                             <span>{ac.squadron}</span>
                             <span className="text-red-400">{ac.systems.find(s => s.status === 'critical')?.name || 'Multiple Issues'}</span>
                         </div>
                    ))}
                </div>
            </Section>
        </div>
    );
};

// FIX: Destructured 'report' prop to make it available within the component's scope.
const SystemFaultContent: React.FC<{report: GeneratedReport}> = ({ report }) => {
    const system = report.parameters.system || 'Propulsion';
    const faults = MOCK_FAULT_LOGS.filter(f => f.system === system);

    return (
        <Section title={`Detailed Fault Log: ${system}`}>
            <div className="space-y-2 max-h-96 overflow-y-auto">
                {faults.map(fault => (
                    <div key={fault.id} className="grid grid-cols-12 gap-2 p-2 text-xs bg-gray-800/50 rounded-md items-center">
                        <span className="col-span-3 text-gray-400">{new Date(fault.timestamp).toLocaleString()}</span>
                        <span className="col-span-2 font-semibold">{fault.aircraft}</span>
                        <span className="col-span-2 font-mono">{fault.code}</span>
                        <span className="col-span-3">{fault.description}</span>
                        <span className={`col-span-2 font-bold ${fault.severity === 'High' ? 'text-red-400' : 'text-yellow-400'}`}>{fault.severity}</span>
                    </div>
                ))}
            </div>
        </Section>
    );
};

const RulForecastContent: React.FC<{report: GeneratedReport}> = () => (
    <Section title="Component RUL Forecast"><MaintenanceWatchlist /></Section>
);

const PilotFatigueContent: React.FC<{report: GeneratedReport}> = () => {
    return (
        <div className="grid grid-cols-12 gap-6">
            <Section title={`Pilot Details: ${PILOT_DATA.name}`} gridSpan={5}>
                <div className="space-y-2 rounded-lg bg-gray-800/50 p-4">
                     <p><strong>Callsign:</strong> {PILOT_DATA.callsign}</p>
                     <p><strong>Status:</strong> <span className="text-green-400 font-semibold">{PILOT_DATA.status}</span></p>
                     <p><strong>Total Flight Hours:</strong> {PILOT_DATA.totalFlightHours}</p>
                     <p><strong>KAAN Platform Hours:</strong> {PILOT_DATA.kaanHours}</p>
                </div>
            </Section>
             <Section title="Fatigue Trend (Last 10 Flights)" gridSpan={7}>
                 <div className="h-64"><PilotFatigueChart /></div>
            </Section>
        </div>
    );
};


// --- Main Reports Component ---

const Reports: React.FC = () => {
    const { t } = useI18n();
    const [generatedReports, setGeneratedReports] = useState<GeneratedReport[]>(initialReports);
    const [selectedReportId, setSelectedReportId] = useState<string | null>(initialReports[0]?.id || null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const selectedReport = useMemo(() => 
        generatedReports.find(r => r.id === selectedReportId)
    , [selectedReportId, generatedReports]);

    const handleGenerateReport = (template: ReportTemplate, params: GeneratedReport['parameters']) => {
        const nameMap: Record<string, string> = {
            'rt-1': `Health Summary: ${params.aircraftId ? MOCK_FLEET_DATA.aircraft.find(ac => ac.id === params.aircraftId)?.tailNumber : 'N/A'}`,
            'rt-2': 'Fleet Capability Analysis',
            'rt-3': `Fault Analysis: ${params.system}`,
            'rt-4': 'Component RUL Forecast',
            'rt-5': `Pilot Fatigue: A. Vural`,
        };
        const newReport: GeneratedReport = {
            id: `rep-${Date.now()}`,
            name: nameMap[template.id] || 'New Report',
            templateId: template.id,
            createdAt: new Date().toISOString(),
            parameters: params,
        };
        setGeneratedReports(prev => [newReport, ...prev]);
        setSelectedReportId(newReport.id);
        setIsModalOpen(false);
    };
    
    const renderReportContent = () => {
        if (!selectedReport) return <div className="flex items-center justify-center h-full text-gray-500">{t('select_report_template')}</div>;
        
        const contentMap: Record<string, React.ReactNode> = {
            'rt-1': <AircraftHealthContent report={selectedReport} />,
            'rt-2': <FleetCapabilityContent report={selectedReport} />,
            'rt-3': <SystemFaultContent report={selectedReport} />,
            'rt-4': <RulForecastContent report={selectedReport} />,
            'rt-5': <PilotFatigueContent report={selectedReport} />,
        };

        return (
            <div className="print-container">
                 <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedReport.name}</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Generated on: {new Date(selectedReport.createdAt).toLocaleString()}</p>
                    </div>
                    <button onClick={() => window.print()} className="no-print flex items-center space-x-2 text-sm font-semibold py-2 px-4 rounded-lg transition-colors bg-slate-600 hover:bg-slate-500 text-white">
                        <Icon name="Printer" className="w-4 h-4" />
                        <span>{t('print_report')}</span>
                    </button>
                 </div>
                 {contentMap[selectedReport.templateId] || <p>Report content not available.</p>}
            </div>
        );
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-10rem)]">
             {isModalOpen && <GenerationModal onClose={() => setIsModalOpen(false)} onGenerate={handleGenerateReport} />}
            <aside className="lg:col-span-3 bg-white dark:bg-gray-800/30 border border-gray-200 dark:border-gray-700/30 rounded-xl p-4 flex flex-col">
                 <div className="px-2 pb-4 mb-4 border-b border-gray-200 dark:border-gray-700">
                    <button onClick={() => setIsModalOpen(true)} className="w-full flex items-center justify-center space-x-2 text-sm font-semibold py-2 px-4 rounded-lg transition-colors bg-sky-600 hover:bg-sky-500 text-white">
                        <Icon name="Plus" className="w-4 h-4" />
                        <span>Generate New Report</span>
                    </button>
                </div>
                <h2 className="text-base font-semibold text-gray-800 dark:text-white mb-3 px-2">Generated Reports</h2>
                 <div className="flex-grow space-y-1 overflow-y-auto pr-2 -mr-2">
                    {generatedReports.map(report => (
                        <button key={report.id} onClick={() => setSelectedReportId(report.id)}
                             className={`w-full text-left p-3 rounded-md transition-colors flex flex-col ${selectedReportId === report.id ? 'bg-sky-600/20 dark:bg-cyan-600/50' : 'hover:bg-gray-100 dark:hover:bg-slate-700/50'}`}>
                           <span className="text-sm font-semibold text-gray-800 dark:text-white truncate">{report.name}</span>
                           <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">{new Date(report.createdAt).toLocaleDateString()}</span>
                        </button>
                    ))}
                </div>
            </aside>

            <main className="lg:col-span-9 bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-xl shadow-lg backdrop-blur-sm p-6 overflow-y-auto">
                {renderReportContent()}
            </main>
        </div>
    );
};

// --- Generation Modal Component ---

const GenerationModal: React.FC<{onClose: () => void; onGenerate: (template: ReportTemplate, params: any) => void;}> = ({ onClose, onGenerate }) => {
    const { t } = useI18n();
    const [selectedTemplate, setSelectedTemplate] = useState<ReportTemplate | null>(null);
    const [params, setParams] = useState<any>({});
    
    const handleParamChange = (key: string, value: string) => setParams(p => ({ ...p, [key]: value }));

    const renderParams = () => {
        if (!selectedTemplate) return null;
        switch(selectedTemplate.id) {
            case 'rt-1':
                return <ParamSelect label={t('aircraft')} value={params.aircraftId} onChange={e => handleParamChange('aircraftId', e.target.value)}>
                    {MOCK_FLEET_DATA.aircraft.map(ac => <option key={ac.id} value={ac.id}>{ac.tailNumber}</option>)}
                </ParamSelect>;
            case 'rt-3':
                 return <ParamSelect label="System" value={params.system} onChange={e => handleParamChange('system', e.target.value)}>
                    {['Propulsion', 'Avionics', 'Hydraulics', 'ECS'].map(sys => <option key={sys} value={sys}>{sys}</option>)}
                </ParamSelect>;
            default:
                return <p className="text-sm text-gray-400">This report covers the entire fleet.</p>;
        }
    };
    
    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center no-print" onClick={onClose}>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-2xl animate-fade-in-up" onClick={e => e.stopPropagation()}>
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Generate a New Report</h2>
                </div>
                <div className="p-6 grid grid-cols-2 gap-6">
                    <div>
                         <h3 className="font-semibold text-gray-800 dark:text-white mb-3">1. Select a Template</h3>
                         <div className="space-y-2 max-h-80 overflow-y-auto">
                            {REPORT_TEMPLATES.map(template => (
                                <div key={template.id} onClick={() => setSelectedTemplate(template)}
                                     className={`p-3 rounded-lg cursor-pointer border-2 ${selectedTemplate?.id === template.id ? 'bg-sky-600/20 border-sky-500' : 'bg-gray-50 dark:bg-gray-800/50 border-transparent hover:border-sky-500/50'}`}>
                                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{t(template.name as any)}</h4>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                         <h3 className="font-semibold text-gray-800 dark:text-white mb-3">2. Set Parameters</h3>
                         <div className="space-y-4">
                            {renderParams()}
                         </div>
                    </div>
                </div>
                 <div className="flex justify-end p-6 border-t border-gray-200 dark:border-gray-700 space-x-3">
                    <button onClick={onClose} className="py-2 px-4 text-sm font-semibold rounded-lg bg-gray-200 hover:bg-gray-300 dark:bg-slate-600 dark:hover:bg-slate-500 text-gray-700 dark:text-white">{t('cancel')}</button>
                    <button onClick={() => selectedTemplate && onGenerate(selectedTemplate, params)} disabled={!selectedTemplate} className="py-2 px-4 text-sm font-semibold rounded-lg bg-sky-600 hover:bg-sky-500 text-white disabled:bg-gray-500 disabled:cursor-not-allowed">
                        {t('generate_report')}
                    </button>
                </div>
            </div>
        </div>
    );
};

const ParamSelect: React.FC<{label: string, children: React.ReactNode, value: string, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void}> = ({ label, children, value, onChange }) => (
    <div>
        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{label}</label>
        <select value={value} onChange={onChange} className="w-full bg-gray-100 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-md py-2 px-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500">
            {children}
        </select>
    </div>
);


export default Reports;