import React, { useState, useMemo, useCallback } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import AircraftDetailView from './components/AircraftDetailView';
import ChartBuilder from './components/ChartBuilder';
import Dashboards from './components/Dashboards';
import Health from './components/Health';
import Administration from './components/Administration';
import Reports from './components/Reports';
import SearchResult from './components/SearchResult';
import TCP from './components/TCP';
import Analysis from './components/Analysis';
import All from './components/All';
import PlaceholderAnalysisPage from './components/analysis/PlaceholderAnalysisPage';
import HelpPage from './components/HelpPage';
import UserRolesPage from './components/UserRolesPage';
import { MOCK_FLEET_DATA, INITIAL_DASHBOARDS, ADMIN_ROLES, ALL_SECTION_KEYS, SECTION_I18N_KEYS } from './constants';
import { UserRole, Dashboard, HealthSubPage, AnalysisSubPage } from './types';
import { generateSearchResponse } from './services/geminiService';
import { useI18n } from './context/I18nContext';

interface SearchState {
    query: string;
    result: string;
    isLoading: boolean;
}

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('Home');
  const [selectedAircraftId, setSelectedAircraftId] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<UserRole>('System Engineering Lead');
  const [searchState, setSearchState] = useState<SearchState>({ query: '', result: '', isLoading: false });
  
  const [dashboards, setDashboards] = useState<Dashboard[]>(INITIAL_DASHBOARDS);
  const [activeDashboardId, setActiveDashboardId] = useState<string>(INITIAL_DASHBOARDS[0].id);
  const [healthSubPage, setHealthSubPage] = useState<HealthSubPage>('Structural');
  const [analysisSubPage, setAnalysisSubPage] = useState<AnalysisSubPage>('Time-Series Analysis');
  const { t } = useI18n();

  const handleAircraftSelect = useCallback((id: string) => {
    setSelectedAircraftId(id);
  }, []);

  const handleBackFromDetail = useCallback(() => {
      setSelectedAircraftId(null);
  }, []);

  const handleSearchSubmit = useCallback(async (query: string) => {
    if (!query.trim()) return;

    setSearchState({ query, result: '', isLoading: true });
    setCurrentPage('SearchResult');

    try {
        const result = await generateSearchResponse(query, MOCK_FLEET_DATA);
        setSearchState({ query, result, isLoading: false });
    } catch (error) {
        setSearchState({ query, result: 'An error occurred while fetching the response.', isLoading: false });
    }
  }, []);

  const selectedAircraft = useMemo(() => {
    if (!selectedAircraftId) return null;
    return MOCK_FLEET_DATA.aircraft.find(ac => ac.id === selectedAircraftId) || null;
  }, [selectedAircraftId]);

  const renderContent = () => {
    if (selectedAircraft) {
      return (
        <AircraftDetailView 
            aircraft={selectedAircraft} 
            onBack={handleBackFromDetail}
        />
      );
    }

    if (ALL_SECTION_KEYS.includes(currentPage)) {
      const i18nKeys = SECTION_I18N_KEYS.get(currentPage);
      const isExistingPage = ['Analysis', 'Health Monitoring', 'Dashboards', 'Chart Builder', 'Reports', 'TCP'].includes(currentPage);
      if (i18nKeys && !isExistingPage) {
        return <PlaceholderAnalysisPage title={t(i18nKeys.titleKey as any)} description={t(i18nKeys.descriptionKey as any)} />;
      }
    }

    switch (currentPage) {
        case 'Home':
            return <Home 
                setCurrentPage={setCurrentPage} 
                onSearchSubmit={handleSearchSubmit} 
                onAircraftSelect={handleAircraftSelect}
            />;
        case 'Dashboards':
            return <Dashboards 
                dashboards={dashboards}
                setDashboards={setDashboards}
                activeDashboardId={activeDashboardId}
                setActiveDashboardId={setActiveDashboardId}
                onAircraftSelect={handleAircraftSelect} 
            />;
        case 'Health':
            return <Health onAircraftSelect={handleAircraftSelect} subPage={healthSubPage} />;
        case 'Reports':
            return <Reports />;
        case 'Chart Builder':
            return <ChartBuilder />;
        case 'Analysis':
            return <Analysis subPage={analysisSubPage} />;
        case 'TCP':
            return <TCP />;
        case 'All':
            return <All setCurrentPage={setCurrentPage} />;
        case 'Help':
            return <HelpPage />;
        case 'UserRoles':
            return <UserRolesPage />;
        case 'SearchResult':
             return searchState.isLoading 
                ? <div className="text-center text-gray-400 mt-20">{t('analyzing_data')}...</div>
                : <SearchResult 
                    query={searchState.query} 
                    result={searchState.result} 
                    onAircraftSelect={handleAircraftSelect}
                    onBack={() => setCurrentPage('Home')}
                />;
        case 'Administration':
             if (!ADMIN_ROLES.includes(userRole)) {
                return (
                    <div className="text-center mt-20">
                        <h2 className="text-2xl font-bold text-red-400">{t('access_denied')}</h2>
                        <p className="text-gray-400 mt-2">{t('access_denied_desc')}</p>
                    </div>
                );
            }
            return <Administration />;
        default:
            return <Home setCurrentPage={setCurrentPage} onSearchSubmit={handleSearchSubmit} onAircraftSelect={handleAircraftSelect} />;
    }
  };


  return (
    <div className="min-h-screen bg-[#101827] font-sans">
        <Header 
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            setSelectedAircraftId={setSelectedAircraftId}
            userRole={userRole}
            setUserRole={setUserRole}
            setHealthSubPage={setHealthSubPage}
            setAnalysisSubPage={setAnalysisSubPage}
        />
        <main className="container mx-auto p-4 sm:p-6 lg:p-8">
            {renderContent()}
        </main>
    </div>
  );
};

export default App;