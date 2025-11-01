import React from 'react';
import { PILLARS_DATA } from '../constants';
import { useI18n } from '../context/I18nContext';
import Icon from './Icon';

const HelpSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-xl shadow-lg backdrop-blur-sm mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white p-6 border-b border-gray-200 dark:border-gray-700">{title}</h2>
        <div className="p-6">{children}</div>
    </div>
);

const Feature: React.FC<{ title: string; description: string }> = ({ title, description }) => (
    <div className="mb-4">
        <h4 className="font-semibold text-gray-800 dark:text-white">{title}</h4>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{description}</p>
    </div>
);

const UserScenario: React.FC<{ role: string; scenario: string; children: React.ReactNode }> = ({ role, scenario, children }) => (
    <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700 mb-4">
        <h4 className="font-bold text-sky-600 dark:text-sky-400">{role}</h4>
        <p className="font-semibold text-gray-800 dark:text-white mb-2">{scenario}</p>
        <div className="prose prose-sm dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
            {children}
        </div>
    </div>
);

const HelpPage: React.FC = () => {
    const { t } = useI18n();

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                <Icon name="HelpCircle" className="w-10 h-10" />
                KAAN OBHMS Help & Documentation
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-12">
                Welcome to the comprehensive guide for the KAAN Off-Board Health Management System. This document provides a detailed overview of all features and common user scenarios to help you maximize the platform's capabilities.
            </p>

            <HelpSection title="Feature Overview">
                <div className="space-y-10">
                    {PILLARS_DATA.map(pillar => (
                        <div key={pillar.titleKey}>
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 border-b-2 border-sky-500 pb-2">{t(pillar.titleKey as any)}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                                {pillar.sections.map(section => (
                                    <Feature
                                        key={section.key}
                                        title={t(section.titleKey as any)}
                                        description={t(section.descriptionKey as any)}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </HelpSection>

            <HelpSection title="User Case Scenarios">
                <p className="text-gray-500 dark:text-gray-400 mb-6">The following scenarios illustrate how different roles can leverage the OBHMS platform to perform their duties efficiently.</p>
                
                <UserScenario role="Maintenance Technician" scenario="Investigating a Critical Propulsion Alert">
                    <ol className="list-decimal list-inside space-y-2">
                        <li><strong>Notification:</strong> You start your shift and see KAAN-002 flagged as 'Critical' on the home page's Aircraft Watchlist or the Fleet Command dashboard.</li>
                        <li><strong>Drill-Down:</strong> You click on KAAN-002 to navigate to its detailed health view. You immediately see the 'Propulsion' system is in a critical state with a low health index.</li>
                        <li><strong>System Analysis:</strong> You navigate to 'Health Monitoring' &gt; 'Engine Health'. Here, you observe the real-time telemetry charts. You notice the starboard engine's vibration levels are consistently high and EGT is trending upwards, confirming an anomaly.</li>
                        <li><strong>Historical Context:</strong> To understand if this is a new issue, you go to the 'Analysis' page, select 'Time-Series Analysis', and load historical data for KAAN-002's engine vibration. You see a clear upward trend over the last 10 flight hours.</li>
                        <li><strong>Find Procedure:</strong> You use the global search bar on the home page and ask: "What is the procedure for high vibration on the starboard engine for KAAN-002?". The AI Assistant provides the relevant steps from the technical manual and links to the TCP for an immediate inspection.</li>
                    </ol>
                </UserScenario>
                
                <UserScenario role="System Engineering Lead" scenario="Monitoring Fleet Health & Preparing a Briefing">
                    <ol className="list-decimal list-inside space-y-2">
                        <li><strong>Morning Review:</strong> You log in and review the 'Fleet Command Overview' dashboard. You check the key fleet-wide metrics like Mission Capable Rate and Fleet Availability.</li>
                        <li><strong>Generate Summary:</strong> To get a quick understanding of the current situation, you click the 'Generate AI Summary' button on the dashboard. The AI provides a concise, actionable summary of all critical and warning-status aircraft.</li>
                        <li><strong>Ad-Hoc Analysis:</strong> You're curious if the recent increase in hydraulic faults is correlated with specific mission types. You navigate to the 'Chart Builder'. You select 'Historical Fault Data' as a source and create a new bar chart, plotting 'Fault Count' against 'Mission Type' and filtering for the 'Hydraulics' system.</li>
                        <li><strong>Custom Dashboard:</strong> You decide to track this trend over time. You create a 'New Dashboard' named "Hydraulics Investigation", add the chart you just built, and also add a list of all aircraft with current hydraulic system warnings.</li>
                        <li><strong>Generate Report:</strong> For the weekly fleet health briefing, you go to the 'Reports' page, select the 'Fleet Mission Capability' template, and generate a PDF report to share with command staff.</li>
                    </ol>
                </UserScenario>

                 <UserScenario role="Pilot / Operator" scenario="Pre-Flight Check & Post-Flight Debrief">
                    <ol className="list-decimal list-inside space-y-2">
                        <li><strong>Pre-Flight Check:</strong> Before your scheduled sortie on KAAN-004, you log into the OBHMS. You navigate to 'Health Monitoring' &gt; 'Pilot Health' to check your own fatigue index and readiness status.</li>
                        <li><strong>Aircraft Status Review:</strong> You then use the search bar to query "Status of KAAN-004". The system confirms the aircraft is mission capable with all systems nominal. For extra diligence, you click the link to its detailed view and confirm its health indices are all above 95.</li>
                        <li><strong>Post-Flight Debrief:</strong> During the training mission, you noticed a brief, unusual shudder during a high-G maneuver. After landing, you use the OBHMS search bar to log your observation: "Noticed a brief shudder in the airframe of KAAN-004 during a 7G turn at 15,000 feet."</li>
                        <li><strong>System Correlation:</strong> The AI Assistant processes your natural language input, correlates it with flight data, flags a potential high-stress event for the 'Airframe' system, and automatically creates a low-priority maintenance log for engineers to review, potentially preventing a future structural issue.</li>
                    </ol>
                </UserScenario>
            </HelpSection>
        </div>
    );
};

export default HelpPage;