import React from 'react';
import Icon from '../Icon';

interface AnomalyDetectionAnalysisProps {
    title: string;
}

const AnomalyDetectionAnalysis: React.FC<AnomalyDetectionAnalysisProps> = ({ title }) => {
    return (
        <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-xl p-8 shadow-lg backdrop-blur-sm">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <Icon name="AlertTriangle" className="w-8 h-8" />
                {title}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">Utilizes Machine Learning (ML) to identify deviations from normal operational baselines, often signaling the onset of a fault before a hard code is generated.</p>
            <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
                 <p className="text-sm text-center text-gray-500 dark:text-gray-500">
                    Full implementation for this module is under development.
                </p>
            </div>
        </div>
    );
};

export default AnomalyDetectionAnalysis;