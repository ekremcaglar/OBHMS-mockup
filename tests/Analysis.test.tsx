import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Analysis from '../components/Analysis';
import { I18nProvider } from '../context/I18nContext';

jest.mock('../components/analysis/TimeSeriesAnalysis', () => () => <div>Time-Series Analysis</div>);
jest.mock('../components/analysis/FrequencyAnalysis', () => () => <div>FrequencyAnalysis</div>);
jest.mock('../components/analysis/TrendAnalysis', () => () => <div>TrendAnalysis</div>);
jest.mock('../components/analysis/DataProcessingAnalysis', () => () => <div>DataProcessingAnalysis</div>);
jest.mock('../components/analysis/FeatureEngineeringAnalysis', () => () => <div>FeatureEngineeringAnalysis</div>);
jest.mock('../components/analysis/TransientSignatureAnalysis', () => () => <div>TransientSignatureAnalysis</div>);
jest.mock('../components/analysis/DiagnosticAnalysis', () => () => <div>DiagnosticAnalysis</div>);
jest.mock('../components/analysis/SystemOfSystemsContext', () => () => <div data-testid="sos-context">System-of-Systems (SoS) Context</div>);
jest.mock('../components/Icon', () => () => <svg />);

describe('Analysis Component', () => {
    test('renders Time-Series Analysis sub-page', () => {
        render(
            <I18nProvider>
                <Analysis subPage="Time-Series Analysis" />
            </I18nProvider>
        );
        expect(screen.getByRole('heading', { name: /Time-Series Analysis/i })).toBeInTheDocument();
    });

    test('renders System-of-Systems Context Analysis sub-page', () => {
        render(
            <I18nProvider>
                <Analysis subPage="System-of-Systems Context Analysis" />
            </I18nProvider>
        );
        expect(screen.getByTestId('sos-context')).toBeInTheDocument();
    });
});
