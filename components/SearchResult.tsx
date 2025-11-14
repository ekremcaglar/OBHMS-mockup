import React from 'react';
import { marked } from 'marked';
import * as sanitizeHtml from 'sanitize-html';
import { MOCK_FLEET_DATA } from '../constants';
import StatusIndicator from './StatusIndicator';
import Icon from './Icon';
import { useI18n } from '../context/I18nContext';

interface SearchResultProps {
    query: string;
    result: string;
    onAircraftSelect: (id: string) => void;
    onBack: () => void;
}

const SearchResult: React.FC<SearchResultProps> = ({ query, result, onAircraftSelect, onBack }) => {
    const { t } = useI18n();

    const mentionedAircraft = MOCK_FLEET_DATA.aircraft.filter(ac => 
        new RegExp(`\\b${ac.tailNumber}\\b`, 'i').test(result)
    );
    
    const getHTML = () => {
        if (!result) return { __html: '' };
        const rawHtml = marked.parse(result) as string;
        const sanitizedHtml = sanitizeHtml(rawHtml);
        return { __html: sanitizedHtml };
    }

    return (
        <div className="max-w-4xl mx-auto">
            <button onClick={onBack} className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white mb-6 transition-colors">
                <Icon name="ArrowLeft" className="w-4 h-4" />
                <span>{t('back_to_home')}</span>
            </button>
            <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-xl shadow-lg backdrop-blur-sm">
                <div className="p-8">
                    <p className="text-sm font-semibold text-sky-600 dark:text-sky-400">{t('ai_analysis_of')}:</p>
                    <h1 className="mt-1 text-3xl font-bold text-gray-900 dark:text-white">"{query}"</h1>
                </div>

                <div className="prose prose-blue dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 px-8 pb-8" dangerouslySetInnerHTML={getHTML()} />

                {mentionedAircraft.length > 0 && (
                    <div className="border-t border-gray-200 dark:border-gray-700/50 px-8 py-6 bg-gray-50 dark:bg-gray-900/50 rounded-b-xl">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('related_aircraft')}</h3>
                        <div className="space-y-3">
                            {mentionedAircraft.map(ac => (
                                <div
                                    key={ac.id}
                                    onClick={() => onAircraftSelect(ac.id)}
                                    className="grid grid-cols-12 items-center bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700/80 cursor-pointer transition-colors"
                                >
                                    <div className="flex items-center space-x-3 col-span-4">
                                        <StatusIndicator status={ac.status} />
                                        <span className="font-medium text-gray-900 dark:text-white">{ac.tailNumber}</span>
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400 col-span-4">
                                        {ac.squadron}
                                    </div>
                                    <div className="text-sm font-semibold text-right col-span-4">
                                        <span className={`capitalize ${
                                            ac.status === 'critical' ? 'text-red-500' :
                                            ac.status === 'warning' ? 'text-yellow-500' :
                                            'text-green-500'
                                        }`}>
                                            {ac.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchResult;