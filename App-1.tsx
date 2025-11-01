

import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import FleetOverview from './components/FleetOverview';
import AircraftDetailView from './components/AircraftDetailView';
import { MOCK_FLEET_DATA, INITIAL_DASHBOARDS, INITIAL_CHARTS } from './constants';
import LeftNav from './components/LeftNav';
import DashboardView from './components/DashboardView';
// FIX: Import UserRole to use for state.
// Fix: Add AnalysisSubPage to the import list.
// FIX: Import HealthSubPage from types.ts to avoid local type re-definition.
import { Aircraft, Dashboard, ChartConfig, UserRole, AnalysisSubPage, HealthSubPage } from './types';
import HomePage from './components/HomePage';
import ChartBuilderView from './components/ChartBuilderView';
import AdministrationView from './components/AdministrationView';
import Health from './components/Health';

const App: React.FC = () => {
  const [activeApp, setActiveApp] = useState('home'); // home, fleet-status, dashboards, chart-builder, admin
  const [selectedAircraftId, setSelectedAircraftId] = useState<string | null>(null);
  // FIX: Add userRole state to pass to Header component.
  // FIX: Replaced invalid 'Commander' role with a valid UserRole.
  const [userRole, setUserRole] = useState<UserRole>('System Engineering Lead');
  // FIX: Add state for health sub-page to pass to Header and Health components.
  const [healthSubPage, setHealthSubPage] = useState<HealthSubPage>('Structural');
  // Fix: Add state for analysis sub-page to pass to Header component.
  const [analysisSubPage, setAnalysisSubPage] = useState<AnalysisSubPage>('Time-Series Analysis');
  
  // Dashboard state
  const [dashboards, setDashboards] = useState<Dashboard[]>(INITIAL_DASHBOARDS);
  const [activeDashboardId, setActiveDashboardId] = useState<string>(INITIAL_DASHBOARDS[0].id);

  // Chart Builder state
  const [charts, setCharts] = useState<ChartConfig[]>(INITIAL_CHARTS);
  const [activeChartId, setActiveChartId] = useState<string | null>(INITIAL_CHARTS.length > 0 ? INITIAL_CHARTS[0].id : null);


  const selectedAircraft = useMemo(() => {
    if (!selectedAircraftId) return null;
    return MOCK_FLEET_DATA.aircraft.find(ac => ac.id === selectedAircraftId) || null;
  }, [selectedAircraftId]);

  const activeDashboard = useMemo(() => {
    return dashboards.find(db => db.id === activeDashboardId) || null;
  }, [activeDashboardId, dashboards]);

  const activeChart = useMemo(() => {
    return charts.find(c => c.id === activeChartId) || null;
  }, [activeChartId, charts]);


  const handleAircraftSelect = (id: string) => {
    setSelectedAircraftId(id);
    setActiveApp('fleet-status');
  };
  
  const handleBackToOverview = () => {
    setSelectedAircraftId(null);
  };

  const handleCreateDashboard = () => {
    const newId = `db-${Date.now()}`;
    const newDashboard: Dashboard = { id: newId, name: `New Dashboard ${dashboards.length + 1}`, tiles: [] };
    setDashboards([...dashboards, newDashboard]);
    setActiveDashboardId(newId);
  }

  const handleDeleteDashboard = (id: string) => {
    const newDashboards = dashboards.filter(db => db.id !== id);
    setDashboards(newDashboards);
    if(activeDashboardId === id) {
        setActiveDashboardId(newDashboards.length > 0 ? newDashboards[0].id : '');
    }
  }
  
  const handleEditDashboard = (id: string, newName: string) => {
    setDashboards(dashboards.map(db => db.id === id ? { ...db, name: newName } : db));
  }

  const handleCreateChart = () => {
    const newId = `chart-${Date.now()}`;
    const newChart: ChartConfig = { 
        id: newId, 
        name: `New Chart ${charts.length + 1}`,
        dataSourceId: null,
        chartType: 'bar',
        xAxisField: null,
        // FIX: The property 'yAxisField' does not exist on type 'ChartConfig'. Corrected to 'yAxisFields' and initialized as an empty array to match the type definition.
        yAxisFields: []
    };
    setCharts([...charts, newChart]);
    setActiveChartId(newId);
  }

  const handleDeleteChart = (id: string) => {
    const newCharts = charts.filter(c => c.id !== id);
    setCharts(newCharts);
    if(activeChartId === id) {
        setActiveChartId(newCharts.length > 0 ? newCharts[0].id : null);
    }
  }

  const handleEditChartName = (id: string, newName: string) => {
    setCharts(charts.map(c => c.id === id ? { ...c, name: newName } : c));
  }

  const handleSaveChart = (config: ChartConfig) => {
    setCharts(charts.map(c => c.id === config.id ? config : c));
  }
  
  const renderMainContent = () => {
      if (selectedAircraft && activeApp === 'fleet-status') {
          return <AircraftDetailView aircraft={selectedAircraft} onBack={handleBackToOverview} />;
      }
      switch (activeApp) {
          case 'home':
              return <HomePage setActiveApp={setActiveApp} />;
          case 'fleet-status':
              return <FleetOverview onAircraftSelect={handleAircraftSelect} />;
          default:
              return null; // Should not happen with the layout structure
      }
  }

  const renderContent = () => {
    switch (activeApp) {
      case 'home':
      case 'fleet-status':
        return (
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
            {renderMainContent()}
          </main>
        );
      case 'dashboards':
        if (!activeDashboard) {
            return <div className="text-center text-gray-400 mt-20">Please select or create a dashboard.</div>;
        }
        return (
            <div className="flex flex-1 overflow-hidden">
                <LeftNav 
                    dashboards={dashboards} 
                    activeDashboardId={activeDashboardId} 
                    onSelect={setActiveDashboardId}
                    onCreate={handleCreateDashboard}
                    onDelete={handleDeleteDashboard}
                    onEdit={handleEditDashboard}
                />
                <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
                    <DashboardView dashboard={activeDashboard} onAircraftSelect={handleAircraftSelect} />
                </main>
            </div>
        );
      case 'chart-builder':
          return <ChartBuilderView
            charts={charts}
            activeChart={activeChart}
            onSelectChart={setActiveChartId}
            onCreateChart={handleCreateChart}
            onDeleteChart={handleDeleteChart}
            onEditChartName={handleEditChartName}
            onSaveChart={handleSaveChart}
          />
      case 'admin':
          return (
            <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
                <AdministrationView />
            </main>
          );
      // FIX: Add 'health' case to render the Health component when navigated from the header.
      case 'health':
        return (
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
            {/* FIX: Changed prop 'initialTab' to 'subPage' to match HealthProps interface. */}
            <Health onAircraftSelect={handleAircraftSelect} subPage={healthSubPage} />
          </main>
        );
      default:
        return <div className="p-8">Unknown App</div>;
    }
  };

  return (
    <div className="h-screen w-screen bg-gray-900 text-gray-200 flex flex-col font-sans overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.tusas.com/images/layout/kaan_bg.jpg')] bg-cover bg-center opacity-10 z-0"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-gray-900 via-gray-900/80 to-gray-900 z-10"></div>
      
      <div className="relative z-20 flex flex-col flex-1 h-full overflow-hidden">
        {/* FIX: Pass correct props to Header to match its definition. */}
        <Header 
            currentPage={activeApp}
            setCurrentPage={setActiveApp}
            setSelectedAircraftId={setSelectedAircraftId}
            userRole={userRole}
            setUserRole={setUserRole}
            setHealthSubPage={setHealthSubPage}
            setAnalysisSubPage={setAnalysisSubPage}
        />
        <div className="flex-1 flex overflow-hidden">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default App;
