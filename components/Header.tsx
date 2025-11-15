import React, { useState, useEffect } from 'react';
import Icon from './Icon';
import { UserRole, HealthSubPage, AnalysisSubPage } from '../types';
import { useI18n } from '../context/I18nContext';
import { Sun, Moon } from 'lucide-react';
import { ADMIN_ROLES, ROLE_GROUPS, ROLE_I18N_MAP } from '../constants';

interface HeaderProps {
    currentPage: string;
    setCurrentPage: (page: string) => void;
    setSelectedAircraftId: (id: string | null) => void;
    userRole: UserRole;
    setUserRole: (role: UserRole) => void;
    setHealthSubPage: (subPage: HealthSubPage) => void;
    setAnalysisSubPage: (subPage: AnalysisSubPage) => void;
}

const NavItem: React.FC<{ label: string; page: string; currentPage: string; onClick: () => void; }> = ({ label, page, currentPage, onClick }) => {
    const isActive = currentPage === page;
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${isActive ? 'bg-sky-600 text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
        >
            {label}
        </button>
    );
};

const MegaMenuColumn: React.FC<{title: string, children: React.ReactNode}> = ({ title, children }) => (
    <div className="p-4">
        <h3 className="mb-4 text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{title}</h3>
        <div className="space-y-2">
            {children}
        </div>
    </div>
);

const MegaMenuItem: React.FC<{onClick: () => void, children: React.ReactNode}> = ({ onClick, children }) => (
     <a onClick={onClick} className="block text-sm text-gray-600 dark:text-gray-300 hover:text-sky-500 dark:hover:text-sky-400 cursor-pointer font-medium">
        {children}
    </a>
);


