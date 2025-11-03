import React from 'react';
import { useI18n } from '../context/I18nContext';
import Icon from './Icon';

const Feature: React.FC<{ title: string; description: string }> = ({ title, description }) => (
     <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 p-6 rounded-xl shadow-lg backdrop-blur-sm">
        <h4 className="font-semibold text-xl text-gray-800 dark:text-white">{title}</h4>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{description}</p>
    </div>
);

const HomePageManualPage: React.FC = () => {
    const { t } = useI18n();

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                <Icon name="NotebookText" className="w-10 h-10" />
                {t('manual_home_title')}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-12">
                {t('manual_home_subtitle')}
            </p>

            <div className="space-y-6">
                <Feature title={t('manual_section_search')} description={t('manual_search_desc')} />
                <Feature title={t('manual_section_key_metrics')} description={t('manual_key_metrics_desc')} />
                <Feature title={t('manual_section_watchlist')} description={t('manual_watchlist_desc')} />
                <Feature title={t('manual_section_intel')} description={t('manual_intel_desc')} />
                <Feature title={t('manual_section_quick_access')} description={t('manual_quick_access_desc')} />
            </div>
        </div>
    );
};

export default HomePageManualPage;