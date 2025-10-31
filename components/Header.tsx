
import React from 'react';
import Icon from './Icon';

interface HeaderProps {
    currentPage: string;
    setCurrentPage: (page: string) => void;
    setSelectedAircraftId: (id: string | null) => void;
}

const NavLink: React.FC<{
    icon?: string;
    label: string;
    isActive: boolean;
    onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive
                    ? 'bg-slate-700 text-white'
                    : 'text-gray-400 hover:bg-slate-800 hover:text-white'
            }`}
        >
            {icon && <Icon name={icon} className="w-4 h-4" />}
            <span>{label}</span>
        </button>
    );
};


const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage, setSelectedAircraftId }) => {
    const handleNav = (page: string) => {
        setCurrentPage(page);
        setSelectedAircraftId(null);
    }
    
  return (
    <header className="bg-[#101827]/60 backdrop-blur-sm border-b border-gray-700/50 sticky top-0 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3">
                <Icon name="Hexagon" className="w-7 h-7 text-cyan-400" />
                <h1 className="text-xl font-bold text-white">KAAN OBHMS</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-2">
                <NavLink label="Home" isActive={currentPage === 'Home'} onClick={() => handleNav('Home')} />
                <NavLink label="Fleet Status" icon="Plane" isActive={currentPage === 'Fleet Status'} onClick={() => handleNav('Fleet Status')} />
                <NavLink label="Dashboards" icon="LayoutGrid" isActive={currentPage === 'Dashboards'} onClick={() => handleNav('Dashboards')} />
                <NavLink label="Chart Builder" icon="BarChart3" isActive={currentPage === 'Chart Builder'} onClick={() => handleNav('Chart Builder')} />
                <NavLink label="Administration" icon="Settings" isActive={currentPage === 'Administration'} onClick={() => handleNav('Administration')} />
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-slate-700/50 transition-colors">
              <Icon name="Bell" className="w-5 h-5" />
            </button>
             <button className="flex items-center justify-center w-8 h-8 rounded-full bg-cyan-600 text-white font-bold text-sm">
                CM
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
