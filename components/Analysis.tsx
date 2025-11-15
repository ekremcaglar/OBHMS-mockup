import React from 'react';
import TimeSeriesAnalysis from './analysis/TimeSeriesAnalysis';
import FrequencyAnalysis from './analysis/FrequencyAnalysis';
import TrendAnalysis from './analysis/TrendAnalysis';
import DataProcessingAnalysis from './analysis/DataProcessingAnalysis';
import FeatureEngineeringAnalysis from './analysis/FeatureEngineeringAnalysis';
import TransientSignatureAnalysis from './analysis/TransientSignatureAnalysis';
import DiagnosticAnalysis from './analysis/DiagnosticAnalysis';
import SurvivalAnalysis from './analysis/SurvivalAnalysis';
import { useI18n } from '../context/I18nContext';
import { AnalysisSubPage } from '../types';
import Icon from './Icon';
import PlaceholderAnalysisPage from './analysis/PlaceholderAnalysisPage';

interface AnalysisProps {
    subPage: AnalysisSubPage;
}

const descriptions: Record<AnalysisSubPage, string> = {
    'Time-Series Analysis': 'Methods focused on modeling and understanding data points indexed over time, crucial for trend and temporal event correlation.',
    'Data Processing Analysis': 'Comprehensive cleaning, validation, synchronization (time alignment), and conversion of raw sensor data into standardized formats for analysis.',
    'Feature Engineering Analysis': 'The creation of new, meaningful, and predictive variables (features) from raw data (e.g., calculating Root Mean Square from vibration signals, or extracting duty cycle parameters).',
    'Frequency Analysis': 'Transforms time-domain signals (like vibration or acoustics) into the frequency domain to identify specific energy components (harmonics, sidebands) indicative of mechanical faults.',
    'Transient Signature Analysis': 'Focused analysis on short-duration, high-energy events (transients) that often signify a specific failure mode, such as an impact or sudden system change.',
    'Diagnostic Analysis': 'Traditional analysis correlating observed symptoms (fault codes, limit exceedances) to a known failure mode and location.',
    'Fault Isolation Analysis': 'Advanced algorithms to pinpoint the exact Line-Replaceable Unit (LRU) or Part-Level Replaceable Unit (PLRU) responsible for a detected fault.',
    'Root Cause Analysis': 'A structured process (e.g., Fault Tree, 5-Whys) leveraging all available data to determine the fundamental reason a failure occurred.',
    'Testability Analysis': 'Assessment and utilization of embedded test sequences and health logic to verify component functionality and fault status.',
    'Inter-Parameter Correlation Analysis': 'Statistical methods to identify dependencies and relationships between different sensor parameters, often revealing cascading failures.',
    'Topology-Based Analysis': 'Analysis using the aircraft\'s system architecture/schematics to track fault propagation across connected systems.',
    'Prognostic Analysis': 'Application of physics-based, data-driven, or hybrid models to estimate a component’s Remaining Useful Life (RUL).',
    'Predictive Analytics': 'Broad term encompassing RUL, but also forecasting future operational parameters and likelihood of mission success.',
    'Survival Analysis': 'Statistical methods used to model and predict the time until a specific event (failure) occurs, incorporating data from both failed and unfailed components.',
    'Anomaly Detection Analysis': 'Utilizes Machine Learning (ML) to identify deviations from normal operational baselines, often signaling the onset of a fault before a hard code is generated.',
    'Failure Trend Analysis': 'Statistical tracking of the frequency and nature of failures over time, used to validate and tune prognostic models.',
    'Digital Twin Analysis': 'Integration of high-fidelity physics models with real-time flight data to create a virtual representation of the aircraft/component for simulation and accurate RUL estimation.',
    'Cross-Aircraft Trend Comparison': 'Benchmarking a specific aircraft or component\'s degradation rate against the entire fleet average or a designated \'healthy\' subset.',
    'Cross-Aircraft Anomaly Correlation': 'Identifying if similar anomalies or pre-cursors are appearing across multiple aircraft, signaling a systemic fleet issue.',
    'Reliability Analysis': 'Calculation and tracking of system reliability metrics (e.g., MTBF, MTTR) crucial for logistics, parts stocking, and maintenance budgeting.',
    'Operational Analysis': 'Evaluation of component health in the context of operational factors (mission type, flight envelope, pilot actions, environmental data).',
    'System-of-Systems Context Analysis': 'Analyzing the health impact of one major subsystem (e.g., Engine Health) on other critical subsystems (e.g., Flight Control, Structural Integrity).',
    'Impact Analysis': 'Quantifying the operational impact (e.g., mission capability reduction, cost increase, safety risk) of a predicted or current failure state.',
    'Natural Language Search Analysis': 'Analysis of unstructured text data (manuals, maintenance notes, pilot reports) to derive context and support diagnostic searches.',
    'Life and Usage Management Analysis': 'Tracking and auditing the total life consumed by components against their design life limits, based on actual usage profiles.',
    'Structural Health Management Analysis': 'Specific analysis focused on monitoring the integrity of airframe structures for cracks, fatigue, or stress.',
    'Engine Health Management Analysis': 'Specific analysis and models tailored for gas turbine engines, leveraging specialized sensor data.',
    'Pilot Health Monitoring Analysis': 'Integration and analysis of physiological or cognitive data (if available and relevant) to correlate human factors with aircraft performance/system anomalies.',
    'Statistical Analysis': 'General application of statistical inference (e.g., variance, hypothesis testing, regression) to validate findings and quantify uncertainty.'
};

