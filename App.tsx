
import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import FleetOverview from './components/FleetOverview';
import AircraftDetailView from './components/AircraftDetailView';
import ChartBuilder from './components/ChartBuilder';
import { MOCK_FLEET_DATA } from './constants';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('Home');
  const [selectedAircraftId, setSelectedAircraftId] = useState<string | null>(null);

  const selectedAircraft = useMemo(() => {
    if (!selectedAircraftId) return null;
    return MOCK_FLEET_DATA.aircraft.find(ac => ac.id === selectedAircraftId) || null;
  }, [selectedAircraftId]);

  const renderContent = () => {
    if (selectedAircraft) {
      return (
        <AircraftDetailView 
            aircraft={selectedAircraft} 
            onBack={() => setSelectedAircraftId(null)}
        />
      );
    }

    switch (currentPage) {
        case 'Home':
            return <Home setCurrentPage={setCurrentPage} />;
        case 'Fleet Status':
            return <FleetOverview onAircraftSelect={setSelectedAircraftId} />;
        case 'Chart Builder':
            return <ChartBuilder />;
        // Add cases for other pages here
        case 'Dashboards':
        case 'Administration':
        default:
            return <Home setCurrentPage={setCurrentPage} />; // Default to Home for now
    }
  };


  return (
    <div className="min-h-screen bg-[#101827] font-sans">
        <Header 
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            setSelectedAircraftId={setSelectedAircraftId}
        />
        <main className="container mx-auto p-4 sm:p-6 lg:p-8">
            {renderContent()}
        </main>
    </div>
  );
};

export default App;
