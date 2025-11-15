import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Analysis from '../components/Analysis';
import { I18nProvider } from '../context/I18nContext';

jest.mock('../components/analysis/TimeSeriesAnalysis', () => () => <div>Mocked Time-Series Analysis</div>);
jest.mock('../components/analysis/FrequencyAnalysis', () => () => <div>Mocked Frequency Analysis</div>);
jest.mock('../components/analysis/TrendAnalysis', () => () => <div>Mocked Failure Trend Analysis</div>);
jest.mock('../components/analysis/DataProcessingAnalysis', () => () => <div>Mocked Data Processing Analysis</div>);
jest.mock('../components/analysis/FeatureEngineeringAnalysis', () => () => <div>Mocked Feature Engineering Analysis</div>);
jest.mock('../components/analysis/TransientSignatureAnalysis', () => () => <div>Mocked Transient Signature Analysis</div>);
jest.mock('../components/analysis/DiagnosticAnalysis', () => () => <div>Mocked Diagnostic Analysis</div>);
jest.mock('../components/analysis/PlaceholderAnalysisPage', () => ({ title }: { title: string }) => <div data-testid="placeholder-page">{title}</div>);
jest.mock('../components/analysis/RootCauseAnalysis', () => () => <div>Mocked Root Cause Analysis</div>);
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

    test('renders System-of-Systems Context Analysis sub-page', () => {
        render(
            <I18nProvider>
                <Analysis subPage="System-of-Systems Context Analysis" />
            </I18nProvider>
        );
        expect(screen.getByTestId('placeholder-page')).toHaveTextContent('System-of-Systems (SoS) Context');
    });
});
