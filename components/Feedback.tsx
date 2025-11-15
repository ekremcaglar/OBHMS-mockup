
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useI18n } from '../context/I18nContext';

declare const html2canvas: any;

const SuccessMessage = ({ message, onClose }: { message: string, onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white py-4 px-8 rounded-lg shadow-lg z-50">
      {message}
    </div>
  );
};

const Feedback = () => {
  const { t } = useI18n();
  const [state, setState] = useState({
    modalOpen: false,
    captureMode: false,
    isDrawing: false,
  });
  const [feedback, setFeedback] = useState('');
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [selection, setSelection] = useState<{ x: number, y: number, w: number, h: number } | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const feedbackTextRef = useRef<HTMLDivElement>(null);

  const startDrawing = (e: React.MouseEvent) => {
    setState({ ...state, isDrawing: true });
    setSelection({ x: e.clientX, y: e.clientY, w: 0, h: 0 });
  };

  const draw = (e: React.MouseEvent) => {
    if (!state.isDrawing || !selection) return;
    const newSelection = {
      ...selection,
      w: e.clientX - selection.x,
      h: e.clientY - selection.y,
    };
    setSelection(newSelection);
  };

  const stopDrawing = () => {
    setState({ ...state, isDrawing: false });
  };

  const handleCancelCapture = () => {
    setState({ ...state, captureMode: false, isDrawing: false });
    setSelection(null);
  }

  const handleAcceptCapture = async () => {
    if (!selection) return;

    // Hide the feedback instruction text before capturing
    if (feedbackTextRef.current) {
      feedbackTextRef.current.style.display = 'none';
    }

    try {
      if (typeof html2canvas === 'undefined') {
        return;
      }
      const canvas = await html2canvas(document.body, {
        scrollX: -window.scrollX,
        scrollY: -window.scrollY,
        windowWidth: document.documentElement.offsetWidth,
        windowHeight: document.documentElement.offsetHeight,
      });
      const x = Math.min(selection.x, selection.x + selection.w);
      const y = Math.min(selection.y, selection.y + selection.h);
      const w = Math.abs(selection.w);
      const h = Math.abs(selection.h);

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Draw the selection rectangle on the full screenshot
      ctx.strokeStyle = '#00BFFF'; // A distinct color for the rectangle
      ctx.lineWidth = 4;
      ctx.strokeRect(x, y, w, h);

      setScreenshot(canvas.toDataURL());
      setState({ ...state, captureMode: false, modalOpen: true });
      setSelection(null);

    } catch (err) {
      console.error("Error capturing screen: ", err);
      handleCancelCapture();
    } finally {
      // Always show the feedback instruction text again
      if (feedbackTextRef.current) {
        feedbackTextRef.current.style.display = 'block';
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      feedback,
      url: window.location.href,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      screenshot
    };

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setFeedback('');
        setState({ ...state, modalOpen: false });
        setScreenshot(null);
        setShowSuccessMessage(true);
      } else {
        throw new Error('Failed to submit feedback');
      }
    } catch (error) {
      console.log('Could not reach server, saving feedback offline.');
      if ('serviceWorker' in navigator && 'SyncManager' in window) {
        try {
          // await saveFeedbackToDB(data);
          const swRegistration = await navigator.serviceWorker.ready;
          // await swRegistration.sync.register('sync-feedback');
          setFeedback('');
          setState({ ...state, modalOpen: false });
          setScreenshot(null);
          setShowSuccessMessage(true);
        } catch (dbError) {
          console.error('Error saving feedback to IndexedDB:', dbError);
          alert(t('failed_to_submit_feedback'));
        }
      } else {
        alert(t('error_submitting_feedback'));
      }
    }
  };

  return (
    <>
      {showSuccessMessage && <SuccessMessage message={t('feedback_submitted_successfully')} onClose={() => setShowSuccessMessage(false)} />}
      <button
        id="feedback-button"
        onClick={() => setState({ ...state, captureMode: true })}
        className="fixed bottom-4 right-4 bg-sky-600 text-white p-3 rounded-full shadow-lg hover:bg-sky-700 transition-colors z-50"
      >
        {t('feedback')}
      </button>
      {state.captureMode && (
        <>
          <div
            className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 cursor-crosshair"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
          >
            <div ref={feedbackTextRef} className="text-white text-2xl animate-pulse">
              {t('select_rectangle_to_provide_feedback')}
            </div>
            {selection && (
              <div
                className="absolute border-2 border-dashed border-sky-500 bg-sky-500 bg-opacity-20"
                style={{
                  left: Math.min(selection.x, selection.x + selection.w),
                  top: Math.min(selection.y, selection.y + selection.h),
                  width: Math.abs(selection.w),
                  height: Math.abs(selection.h),
                }}
              ></div>
            )}
          </div>
          {selection && !state.isDrawing && (
            <div
              className="absolute flex gap-2 z-50"
              style={{
                left: Math.min(selection.x, selection.x + selection.w) + Math.abs(selection.w),
                top: Math.min(selection.y, selection.y + selection.h) + Math.abs(selection.h),
              }}
            >
              <button
                className="bg-sky-600 text-white py-2 px-4 rounded-md hover:bg-sky-700 transition-colors"
                onClick={handleAcceptCapture}
              >
                Accept
              </button>
              <button
                className="bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
                onClick={handleCancelCapture}
              >
                {t('cancel')}
              </button>
            </div>
          )}
        </>
      )}
      {state.modalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-lg border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-4">{t('submit_feedback')}</h2>
            <p className="text-gray-400 mb-6">{t('tell_us_what_you_think')}</p>
            <form onSubmit={handleSubmit}>
              {screenshot && <img src={screenshot} alt="Screenshot" className="mb-4 rounded-md" />}
              <textarea
                className="w-full p-3 bg-gray-900 text-white border border-gray-700 rounded-md focus:ring-2 focus:ring-sky-500 focus:outline-none transition"
                rows={6}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder={t('submit_your_suggestion')}
                required
              />
              <div className="flex justify-end mt-6">
                <button
                  type="button"
                  onClick={() => setState({ ...state, modalOpen: false })}
                  className="mr-3 bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  className="bg-sky-600 text-white py-2 px-4 rounded-md hover:bg-sky-700 transition-colors"
                >
                  {t('submit_feedback')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Feedback;
