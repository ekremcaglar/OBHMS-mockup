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
                <p className="text-gray-500 dark:text-gray-400 mb-6">The following scenarios illustrate how different roles can leverage the OBHMS platform to perform their duties efficiently and effectively. These are practical, step-by-step examples of real-world workflows.</p>
                
                <UserScenario role="Maintenance Technician" scenario="Investigating a Critical Propulsion Alert">
                    <ol className="list-decimal list-inside space-y-2">
                        <li><strong>Notification:</strong> You start your shift and see KAAN-002 flagged as 'Critical' on the home page's Aircraft Watchlist. The primary alert indicates a 'Propulsion' system issue.</li>
                        <li><strong>Drill-Down:</strong> You click on KAAN-002 to navigate to its detailed health view. You confirm the 'Propulsion' system is in a critical state with a low health index and a key metric showing "Turbine RUL: 10 FH".</li>
                        <li><strong>System Analysis:</strong> You navigate to 'Health Monitoring' &gt; 'Engine Health'. Here, you observe the Real-Time Charts. You notice the starboard engine's vibration levels are consistently high. You also check the 'Engine Parameter Correlation Heatmap' and see a strong positive correlation (e.g., 0.81) between Vibration and EGT, suggesting a thermal-mechanical issue.</li>
                        <li><strong>Visual Inspection:</strong> You go to 'Health Monitoring' &gt; 'Structural Health' and open the 'Digital Twin Viewer'. You select the starboard engine assembly and isolate the high-pressure turbine section to visualize the exact location of the failing component for your upcoming inspection.</li>
                        <li><strong>Find Procedure:</strong> You use the global search bar on the home page and ask: "Procedure for turbine blade inspection due to high vibration on KAAN". The AI Assistant provides the relevant steps from technical manual TM-KAAN-PROP-087 and links to the open TCP for this issue. You now have all the information needed to perform the maintenance.</li>
                    </ol>
                </UserScenario>
                
                <UserScenario role="System Engineering Lead" scenario="Monitoring Fleet Health & Preparing a Briefing">
                    <ol className="list-decimal list-inside space-y-2">
                        <li><strong>Morning Review:</strong> You log in and review your personalized 'Fleet Command Overview' dashboard. You check the key fleet-wide metrics: Mission Capable Rate is at 92.3% and Fleet Availability is at a warning level of 88.5%.</li>
                        <li><strong>Generate Summary:</strong> To get a quick understanding of the situation, you click the 'Generate AI Summary' button. The AI provides a concise, actionable summary, highlighting that KAAN-002 is AOG and KAAN-003 has a persistent hydraulics warning.</li>
                        <li><strong>Fleet-wide Correlation:</strong> To see if KAAN-003's issue is isolated, you navigate to your 'Cross-Fleet System Comparison' dashboard. The 'System Health Comparison' radar chart clearly shows that while other aircraft have nominal hydraulic health (90%+), KAAN-003 is an outlier at 78%.</li>
                        <li><strong>Ad-Hoc Analysis:</strong> You suspect a link to recent operations in a high-humidity environment. You navigate to the 'Chart Builder', create a scatter plot comparing 'Hydraulic System Faults' against 'Ambient Humidity' (from a hypothetical environmental data source), confirming a correlation.</li>
                        <li><strong>Action & Reporting:</strong> Based on your findings, you navigate to the 'TCP' page and draft a new Technical Coordination Package to inspect all hydraulic lines on aircraft operating in similar environments. For the weekly fleet health briefing, you go to the 'Reports' page, generate a 'Fleet Mission Capability' PDF, and attach your custom chart as an appendix.</li>
                    </ol>
                </UserScenario>

                 <UserScenario role="Pilot / Operator" scenario="Pre-Flight Check & Post-Flight Debrief">
                    <ol className="list-decimal list-inside space-y-2">
                        <li><strong>Pre-Flight Check:</strong> Before a training sortie on KAAN-004, you log into the OBHMS. You navigate to 'Health Monitoring' &gt; 'Pilot Health'. You review your fatigue index, which is nominal, and check the 'Pilot Skills Assessment' radar chart to see how your 'Combat Maneuvers' proficiency compares to the squadron average.</li>
                        <li><strong>Aircraft Status Review:</strong> You use the search bar to query "Status of KAAN-004". The system confirms the aircraft is mission capable with all systems nominal. You click the link to its detailed view and confirm its health indices are all above 98.</li>
                        <li><strong>Post-Flight Debrief:</strong> During the mission, you noticed a brief, unusual shudder during a high-G turn. After landing, you use the OBHMS search bar to log your observation: "Noticed a brief shudder in the airframe of KAAN-004 during a 7G turn at 15,000 feet near waypoint CHARLIE."</li>
                        <li><strong>System Correlation:</strong> The AI Assistant processes your natural language input, automatically correlates it with the flight data recorder, and flags a 'High-G Stress Event' in the 'Airframe Stress Chart' on the Structural Health page. It creates a low-priority maintenance log for engineers to review the sensor data from that specific flight segment, potentially preventing a future structural issue.</li>
                    </ol>
                </UserScenario>

                <UserScenario role="Prognostic Engineer" scenario="Tuning a Remaining Useful Life (RUL) Model">
                    <ol className="list-decimal list-inside space-y-2">
                        <li><strong>Model Performance Review:</strong> You start in the (placeholder) 'Modeling & Algorithm Management' section, reviewing the performance dashboard for the active turbine blade RUL model. You notice a 15% deviation between predicted and actual wear rates for aircraft in the 101st "Asena" squadron.</li>
                        <li><strong>Hypothesis Formation:</strong> You hypothesize that the model isn't adequately weighting the impact of different mission types.</li>
                        <li><strong>Data Exploration:</strong> Using the 'Chart Builder', you create a scatter plot of 'Turbine Blade Wear' vs. 'Flight Hours'. You then use a categorical filter to color-code the data points by 'Mission Type' ('Combat Air Patrol', 'Interdiction', 'Training'). The chart clearly shows that CAP missions result in a much steeper wear curve.</li>
                        <li><strong>Feature Engineering:</strong> You navigate to the (placeholder) 'Custom Feature Builder'. You create a new derived feature called 'HighStressTime' that counts the cumulative hours an aircraft spends in 'Combat Air Patrol' mode.</li>
                        <li><strong>Model Retraining:</strong> You export the dataset including your new 'HighStressTime' feature. After retraining your RUL model externally with this improved data, you upload the new model version back into the OBHMS for A/B testing against the existing model.</li>
                    </ol>
                </UserScenario>

                <UserScenario role="Logistics Planner / Supply Chain Analyst" scenario="Proactively Ordering Components Based on RUL Forecasts">
                    <ol className="list-decimal list-inside space-y-2">
                        <li><strong>Dashboard Review:</strong> You start your day on your custom 'Logistics & Maintenance Planning' dashboard. The 'RUL Expirations (30d)' metric tile immediately alerts you that 8 critical components are forecasted to need replacement within the next month.</li>
                        <li><strong>Detailed Reporting:</strong> To get specifics, you navigate to the 'Reports' page and generate a 'Component RUL Forecast' report. The report lists the exact components, their part numbers, the affected aircraft (KAAN-002 and KAAN-003), and their predicted failure dates.</li>
                        <li><strong>Inventory Check:</strong> You take the part number for a specific low-RUL turbine blade (P/N 789-T-BLADE) and check it in the (placeholder) 'Component Inventory & Traceability' module. You confirm that you only have one spare in stock, but the forecast shows two are needed.</li>
                        <li><strong>Supply Chain Action:</strong> You switch to the (placeholder) 'Supply Chain & Logistics Dashboard'. You view the lead times and costs for P/N 789-T-BLADE from approved suppliers. You initiate a procurement order directly through the system's ERP integration, ensuring the part arrives before the predicted maintenance event and preventing a costly AOG situation.</li>
                    </ol>
                </UserScenario>

                <UserScenario role="Diagnostic Engineer / Investigator" scenario="Deep Dive into a 'No Fault Found' (NFF) Event">
                    <ol className="list-decimal list-inside space-y-2">
                        <li><strong>Problem Identification:</strong> A 'No Fault Found' (NFF) event is flagged for an avionics bus on KAAN-001 after a pilot reported intermittent MFD blanking. The technician's initial check found no obvious damage.</li>
                        <li><strong>Data Correlation:</strong> You start by going to 'Analysis' -> 'Time-Series Analysis'. You load all relevant parameters for the affected flight: bus voltage, data packet loss rate, and the aircraft's G-force and altitude data. You immediately spot a correlation: the data dropouts only occur during maneuvers exceeding 5G.</li>
                        <li><strong>System Context:</strong> You switch to the (placeholder) 'Topology-Based Analysis' module. It displays a digital schematic of the avionics bay, showing the physical routing of the affected data bus (AV-BUS-07) and its proximity to other components. You see it runs near a major hydraulic line.</li>
                        <li><strong>Hypothesis & Verification:</strong> You hypothesize that airframe flex during high-G loads is causing the bus to chafe against the hydraulic line. To verify this, you open the 'Digital Twin Viewer' on the 'Structural Health' page. You apply a simulated 5G load to the airframe model, which visually confirms the close proximity and potential contact point between the two components.</li>
                        <li><strong>Actionable Insight:</strong> You update the maintenance work order with a highly specific instruction: "Inspect avionics bus P/N 456-ABC for chafing at frame location F-22, adjacent to hydraulic line H-789. Secure with additional high-vibration clamps." This targeted guidance turns a recurring NFF into a successful, permanent repair.</li>
                    </ol>
                </UserScenario>

            </HelpSection>
        </div>
    );
};

export default HelpPage;