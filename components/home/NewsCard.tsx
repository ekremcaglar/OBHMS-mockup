import React from 'react';

interface NewsCardProps {
    title: string;
    source: string;
    date: string;
    children: React.ReactNode;
}

const NewsCard: React.FC<NewsCardProps> = ({ title, source, date, children }) => (
     <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
        <div className="flex justify-between items-start mb-2">
            <div>
                <h4 className="font-semibold text-white">{title}</h4>
                <p className="text-xs text-gray-500">{source}</p>
            </div>
            <span className="text-xs text-gray-500 flex-shrink-0 ml-4">{date}</span>
        </div>
        <p className="text-sm text-gray-400">
            {children}
        </p>
    </div>
);

export default NewsCard;