const subPageToTitleKey: Record<AnalysisSubPage, string> = {
    'Time-Series Analysis': 'time_series_analysis',
    'Data Processing Analysis': 'data_processing_analysis',
    'Feature Engineering Analysis': 'feature_engineering_analysis',
    'Frequency Analysis': 'frequency_analysis',
    'Transient Signature Analysis': 'transient_signature_analysis',
    'Diagnostic Analysis': 'diagnostic_analysis',
    'Fault Isolation Analysis': 'fault_isolation_analysis',
    'Root Cause Analysis': 'root_cause_analysis',
    'Testability Analysis': 'testability_analysis',
    'Inter-Parameter Correlation Analysis': 'inter_parameter_correlation_analysis',
    'Topology-Based Analysis': 'topology_based_analysis',
    'Prognostic Analysis': 'prognostic_analysis',
    'Predictive Analytics': 'predictive_analytics',
    'Survival Analysis': 'survival_analysis',
    'Anomaly Detection Analysis': 'anomaly_detection_analysis',
    'Failure Trend Analysis': 'failure_trend_analysis',
    'Digital Twin Analysis': 'digital_twin_analysis',
    'Cross-Aircraft Trend Comparison': 'cross_aircraft_trend_comparison',
    'Cross-Aircraft Anomaly Correlation': 'cross_aircraft_anomaly_correlation',
    'Reliability Analysis': 'reliability_analysis',
    'Operational Analysis': 'operational_analysis',
    'System-of-Systems Context Analysis': 'system_of_systems_context_analysis',
    'Impact Analysis': 'impact_analysis',
    'Natural Language Search Analysis': 'natural_language_search_analysis',
    'Life and Usage Management Analysis': 'life_and_usage_management_analysis',
    'Statistical Analysis': 'statistical_analysis',
    'Structural Health Management Analysis': 'structural_health_management_analysis',
    'Engine Health Management Analysis': 'engine_health_management_analysis',
    'Pilot Health Monitoring Analysis': 'pilot_health_monitoring_analysis'
};

const Analysis: React.FC<AnalysisProps> = ({ subPage }) => {
    const { t } = useI18n();

    const getTitle = () => {
        const titleKey = subPageToTitleKey[subPage] || 'analysis';
        return t(titleKey as any);
    }

    const renderSubPage = () => {
        switch (subPage) {
            case 'Time-Series Analysis':
                return <TimeSeriesAnalysis />;
            case 'Frequency Analysis':
                return <FrequencyAnalysis />;
            case 'Failure Trend Analysis':
                return <TrendAnalysis />;
            case 'Data Processing Analysis':
                return <DataProcessingAnalysis />;
            case 'Feature Engineering Analysis':
                return <FeatureEngineeringAnalysis />;
            case 'Transient Signature Analysis':
                return <TransientSignatureAnalysis />;
            case 'Diagnostic Analysis':
                return <DiagnosticAnalysis />;
            case 'Survival Analysis':
                return <SurvivalAnalysis />;
            default:
                const description = descriptions[subPage] || "Description not found for this analysis type.";
                return <PlaceholderAnalysisPage title={getTitle()} description={description} />;
        }
    };
    

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <Icon name="TrendingUp" className="w-8 h-8" />
                {getTitle()}
            </h1>
            {renderSubPage()}
        </div>
    );
};

export default Analysis;