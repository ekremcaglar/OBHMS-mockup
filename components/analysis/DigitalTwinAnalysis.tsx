import React from 'react';
import Icon from '../Icon';
import { useI18n } from '../../context/I18nContext';

const DigitalTwinAnalysis: React.FC = () => {
    const { t } = useI18n();

    return (
        <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-xl p-8 shadow-lg backdrop-blur-sm">
            <p className="text-gray-600 dark:text-gray-400">
                {t('digital_twin_analysis_description')}
            </p>
            <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                            <Icon name="Database" className="w-6 h-6" />
                            {t('real_time_data_integration')}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            {t('real_time_data_integration_description')}
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                            <Icon name="Cpu" className="w-6 h-6" />
                            {t('high_fidelity_physics_models')}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            {t('high_fidelity_physics_models_description')}
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                            <Icon name="Activity" className="w-6 h-6" />
                            {t('remaining_useful_life_estimation')}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            {t('remaining_useful_life_estimation_description')}
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                            <Icon name="AlertTriangle" className="w-6 h-6" />
                            {t('failure_prediction')}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            {t('failure_prediction_description')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DigitalTwinAnalysis;