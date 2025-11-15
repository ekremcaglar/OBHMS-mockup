import React from 'react';
import Tree from 'react-d3-tree';
import Icon from '../Icon';
import { MOCK_FAULT_TREE_DATA } from '../../constants';

interface RootCauseAnalysisProps {
    title: string;
    description: string;
}

const RootCauseAnalysis: React.FC<RootCauseAnalysisProps> = ({ title, description }) => {
    return (
        <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-xl p-8 shadow-lg backdrop-blur-sm">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <Icon name="Search" className="w-8 h-8" />
                {title}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">{description}</p>
            <div id="treeWrapper" style={{ width: '100%', height: '500px' }}>
                <Tree data={MOCK_FAULT_TREE_DATA} orientation="vertical" />
            </div>
        </div>
    );
};

export default RootCauseAnalysis;