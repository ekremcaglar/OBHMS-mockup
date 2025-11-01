import React from 'react';
import { MOCK_MAINTENANCE_DATA } from '../constants';
import { Priority } from '../types';

const PriorityTag: React.FC<{ priority: Priority }> = ({ priority }) => {
    const styles = {
        High: 'bg-red-500/20 text-red-400 border-red-500/30',
        Medium: 'bg-yellow-400/20 text-yellow-300 border-yellow-400/30',
        Low: 'bg-sky-500/20 text-sky-400 border-sky-500/30',
    };
    return <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${styles[priority]}`}>{priority}</span>;
};

const MaintenanceWatchlist: React.FC = () => {
    return (
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4 shadow-lg backdrop-blur-sm">
            <h2 className="text-xl font-bold text-white mb-4">Maintenance Watchlist</h2>
            <div className="space-y-3">
                <div className="grid grid-cols-12 items-center px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    <div className="col-span-2">Aircraft</div>
                    <div className="col-span-3">Component</div>
                    <div className="col-span-4">Description</div>
                    <div className="col-span-1 text-center">Priority</div>
                    <div className="col-span-2 text-right">Due</div>
                </div>
                {MOCK_MAINTENANCE_DATA.map((item) => (
                    <div key={item.id} className="grid grid-cols-12 items-center bg-gray-800 p-4 rounded-lg">
                        <div className="col-span-2 font-medium text-white">{item.aircraft}</div>
                        <div className="col-span-3 text-sm text-gray-300">{item.component}</div>
                        <div className="col-span-4 text-sm text-gray-400">{item.description}</div>
                        <div className="col-span-1 flex justify-center">
                            <PriorityTag priority={item.priority} />
                        </div>
                        <div className="col-span-2 text-right font-semibold text-white">{item.dueDate}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MaintenanceWatchlist;