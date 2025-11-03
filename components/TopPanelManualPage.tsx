import React from 'react';
import { useI18n } from '../context/I18nContext';
import Icon from './Icon';

const Feature: React.FC<{ title: string; description: string; children?: React.ReactNode }> = ({ title, description, children }) => (
     <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 p-6 rounded-xl shadow-lg backdrop-blur-sm">
        <h4 className="font-semibold text-xl text-gray-800 dark:text-white">{title}</h4>
        <p className="text-gray-600 dark:text-gray-400 mt-2">{description}</p>
        {children && <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">{children}</div>}
    </div>
);

const SubFeature: React.FC<{ text: string }> = ({ text }) => (
    <p className="text-sm text-gray-500 dark:text-gray-400 pl-4 border-l-2 border-sky-500/50 my-2">{text}</p>
);

const TopPanelManualPage: React.FC = () => {
    const { t } = useI18n();

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                <Icon name="PanelTop" className="w-10 h-10" />
                {t('manual_top_panel_title')}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-12">
                {t('manual_top_panel_subtitle')}
            </p>

            <div className="space-y-6">
                <Feature title={t('manual_section_logo')} description={t('manual_logo_desc')} />
                <Feature title={t('manual_section_main_nav')} description={t('manual_main_nav_desc')} />
                <Feature title={t('manual_section_user_controls')} description={t('manual_user_controls_desc')}>
                    <div className="space-y-2">
                        <SubFeature text={t('manual_user_control_theme')} />
                        <SubFeature text={t('manual_user_control_role')} />
                        <SubFeature text={t('manual_user_control_language')} />
                    </div>
                </Feature>
                <Feature title={t('manual_section_user_actions')} description={t('manual_user_actions_desc')}>
                     <div className="space-y-2">
                        <SubFeature text={t('manual_user_action_notifications')} />
                        <SubFeature text={t('manual_user_action_profile')} />
                    </div>
                </Feature>
            </div>
        </div>
    );
};

export default TopPanelManualPage;