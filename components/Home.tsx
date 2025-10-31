import React from 'react';
import Icon from './Icon';

const ShortcutCard = ({ icon, label }: { icon: string, label: string }) => (
    <div className="bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 rounded-xl p-6 flex flex-col items-center justify-center space-y-3 transition-colors cursor-pointer">
        <Icon name={icon} className="w-8 h-8 text-sky-400" />
        <span className="text-white font-medium">{label}</span>
    </div>
);

// Fix: Define prop types with an interface to resolve 'children' property missing error.
interface AnnouncementCardProps {
    title: string;
    date: string;
    children: React.ReactNode;
}

const AnnouncementCard = ({ title, date, children }: AnnouncementCardProps) => (
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

// Fix: Define prop types with an interface to resolve 'children' property missing error.
interface NewsCardProps {
    title: string;
    source: string;
    date: string;
    children: React.ReactNode;
}

const NewsCard = ({ title, source, date, children }: NewsCardProps) => (
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


const Home: React.FC = () => {
    return (
        <div className="space-y-12">
            <section className="text-center pt-8">
                <h1 className="text-4xl md:text-5xl font-bold text-white">Welcome, Commander</h1>
                <p className="mt-2 text-lg text-gray-400">Your central hub for predictive, actionable intelligence.</p>
                <div className="mt-8 max-w-2xl mx-auto">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Icon name="Search" className="w-5 h-5 text-gray-500" />
                        </div>
                        <input
                            type="search"
                            placeholder="Search for aircraft tail number, fault codes, or components..."
                            className="w-full bg-slate-800/80 border border-slate-700 rounded-full py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                    </div>
                </div>
            </section>

            <section>
                <h2 className="text-xl font-semibold text-white mb-4">Shortcuts</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <ShortcutCard icon="Plane" label="Fleet Status" />
                    <ShortcutCard icon="LayoutGrid" label="Dashboards" />
                    <ShortcutCard icon="BarChart3" label="Chart Builder" />
                    <ShortcutCard icon="Settings" label="Administration" />
                </div>
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10">
                <div>
                    <h2 className="text-xl font-semibold text-white mb-4">Announcements</h2>
                    <div className="space-y-4">
                        <AnnouncementCard title="OBHMS v2.1 Deployed" date="2023-10-26">
                            Version 2.1 is now live, featuring the new Chart Builder module and enhanced AI summary capabilities.
                        </AnnouncementCard>
                        <AnnouncementCard title="Scheduled Maintenance" date="2023-10-24">
                            The system will be offline for scheduled maintenance on Sunday from 0200 to 0400 Zulu.
                        </AnnouncementCard>
                    </div>
                </div>
                 <div>
                    <h2 className="text-xl font-semibold text-white mb-4">Fleet & Industry News</h2>
                    <div className="space-y-4">
                       <NewsCard title="New Predictive Maintenance Algorithm Rolled Out for Propulsion Systems" source="Engineering Command" date="2023-10-25">
                            A new ML model is improving RUL accuracy for turbine blades by 15%.
                        </NewsCard>
                         <NewsCard title="Global Supply Chain Delays Affecting Landing Gear Components" source="Logistics Weekly" date="2023-10-22">
                            Expect extended lead times for specific hydraulic actuators. Plan maintenance accordingly.
                        </NewsCard>
                    </div>
                </div>
            </section>
            
            <div className="fixed bottom-6 right-6">
                <button className="bg-sky-500 hover:bg-sky-600 text-white rounded-full p-4 shadow-lg transition-colors">
                    <Icon name="MessageSquare" className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
};

export default Home;
