import React, { useState, useCallback } from 'react';
import { generateFleetHealthSummary } from '../../services/geminiService';
import { MOCK_FLEET_DATA } from '../../constants';
import Icon from '../Icon';
import { useI18n } from '../../context/I18nContext';

const AiSummary: React.FC = () => {
  const [summary, setSummary] = useState<string>('');
  const [isLoadingSummary, setIsLoadingSummary] = useState<boolean>(false);
  const { t } = useI18n();

  const handleGenerateSummary = useCallback(() => {
    setIsLoadingSummary(true);
    generateFleetHealthSummary(MOCK_FLEET_DATA)
      .then(setSummary)
      .finally(() => setIsLoadingSummary(false));
  }, []);

  return (
    <>
      {summary ? (
        <div className="text-sm text-gray-300 space-y-2 prose prose-invert prose-sm" dangerouslySetInnerHTML={{ __html: summary.replace(/\n/g, '<br/>') }}/>
      ) : (
        <div className="flex-grow flex items-center justify-center h-full">
          <button
            onClick={handleGenerateSummary}
            disabled={isLoadingSummary}
            className="flex items-center space-x-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors disabled:bg-gray-600"
          >
            {isLoadingSummary ? (
              <Icon name="LoaderCircle" className="w-5 h-5 animate-spin" />
            ) : (
              <Icon name="Sparkles" className="w-5 h-5" />
            )}
            <span>{isLoadingSummary ? t('generating') : t('generate_summary')}</span>
          </button>
        </div>
      )}
    </>
  );
};

export default AiSummary;