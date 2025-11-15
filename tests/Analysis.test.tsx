import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Analysis from '../components/Analysis';
import { I18nProvider } from '../context/I18nContext';

jest.mock('../components/analysis/TimeSeriesAnalysis', () => () => <div data-testid="timeseries-analysis">Mocked Time-Series Analysis</div>);
jest.mock('../components/Icon', () => () => <svg />);

describe('Analysis Component', () => {
    test('renders Time-Series Analysis sub-page', () => {
        render(
            <I18nProvider>
                <Analysis subPage="Time-Series Analysis" />
            </I18nProvider>
        );
        expect(screen.getByTestId('timeseries-analysis')).toBeInTheDocument();
    });
});
