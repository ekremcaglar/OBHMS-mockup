
import { FleetData } from './types';

export const MOCK_FLEET_DATA: FleetData = {
  fleetAvailability: {
    id: 'far-001',
    title: 'Fleet Availability Rate',
    value: 92.1,
    unit: '%',
    status: 'nominal',
    description: 'Percentage of time the fleet is physically available for deployment.',
  },
  missionCapableRate: {
    id: 'mcr-001',
    title: 'Mission Capable Rate',
    value: 88.5,
    unit: '%',
    status: 'warning',
    description: 'Percentage of the fleet officially categorized as Mission Capable.',
  },
  nffRate: {
    id: 'nffr-001',
    title: 'No Fault Found Rate',
    value: 8,
    unit: '%',
    trend: 'down',
    status: 'nominal',
    description: 'Rate of components removed that test functional, indicating diagnostic accuracy.',
  },
  aogEvents: {
    id: 'aog-001',
    title: 'AOG Events / 1,000 FH',
    value: 2.3,
    unit: '',
    trend: 'stable',
    status: 'nominal',
    description: 'Frequency of unexpected Aircraft On Ground incidents per 1,000 flight hours.',
  },
  rulExpirationForecast: {
      id: 'rul-exp-001',
      title: 'RUL Expirations (30-day)',
      value: 14,
      unit: 'components',
      status: 'warning',
      description: 'Components projected to reach critical RUL thresholds in the next 30 days.'
  },
  aircraft: [
    {
      id: 'ac-001',
      tailNumber: 'KAAN-001',
      status: 'nominal',
      missionCapableRate: 98,
      flightHours: 1240,
      aogDurationHours: null,
      systems: [
        { id: 'sys-prop-001', name: 'Propulsion', healthIndex: 95, status: 'nominal', metrics: [] },
        { id: 'sys-avio-001', name: 'Avionics', healthIndex: 92, status: 'nominal', metrics: [] },
      ],
    },
    {
      id: 'ac-002',
      tailNumber: 'KAAN-002',
      status: 'critical',
      missionCapableRate: 0,
      flightHours: 890,
      aogDurationHours: 18,
      systems: [
        {
          id: 'sys-prop-002',
          name: 'Propulsion',
          healthIndex: 45,
          status: 'critical',
          metrics: [
            { id: 'rul-turb-002', title: 'Turbine Blade RUL', value: 25, unit: 'FH', status: 'critical', description: 'Remaining Useful Life of port-side turbine blade.' },
            { id: 'vib-eng-002', title: 'Engine Vibration', value: 1.8, unit: 'IPS', status: 'warning', description: 'Increased vibration detected in Engine 1.' },
          ],
        },
        { id: 'sys-avio-002', name: 'Avionics', healthIndex: 88, status: 'nominal', metrics: [] },
      ],
    },
    {
      id: 'ac-003',
      tailNumber: 'KAAN-003',
      status: 'warning',
      missionCapableRate: 75,
      flightHours: 1523,
      aogDurationHours: null,
      systems: [
        { id: 'sys-prop-003', name: 'Propulsion', healthIndex: 85, status: 'nominal', metrics: [] },
        {
          id: 'sys-hyd-003',
          name: 'Hydraulics',
          healthIndex: 72,
          status: 'warning',
          metrics: [
            { id: 'pres-hyd-003', title: 'Pressure Deviation', value: 8, unit: '%', status: 'warning', description: 'System A pressure showing intermittent deviation.' },
            { id: 'temp-hyd-003', title: 'Fluid Temperature', value: 95, unit: '°C', status: 'nominal', description: 'Hydraulic fluid temperature within normal range.' },
          ],
        },
      ],
    },
     {
      id: 'ac-004',
      tailNumber: 'KAAN-004',
      status: 'nominal',
      missionCapableRate: 100,
      flightHours: 650,
      aogDurationHours: null,
      systems: [
        { id: 'sys-prop-004', name: 'Propulsion', healthIndex: 98, status: 'nominal', metrics: [] },
        { id: 'sys-avio-004', name: 'Avionics', healthIndex: 96, status: 'nominal', metrics: [] },
      ],
    },
  ],
};

export const FAULTS_BY_SYSTEM = [
    { name: 'Avionics', count: 18, fill: '#3b82f6' },
    { name: 'Hydraulics', count: 12, fill: '#8b5cf6' },
    { name: 'Propulsion', count: 9, fill: '#ef4444' },
    { name: 'Flight Controls', count: 7, fill: '#f97316' },
    { name: 'Power Systems', count: 5, fill: '#eab308' },
];

export const SHI_TREND_DATA = [
  { week: 'Wk 1', shi: 98 },
  { week: 'Wk 2', shi: 97 },
  { week: 'Wk 3', shi: 97 },
  { week: 'Wk 4', shi: 95 },
  { week: 'Wk 5', shi: 92 },
  { week: 'Wk 6', shi: 89 },
  { week: 'Wk 7', shi: 88 },
  { week: 'Wk 8', shi: 85 },
  { week: 'Wk 9', shi: 84 },
  { week: 'Wk 10', shi: 82 },
];
