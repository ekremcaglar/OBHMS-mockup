import React, { useState } from 'react';
import { PILLARS_DATA } from '../constants';
import { useI18n } from '../context/I18nContext';
import Icon from './Icon';

interface AllProps {
    setCurrentPage: (page: string) => void;
}

const SectionCard: React.FC<{ title: string; description: string; onClick: () => void; }> = ({ title, description, onClick }) => (
    <button
        onClick={onClick}
        className="w-full text-left bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:border-sky-500 dark:hover:border-sky-400 transition-all duration-200 shadow-sm"
    >
        <h4 className="font-semibold text-gray-800 dark:text-white">{title}</h4>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{description}</p>
    </button>
);

const PillarSection: React.FC<{ title: string; children: React.ReactNode; }> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <section>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center text-left py-4 border-b-2 border-gray-200 dark:border-gray-700"
            >
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{title}</h3>
                <Icon name="ChevronDown" className={`w-6 h-6 text-gray-500 dark:text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-6 animate-fade-in">
                    {children}
                </div>
            )}
        </section>
    );
};

const All: React.FC<AllProps> = ({ setCurrentPage }) => {
    const { t } = useI18n();
    
    const sectionKeyToPageName: { [key: string]: string } = {
      'Analysis': 'Analysis',
      'Health Monitoring': 'Health',
      'Dashboards': 'Dashboards',
      'Chart Builder': 'Chart Builder',
      'Reports': 'Reports',
      'TCP': 'TCP',
    };

    const handleCardClick = (sectionKey: string) => {
        const pageName = sectionKeyToPageName[sectionKey] || sectionKey;
        setCurrentPage(pageName);
    };

    return (
        <div className="space-y-8">
             <h1 className="text-4xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <Icon name="LayoutGrid" className="w-10 h-10" />
                {t('all')} OBHMS Features
            </h1>

            {PILLARS_DATA.map(pillar => (
                <PillarSection key={pillar.titleKey} title={t(pillar.titleKey as any)}>
                    {pillar.sections.map(section => (
                        <SectionCard
                            key={section.key}
                            title={t(section.titleKey as any)}
                            description={t(section.descriptionKey as any)}
                            onClick={() => handleCardClick(section.key)}
                        />
                    ))}
                </PillarSection>
            ))}
        </div>
    );
};

export default All;