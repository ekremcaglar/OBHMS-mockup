
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Feedback from '../components/Feedback';
import { I18nProvider } from '../context/I18nContext';

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ success: true }),
  })
);

(global as any).html2canvas = jest.fn().mockResolvedValue({
    toDataURL: jest.fn().mockReturnValue('fake_screenshot_data'),
    getContext: () => ({
      strokeRect: jest.fn(),
    }),
});


describe('Feedback Component', () => {
    test('renders the feedback button', () => {
        render(
            <I18nProvider>
                <Feedback />
            </I18nProvider>
        );
        expect(screen.getByRole('button', { name: /feedback/i })).toBeInTheDocument();
    });

    test('opens capture mode when feedback button is clicked', () => {
        render(
            <I18nProvider>
                <Feedback />
            </I18nProvider>
        );
        fireEvent.click(screen.getByRole('button', { name: /feedback/i }));
        expect(screen.getByText(/select rectangle to provide feedback/i)).toBeInTheDocument();
    });

    test('submits feedback', async () => {
        render(
            <I18nProvider>
                <Feedback />
            </I18nProvider>
        );

        fireEvent.click(screen.getByText('Feedback'));

        // Simulate screen capture and selection
        const captureOverlay = screen.getByText('Select rectangle to provide feedback');
        fireEvent.mouseDown(captureOverlay, { clientX: 10, clientY: 10 });
        fireEvent.mouseUp(captureOverlay, { clientX: 110, clientY: 110 });

        fireEvent.click(screen.getByText('Accept'));

        // Wait for modal to open
        await screen.findByRole('heading', { name: 'Submit Feedback' });

        // Fill and submit form
        fireEvent.change(screen.getByPlaceholderText('Submit your suggestion...'), {
          target: { value: 'This is a test feedback' },
        });
        fireEvent.click(screen.getByRole('button', { name: 'Submit Feedback' }));

        // Check for success message
        await screen.findByText('Feedback submitted successfully!');

        // Check if fetch was called
        expect(fetch).toHaveBeenCalledTimes(1);
      });
});
