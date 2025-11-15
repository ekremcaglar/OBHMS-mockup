import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Analysis from '../components/Analysis';
import { I18nProvider } from '../context/I18nContext';

jest.mock('../components/analysis/TimeSeriesAnalysis', () => () => <div>Mocked Time-Series Analysis</div>);
jest.mock('../components/analysis/FrequencyAnalysis', () => () => <div>Mocked Frequency Analysis</div>);
jest.mock('../components/analysis/TrendAnalysis', () => () => <div>Mocked TrendAnalysis</div>);
jest.mock('../components/analysis/DataProcessingAnalysis', () => () => <div>Mocked DataProcessingAnalysis</div>);
jest.mock('../components/analysis/FeatureEngineeringAnalysis', () => () => <div>Mocked FeatureEngineeringAnalysis</div>);
jest.mock('../components/analysis/TransientSignatureAnalysis', () => () => <div>Mocked TransientSignatureAnalysis</div>);
jest.mock('../components/analysis/DiagnosticAnalysis', () => () => <div>Mocked DiagnosticAnalysis</div>);
jest.mock('../components/analysis/FaultIsolationAnalysis', () => () => <div>Mocked FaultIsolationAnalysis</div>);
jest.mock('../components/analysis/TestabilityAnalysis', () => () => <div>Mocked TestabilityAnalysis</div>);
jest.mock('../components/analysis/InterParameterCorrelationAnalysis', () => () => <div>Mocked InterParameterCorrelationAnalysis</div>);
jest.mock('../components/analysis/TopologyBasedAnalysis', () => () => <div>Mocked TopologyBasedAnalysis</div>);
jest.mock('../components/analysis/PrognosticAnalysis', () => () => <div>Mocked PrognosticAnalysis</div>);
jest.mock('../components/analysis/AnomalyDetectionAnalysis', () => () => <div>Mocked AnomalyDetectionAnalysis</div>);
jest.mock('../components/analysis/ReliabilityAnalysis', () => () => <div>Mocked ReliabilityAnalysis</div>);
jest.mock('../components/health/EngineHealth', () => () => <div>Mocked EngineHealth</div>);
jest.mock('../components/analysis/PlaceholderAnalysisPage', () => ({ title, description }) => (
    <div>
        <h1>{title}</h1>
        <p>{description}</p>
    </div>
));
jest.mock('../components/Icon', () => () => <svg />);

describe('Analysis Component', () => {
    test('renders Time-Series Analysis sub-page', () => {
        render(
            <I18nProvider>
                <Analysis subPage="Time-Series Analysis" />
            </I18nProvider>
        );
        expect(screen.getByText('Mocked Time-Series Analysis')).toBeInTheDocument();
    });

    test('renders Frequency Analysis sub-page', () => {
        render(
            <I18nProvider>
                <Analysis subPage="Frequency Analysis" />
            </I18nProvider>
        );
        expect(screen.getByText('Mocked Frequency Analysis')).toBeInTheDocument();
    });
});