const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage, setSelectedAircraftId, userRole, setUserRole, setHealthSubPage, setAnalysisSubPage }) => {
    const { t, language, setLanguage } = useI18n();
    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        const root = window.document.documentElement;
        if (isDarkMode) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [isDarkMode]);

    const handleNav = (page: string) => {
        setSelectedAircraftId(null);
        setCurrentPage(page);
    };

    const handleHealthNav = (subPage: HealthSubPage) => {
        setHealthSubPage(subPage);
        handleNav('Health');
    };

    const handleAnalysisNav = (subPage: AnalysisSubPage) => {
        setAnalysisSubPage(subPage);
        handleNav('Analysis');
    }

    return (
        <header className="bg-white/80 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700/50 backdrop-blur-sm sticky top-0 z-50 no-print">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-6">
                         <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNav('Home')}>
                            <Icon name="Plane" className="h-8 w-8 text-sky-600 dark:text-sky-500" />
                            <span className="text-xl font-bold text-gray-800 dark:text-white tracking-wider whitespace-nowrap">KAAN OBHMS</span>
                        </div>
                        <nav className="hidden md:flex items-center space-x-1">
                            <NavItem label={t('dashboards')} page="Dashboards" currentPage={currentPage} onClick={() => handleNav('Dashboards')} />
                            <NavItem label={t('chart_builder')} page="Chart Builder" currentPage={currentPage} onClick={() => handleNav('Chart Builder')} />
                             <div className="relative group">
                                <button className={`px-4 py-2 text-sm font-medium rounded-md transition-colors flex items-center ${currentPage === 'Analysis' ? 'bg-sky-600 text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
                                    {t('analysis')}
                                    <Icon name="ChevronDown" className="w-4 h-4 ml-1" />
                                </button>
                                <div className="absolute hidden group-hover:grid bg-white dark:bg-gray-800 rounded-lg shadow-lg top-full mt-1 z-20 border border-gray-200 dark:border-gray-700 left-1/2 -translate-x-1/2 w-[900px] grid-cols-5">
                                    <MegaMenuColumn title={t('diagnostics')}>
                                        <MegaMenuItem onClick={() => handleAnalysisNav('Diagnostic Analysis')}>{t('diagnostic_analysis')}</MegaMenuItem>
                                        <MegaMenuItem onClick={() => handleAnalysisNav('Fault Isolation Analysis')}>{t('fault_isolation_analysis')}</MegaMenuItem>
                                        <MegaMenuItem onClick={() => handleAnalysisNav('Root Cause Analysis')}>{t('root_cause_analysis')}</MegaMenuItem>
                                        <MegaMenuItem onClick={() => handleAnalysisNav('Testability Analysis')}>{t('testability_analysis')}</MegaMenuItem>
                                        <MegaMenuItem onClick={() => handleAnalysisNav('Topology-Based Analysis')}>{t('topology_based_analysis')}</MegaMenuItem>
                                        <MegaMenuItem onClick={() => handleAnalysisNav('Inter-Parameter Correlation Analysis')}>{t('inter_parameter_correlation_analysis')}</MegaMenuItem>
                                    </MegaMenuColumn>
                                    <MegaMenuColumn title={t('prognostics')}>
                                        <MegaMenuItem onClick={() => handleAnalysisNav('Prognostic Analysis')}>{t('prognostic_analysis')}</MegaMenuItem>
                                        <MegaMenuItem onClick={() => handleAnalysisNav('Predictive Analytics')}>{t('predictive_analytics')}</MegaMenuItem>
                                        <MegaMenuItem onClick={() => handleAnalysisNav('Survival Analysis')}>{t('survival_analysis')}</MegaMenuItem>
                                        <MegaMenuItem onClick={() => handleAnalysisNav('Anomaly Detection Analysis')}>{t('anomaly_detection_analysis')}</MegaMenuItem>
                                        <MegaMenuItem onClick={() => handleAnalysisNav('Failure Trend Analysis')}>{t('failure_trend_analysis')}</MegaMenuItem>
                                        <MegaMenuItem onClick={() => handleAnalysisNav('Digital Twin Analysis')}>{t('digital_twin_analysis')}</MegaMenuItem>
                                    </MegaMenuColumn>
                                    <MegaMenuColumn title={t('fleet_operational')}>
                                        <MegaMenuItem onClick={() => handleAnalysisNav('Cross-Aircraft Trend Comparison')}>{t('cross_aircraft_trend_comparison')}</MegaMenuItem>
                                        <MegaMenuItem onClick={() => handleAnalysisNav('Cross-Aircraft Anomaly Correlation')}>{t('cross_aircraft_anomaly_correlation')}</MegaMenuItem>
                                        <MegaMenuItem onClick={() => handleAnalysisNav('Reliability Analysis')}>{t('reliability_analysis')}</MegaMenuItem>
                                        <MegaMenuItem onClick={() => handleAnalysisNav('Operational Analysis')}>{t('operational_analysis')}</MegaMenuItem>
                                        <MegaMenuItem onClick={() => handleAnalysisNav('System-of-Systems Context Analysis')}>{t('system_of_systems_context_analysis')}</MegaMenuItem>
                                        <MegaMenuItem onClick={() => setCurrentPage('Impact Analysis')}>{t('impact_analysis')}</MegaMenuItem>
                                    </MegaMenuColumn>
                                    <MegaMenuColumn title={t('core_methods')}>
                                        <MegaMenuItem onClick={() => handleAnalysisNav('Time-Series Analysis')}>{t('time_series_analysis')}</MegaMenuItem>
                                        <MegaMenuItem onClick={() => handleAnalysisNav('Data Processing Analysis')}>{t('data_processing_analysis')}</MegaMenuItem>
                                        <MegaMenuItem onClick={() => handleAnalysisNav('Feature Engineering Analysis')}>{t('feature_engineering_analysis')}</MegaMenuItem>
                                        <MegaMenuItem onClick={() => handleAnalysisNav('Frequency Analysis')}>{t('frequency_analysis')}</MegaMenuItem>
                                        <MegaMenuItem onClick={() => handleAnalysisNav('Transient Signature Analysis')}>{t('transient_signature_analysis')}</MegaMenuItem>
                                        <MegaMenuItem onClick={() => handleAnalysisNav('Statistical Analysis')}>{t('statistical_analysis')}</MegaMenuItem>
                                        <MegaMenuItem onClick={() => handleAnalysisNav('Natural Language Search Analysis')}>{t('natural_language_search_analysis')}</MegaMenuItem>
                                        <MegaMenuItem onClick={() => handleAnalysisNav('Life and Usage Management Analysis')}>{t('life_and_usage_management_analysis')}</MegaMenuItem>
                                    </MegaMenuColumn>
                                    <MegaMenuColumn title={t('system_health')}>
                                         <MegaMenuItem onClick={() => handleAnalysisNav('Structural Health Management Analysis')}>{t('structural_health_management_analysis')}</MegaMenuItem>
                                         <MegaMenuItem onClick={() => handleAnalysisNav('Engine Health Management Analysis')}>{t('engine_health_management_analysis')}</MegaMenuItem>
                                         <MegaMenuItem onClick={() => handleAnalysisNav('Pilot Health Monitoring Analysis')}>{t('pilot_health_monitoring_analysis')}</MegaMenuItem>
                                    </MegaMenuColumn>
                                </div>
                            </div>
                             <div className="relative group">
                                <button className={`px-4 py-2 text-sm font-medium rounded-md transition-colors flex items-center ${currentPage === 'Health' ? 'bg-sky-600 text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
                                    {t('health_monitoring')}
                                    <Icon name="ChevronDown" className="w-4 h-4 ml-1" />
                                </button>
                                <div className="absolute hidden group-hover:block bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 w-48 top-full mt-1 z-20 border border-gray-200 dark:border-gray-700">
                                    <a onClick={() => handleHealthNav('Structural')} className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">{t('structural_health')}</a>
                                    <a onClick={() => handleHealthNav('Engine')} className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">{t('engine_health')}</a>
                                    <a onClick={() => handleHealthNav('Pilot')} className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">{t('pilot_health')}</a>
                                </div>
                            </div>
                            <NavItem label={t('reports')} page="Reports" currentPage={currentPage} onClick={() => handleNav('Reports')} />
                            <NavItem label="TCP" page="TCP" currentPage={currentPage} onClick={() => handleNav('TCP')} />
                            <NavItem label={t('all')} page="All" currentPage={currentPage} onClick={() => handleNav('All')} />
                            <NavItem label="Feedback" page="FeedbackDashboard" currentPage={currentPage} onClick={() => handleNav('FeedbackDashboard')} />
                            {ADMIN_ROLES.includes(userRole) && <NavItem label={t('administration')} page="Administration" currentPage={currentPage} onClick={() => handleNav('Administration')} />}
                        </nav>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                           {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>
                        <select
                            value={userRole}
                            onChange={(e) => setUserRole(e.target.value as UserRole)}
                            className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md py-1.5 px-3 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                        >
                            {ROLE_GROUPS.map(group => (
                                <optgroup key={group.group} label={t(group.group as any)}>
                                    {group.roles.map(role => (
                                        <option key={role} value={role}>{t(ROLE_I18N_MAP[role] as any)}</option>
                                    ))}
                                </optgroup>
                            ))}
                        </select>
                         <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value as 'en' | 'tr')}
                            className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md py-1.5 px-3 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                        >
                            <option value="en">EN</option>
                            <option value="tr">TR</option>
                        </select>
                        <div className="h-6 w-px bg-gray-200 dark:bg-gray-700"></div>
                        <button className="relative p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                            <Icon name="Bell" className="w-5 h-5" />
                            <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                            </span>
                        </button>
                        <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                            <Icon name="User" className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;