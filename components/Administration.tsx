import React from 'react';
import Icon from './Icon';
import { useI18n } from '../context/I18nContext';

interface AdminCardProps {
    title: string;
    description: string;
    buttonText: string;
}

const AdminCard: React.FC<AdminCardProps> = ({ title, description, buttonText }) => (
  <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 flex flex-col shadow-lg backdrop-blur-sm">
    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-400 text-sm mb-4 flex-grow">{description}</p>
    <button className="self-start bg-slate-600 hover:bg-slate-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
      {buttonText}
    </button>
  </div>
);

const Administration: React.FC = () => {
  const { t } = useI18n();
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
          <Icon name="Settings" className="w-8 h-8" />
          {t('administration')}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AdminCard title={t('user_management')} description={t('user_management_desc')} buttonText={t('manage_users')} />
        <AdminCard title={t('api_config')} description={t('api_config_desc')} buttonText={t('configure_api')} />
        <AdminCard title={t('data_sources')} description={t('data_sources_desc')} buttonText={t('manage_sources')} />
        <AdminCard title={t('system_logs')} description={t('system_logs_desc')} buttonText={t('view_logs')} />
      </div>
    </div>
  );
};

export default Administration;