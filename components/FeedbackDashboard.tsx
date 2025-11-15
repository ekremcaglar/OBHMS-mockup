
import React, { useState, useEffect } from 'react';
import { useI18n } from '../context/I18nContext';

interface FeedbackData {
  feedback: string;
  url: string;
  timestamp: string;
  userAgent: string;
  screenshot?: string;
}

const FeedbackDashboard = () => {
  const { t } = useI18n();
  const [feedbacks, setFeedbacks] = useState<FeedbackData[]>([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch('/api/feedback');
        if (response.ok) {
          const data = await response.json();
          setFeedbacks(data);
        } else {
          console.error('Failed to fetch feedback');
        }
      } catch (error) {
        console.error('Error fetching feedback:', error);
      }
    };

    fetchFeedbacks();
  }, []);

  const exportFeedback = () => {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Feedback</title>
          <style>
            body { font-family: sans-serif; margin: 20px; background-color: #101827; color: white; }
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #4b5563; padding: 8px; text-align: left; }
            th { background-color: #1f2937; }
            img { max-width: 200px; max-height: 200px; }
          </style>
        </head>
        <body>
          <h1>Feedback</h1>
          <table>
            <thead>
              <tr>
                <th>Feedback</th>
                <th>Page Context</th>
                <th>Timestamp</th>
                <th>Screenshot</th>
              </tr>
            </thead>
            <tbody>
              ${feedbacks.map(item => `
                <tr>
                  <td>${item.feedback}</td>
                  <td>${item.url}</td>
                  <td>${new Date(item.timestamp).toLocaleString()}</td>
                  <td>${item.screenshot ? `<img src="${item.screenshot}" alt="Screenshot" />` : ''}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;

    const blob = new Blob([html], { type: 'text/html' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "feedback.html";
    link.click();
  };

  return (
    <div className="p-8 text-white">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">{t('feedback_dashboard')}</h1>
        <button onClick={exportFeedback} className="bg-sky-600 text-white py-2 px-4 rounded-md hover:bg-sky-700 transition-colors">
          Export
        </button>
      </div>
      <div className="bg-gray-800 p-4 rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="p-2 text-left">{t('feedback')}</th>
              <th className="p-2 text-left">{t('page_context')}</th>
              <th className="p-2 text-left">{t('timestamp')}</th>
              <th className="p-2 text-left">Screenshot</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((item, index) => (
              <tr key={index} className="border-b border-gray-700">
                <td className="p-2">{item.feedback}</td>
                <td className="p-2">{item.url}</td>
                <td className="p-2">{new Date(item.timestamp).toLocaleString()}</td>
                <td className="p-2">
                  {item.screenshot && (
                    <img src={item.screenshot} alt="Screenshot" className="w-32 h-auto rounded-md" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeedbackDashboard;
