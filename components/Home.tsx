import React, { useState } from 'react';
import { ANNOUNCEMENTS_DATA, NEWS_DATA, SHORTCUTS_DATA, MOCK_FLEET_DATA } from '../constants';
import Icon from './Icon';
import AnnouncementCard from './home/AnnouncementCard';
import NewsCard from './home/NewsCard';
import ShortcutCard from './home/ShortcutCard';
import MetricCard from './MetricCard';
import WatchlistAircraft from './home/WatchlistAircraft';
import { useI18n } from '../context/I18nContext';
import { Shortcut } from '../types';

interface HomeProps {
    setCurrentPage: (page: string) => void;
    onSearchSubmit: (query: string) => void;
    onAircraftSelect: (id: string) => void;
}

const Home: React.FC<HomeProps> = ({ setCurrentPage, onSearchSubmit, onAircraftSelect }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const { t } = useI18n();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        onSearchSubmit(searchQuery);
    };
    
    const getShortcutTitle = (shortcut: Shortcut) => {
        const key = shortcut.title.toLowerCase().replace(/\s+/g, '_') as keyof ReturnType<typeof useI18n>['t'];
        return t(key) || shortcut.title;
    }
    
    const keyMetrics = [
      MOCK_FLEET_DATA.missionCapableRate,
      MOCK_FLEET_DATA.fleetAvailability,
      MOCK_FLEET_DATA.nffRate,
      MOCK_FLEET_DATA.aogEvents,
      MOCK_FLEET_DATA.rulExpirationForecast,
    ];

    return (
        <div className="space-y-12">
            {/* Header section */}
            <div className="text-center">
                <img src="/assets/logo.svg" alt="TUSAŞ Logo" className="mx-auto h-16 mb-6 dark:invert" />
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl mb-4">{t('obhms_title')}</h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{t('obhms_subtitle')}</p>
                <form onSubmit={handleSearch} className="mt-8 max-w-2xl mx-auto flex rounded-full shadow-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800/50 focus-within:ring-2 focus-within:ring-sky-500 transition-all">
                    <div className="relative flex-grow">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-6">
                            <Icon name="Search" className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="block w-full rounded-full border-0 bg-transparent py-4 pl-14 pr-6 text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder={t('search_placeholder')}
                        />
                    </div>
                    <button
                        type="submit"
                        className="m-1.5 ml-0 inline-flex items-center gap-x-2 rounded-full px-6 py-2.5 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-500 focus:z-10 transition-colors"
                    >
                        {t('search')}
                    </button>
                </form>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {keyMetrics.map(metric => <MetricCard key={metric.id} metric={metric} />)}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <h2 className="text-2xl font-bold text-white mb-4">{t('aircraft_watchlist')}</h2>
                    <WatchlistAircraft onAircraftSelect={onAircraftSelect} />
                </div>
                
                <div className="lg:col-span-1">
                    <h2 className="text-2xl font-bold text-white mb-4">{t('intel_and_comms')}</h2>
                    <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 -mr-2">
                        {ANNOUNCEMENTS_DATA.map(ann => (
                           <AnnouncementCard key={ann.id} title={ann.title} date={ann.date}>
                               {ann.content}
                           </AnnouncementCard>
                       ))}
                       {NEWS_DATA.map(news => (
                            <NewsCard key={news.id} title={news.title} source={news.source} date={news.date}>
                                {news.content}
                            </NewsCard>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Access */}
            <div>
                 <h2 className="text-2xl font-bold text-white mb-4">{t('quick_access')}</h2>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {SHORTCUTS_DATA.map(shortcut => (
                        <ShortcutCard 
                            key={shortcut.id}
                            icon={shortcut.icon}
                            label={getShortcutTitle(shortcut)}
                            onClick={() => setCurrentPage(shortcut.targetApp)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;