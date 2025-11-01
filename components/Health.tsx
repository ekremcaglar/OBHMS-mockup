import React, { useState, useEffect } from 'react';
import StructuralHealth from './health/StructuralHealth';
import EngineHealth from './health/EngineHealth';
import PilotHealth from './health/PilotHealth';
import { useI18n } from '../context/I18nContext';
import { HealthSubPage } from '../types';
import Icon from './Icon';

interface HealthProps {
    onAircraftSelect: (id: string) => void;
    subPage: HealthSubPage;
}

const Health: React.FC<HealthProps> = ({ onAircraftSelect, subPage }) => {
    const { t } = useI18n();
    const [activeTab, setActiveTab] = useState<HealthSubPage>(subPage);

    useEffect(() => {
        setActiveTab(subPage);
    }, [subPage]);

    const tabs: { id: HealthSubPage; label: string; icon: string }[] = [
        { id: 'Structural', label: t('structural_health'), icon: 'Activity' },
        { id: 'Engine', label: t('engine_health'), icon: 'Wrench' },
        { id: 'Pilot', label: t('pilot_health'), icon: 'User' },
    ];

    const renderSubPage = () => {
        switch (activeTab) {
            case 'Structural':
                return <StructuralHealth />;
            case 'Engine':
                return <EngineHealth onAircraftSelect={onAircraftSelect} />;
            case 'Pilot':
                return <PilotHealth />;
            default:
                return <StructuralHealth />;
        }
    };
    
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                 <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {t('health_monitoring')}
                </h1>
                <div className="p-1 bg-gray-200 dark:bg-gray-800/50 rounded-lg flex items-center space-x-1">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-colors flex items-center space-x-2 ${
                                activeTab === tab.id
                                    ? 'bg-white dark:bg-gray-700 text-sky-600 dark:text-white shadow'
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-gray-700/50'
                            }`}
                        >
                           <Icon name={tab.icon} className="w-4 h-4" />
                           <span>{tab.label}</span>
                        </button>
                    ))}
                </div>
            </div>
            <div className="animate-fade-in">
                 {renderSubPage()}
            </div>
        </div>
    );
};

export default Health;