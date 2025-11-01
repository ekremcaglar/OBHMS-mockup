import React from 'react';

interface AnnouncementCardProps {
    title: string;
    date: string;
    children: React.ReactNode;
}

const AnnouncementCard: React.FC<AnnouncementCardProps> = ({ title, date, children }) => (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
        <div className="flex justify-between items-baseline mb-1">
            <h4 className="font-semibold text-sky-400">{title}</h4>
            <span className="text-xs text-gray-500">{date}</span>
        </div>
        <p className="text-sm text-gray-400">
            {children}
        </p>
    </div>
);

export default AnnouncementCard;