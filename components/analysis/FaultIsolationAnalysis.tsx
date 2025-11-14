import React, { useState, useMemo } from 'react';
import { MOCK_FAULT_LOGS, MOCK_FAULT_ISOLATION_ANALYSIS } from '../../constants';
import FormSelect from '../forms/FormSelect';
import { useI18n } from '../../context/I18nContext';
import Icon from '../Icon';

const FaultIsolationAnalysis: React.FC = () => {
    const { t } = useI18n();
    const [selectedFaultId, setSelectedFaultId] = useState<string | null>('fl-2');

    const selectedFault = useMemo(() =>
        MOCK_FAULT_LOGS.find(log => log.id === selectedFaultId)
    , [selectedFaultId]);

    const isolationData = useMemo(() =>
        selectedFaultId ? MOCK_FAULT_ISOLATION_ANALYSIS[selectedFaultId] : null
    , [selectedFaultId]);

    const handleFaultChange = (id: string) => {
        setSelectedFaultId(id);
    };

    const severityColor = {
        'High': 'text-red-500 bg-red-500/10',
        'Medium': 'text-yellow-500 bg-yellow-500/10',
        'Low': 'text-sky-500 bg-sky-500/10',
    };

    const skillLevelColor = {
        'Beginner': 'text-green-500 bg-green-500/10',
        'Intermediate': 'text-yellow-500 bg-yellow-500/10',
        'Advanced': 'text-red-500 bg-red-500/10',
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-14rem)]">
            {/* Controls Panel */}
            <aside className="lg:col-span-4 bg-white dark:bg-gray-800/30 border border-gray-200 dark:border-gray-700/30 rounded-xl p-6 flex flex-col">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">Select Fault Code</h2>
                <div className="space-y-6">
                    <FormSelect label="Active Fault Logs" value={selectedFaultId || ''} onChange={e => handleFaultChange(e.target.value)}>
                        <option value="" disabled>Select a fault...</option>
                        {MOCK_FAULT_LOGS.map(log =>
                            <option key={log.id} value={log.id}>
                                {log.code} - {log.aircraft}
                            </option>
                        )}
                    </FormSelect>
                </div>
                {selectedFault && (
                    <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6 space-y-4 text-sm">
                        <h3 className="text-md font-semibold text-gray-800 dark:text-white mb-2">Fault Details</h3>
                        <div className="flex justify-between">
                            <span className="text-gray-500 dark:text-gray-400">Aircraft:</span>
                            <span className="font-medium text-gray-700 dark:text-gray-200">{selectedFault.aircraft}</span>
                        </div>
                         <div className="flex justify-between">
                            <span className="text-gray-500 dark:text-gray-400">System:</span>
                            <span className="font-medium text-gray-700 dark:text-gray-200">{selectedFault.system}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500 dark:text-gray-400">Timestamp:</span>
                            <span className="font-medium text-gray-700 dark:text-gray-200">{selectedFault.timestamp}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-500 dark:text-gray-400">Severity:</span>
                            <span className={`font-medium px-2 py-0.5 rounded-full text-xs ${severityColor[selectedFault.severity] || ''}`}>{selectedFault.severity}</span>
                        </div>
                         <div className="text-left pt-2">
                            <span className="text-gray-500 dark:text-gray-400 block mb-1">Description:</span>
                            <p className="font-medium text-gray-700 dark:text-gray-200">{selectedFault.description}</p>
                        </div>
                    </div>
                )}
            </aside>

            {/* Analysis Area */}
            <main className="lg:col-span-8 bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-xl shadow-lg p-6 flex flex-col">
                {isolationData ? (
                    <div className="h-full overflow-y-auto pr-2">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Fault Isolation Analysis Report</h2>

                        <div>
                            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3 flex items-center gap-2">
                                <Icon name="Wrench" className="w-5 h-5" />
                                Recommended LRU Analysis (Ranked)
                            </h3>
                            <div className="space-y-6">
                                {isolationData.recommendedLRUs.map((lru, i) => (
                                    <div key={i} className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h4 className="font-semibold text-gray-800 dark:text-gray-100">{i + 1}. {lru.lruName}</h4>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">{lru.partNumber}</p>
                                            </div>
                                            <div className="text-right flex-shrink-0">
                                                <div className="text-sm font-bold text-sky-500 dark:text-sky-400">Confidence: {(lru.confidence * 100).toFixed(0)}%</div>
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-3">{lru.rationale}</p>
                                        <div className="mt-4 p-3 bg-sky-500/10 rounded-lg text-sm">
                                            <p className="font-semibold text-sky-800 dark:text-sky-200 flex items-center gap-2">
                                                <Icon name="Play" className="w-4 h-4" />
                                                Recommended Action
                                            </p>
                                            <p className="text-sky-700 dark:text-sky-300 mt-1">{lru.recommendedAction}</p>
                                        </div>

                                        <div className="mt-4">
                                            <h5 className="text-md font-semibold text-gray-700 dark:text-gray-200 mb-2">Potential PLRUs:</h5>
                                            <div className="space-y-3">
                                                {lru.potentialPLRUs.map((plru, j) => (
                                                    <div key={j} className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800">
                                                         <div className="flex items-start justify-between">
                                                            <div>
                                                                <h6 className="font-semibold text-gray-800 dark:text-gray-100">{plru.plruName}</h6>
                                                                <p className="text-xs text-gray-500 dark:text-gray-400">{plru.partNumber}</p>
                                                            </div>
                                                            <div className="text-right">
                                                                <div className="text-xs font-bold text-teal-500 dark:text-teal-400">Confidence: {(plru.confidence * 100).toFixed(0)}%</div>
                                                                <div className={`mt-1 font-medium px-2 py-0.5 rounded-full text-xs ${skillLevelColor[plru.skillLevel] || ''}`}>{plru.skillLevel}</div>
                                                            </div>
                                                        </div>
                                                        <p className="text-xs text-gray-600 dark:text-gray-300 mt-2">{plru.rationale}</p>
                                                        <div className="mt-3 border-t border-gray-200 dark:border-gray-600 pt-2">
                                                            <p className="text-xs font-semibold text-gray-600 dark:text-gray-300">Tools: {plru.toolsRequired.join(', ')}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-500 text-center">
                        <p>Select a fault code to view its fault isolation analysis.</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default FaultIsolationAnalysis;