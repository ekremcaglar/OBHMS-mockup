import React from 'react';
import MetricCard from '../MetricCard';
import { STRUCTURAL_HEALTH_METRICS } from '../../constants';
import AirframeStressChart from './charts/AirframeStressChart';
import { useI18n } from '../../context/I18nContext';

const AircraftSchematic: React.FC = () => {
    const { t } = useI18n();
    const metrics = STRUCTURAL_HEALTH_METRICS;
    const hotspotBaseClass = "absolute rounded-full transition-all duration-300 cursor-pointer group";
    const dotClass = "w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_8px_2px_rgba(0,255,255,0.7)] animate-pulse";
    const tooltipClass = "absolute bottom-full mb-2 w-max bg-gray-900 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap";

    return (
        <div className="relative w-full h-full flex items-center justify-center p-4">
             <svg viewBox="0 0 800 400" className="w-full h-auto max-h-[400px]" preserveAspectRatio="xMidYMid meet">
                <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{stopColor: '#374151', stopOpacity: 1}} />
                    <stop offset="100%" style={{stopColor: '#1f2937', stopOpacity: 1}} />
                    </linearGradient>
                </defs>
                {/* Main Fuselage */}
                <path d="M400 100 L450 150 L450 250 L400 300 L350 250 L350 150 Z" fill="url(#grad1)" stroke="#4b5563" strokeWidth="2" />
                <path d="M400 100 L650 180 L650 220 L400 300 Z" fill="url(#grad1)" stroke="#4b5563" strokeWidth="2" />
                <path d="M400 100 L150 180 L150 220 L400 300 Z" fill="url(#grad1)" stroke="#4b5563" strokeWidth="2" />
                {/* Wings */}
                <path d="M450 160 L750 100 L700 180 L450 210 Z" fill="url(#grad1)" stroke="#4b5563" strokeWidth="2" />
                <path d="M350 160 L50 100 L100 180 L350 210 Z" fill="url(#grad1)" stroke="#4b5563" strokeWidth="2" />
                {/* Tail */}
                <path d="M150 190 L100 180 L120 250 L150 210 Z" fill="url(#grad1)" stroke="#4b5563" strokeWidth="2" />
                <path d="M650 190 L700 180 L680 250 L650 210 Z" fill="url(#grad1)" stroke="#4b5563" strokeWidth="2" />
            </svg>
            
            {/* Hotspots */}
            <div className={`${hotspotBaseClass}`} style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                <div className={dotClass}></div>
                <div className={`${tooltipClass} -translate-x-1/2`}><b>{metrics.fuselageFatigue.title}:</b> {metrics.fuselageFatigue.value} {metrics.fuselageFatigue.unit}</div>
            </div>
             <div className={`${hotspotBaseClass}`} style={{ top: '45%', left: '75%', transform: 'translate(-50%, -50%)' }}>
                <div className={dotClass}></div>
                <div className={`${tooltipClass} -translate-x-1/2`}><b>{metrics.wingStressCycles.title}:</b> {metrics.wingStressCycles.value} {metrics.wingStressCycles.unit}</div>
            </div>
             <div className={`${hotspotBaseClass}`} style={{ top: '65%', left: '40%', transform: 'translate(-50%, -50%)' }}>
                <div className={dotClass}></div>
                <div className={`${tooltipClass} -translate-x-1/2`}><b>{metrics.landingGearIntegrity.title}:</b> {metrics.landingGearIntegrity.value} {metrics.landingGearIntegrity.unit}</div>
            </div>
        </div>
    );
};


const StructuralHealth: React.FC = () => {
  const { t } = useI18n();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-[400px] bg-gray-800/50 border border-gray-700/50 rounded-xl shadow-lg backdrop-blur-sm">
            <AircraftSchematic />
        </div>
        <div className="space-y-4">
            <MetricCard metric={STRUCTURAL_HEALTH_METRICS.fuselageFatigue} />
            <MetricCard metric={STRUCTURAL_HEALTH_METRICS.wingStressCycles} />
            <MetricCard metric={STRUCTURAL_HEALTH_METRICS.landingGearIntegrity} />
        </div>
      </div>
      <div className="h-96">
        <MetricCard 
          metric={{ 
            id: 'af-stress', 
            title: t('airframe_high_g'), 
            value: '', 
            unit: '', 
            status: 'warning', 
            description: t('airframe_high_g_desc')
          }}
        >
          <AirframeStressChart />
        </MetricCard>
      </div>
    </div>
  );
};

export default StructuralHealth;