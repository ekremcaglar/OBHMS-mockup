
import { FleetData, Metric, Dashboard, ChartConfig, DataSource, Shortcut, Announcement, NewsItem } from './types';

// Metrics
const missionCapableRate: Metric = {
  id: 'mc-rate',
  title: 'Mission Capable Rate',
  description: 'Percentage of aircraft in the fleet ready for mission tasking.',
  value: '92.3',
  unit: '%',
  status: 'nominal',
  trend: 'up',
};

const fleetAvailability: Metric = {
  id: 'fleet-availability',
  title: 'Fleet Availability',
  description: 'Percentage of the fleet that is not grounded for maintenance.',
  value: 88.5,
  unit: '%',
  status: 'warning',
  trend: 'down',
};

const nffRate: Metric = {
  id: 'nff-rate',
  title: 'No Fault Found Rate',
  description: 'Percentage of maintenance actions where no fault was found.',
  value: '4.1',
  unit: '%',
  status: 'nominal',
  trend: 'down',
};

const aogEvents: Metric = {
  id: 'aog-events',
  title: 'AOG Events (7 days)',
  description: 'Number of Aircraft On Ground events in the last 7 days.',
  value: 1,
  status: 'critical',
  trend: 'stable',
  // FIX: Add missing 'unit' property.
  unit: '',
};

const rulExpirationForecast: Metric = {
  id: 'rul-forecast',
  title: 'RUL Expirations (30d)',
  description: 'Number of components with Remaining Useful Life expiring in the next 30 days.',
  value: 8,
  status: 'warning',
  trend: 'up',
  // FIX: Add missing 'unit' property.
  unit: 'components',
};

export const METRICS_MAP = new Map<string, Metric>([
  ['mc-rate', missionCapableRate],
  ['fleet-availability', fleetAvailability],
  ['nff-rate', nffRate],
  ['aog-events', aogEvents],
  ['rul-forecast', rulExpirationForecast],
]);


// Mock Fleet Data
export const MOCK_FLEET_DATA: FleetData = {
  missionCapableRate,
  fleetAvailability,
  nffRate,
  aogEvents,
  rulExpirationForecast,
  aircraft: [
    {
      id: 'ac-001',
      tailNumber: 'KAAN-001',
      // FIX: Add missing 'squadron' and 'missionType' properties.
      squadron: '101st "Asena"',
      missionType: 'Combat Air Patrol',
      status: 'nominal',
      missionCapableRate: 98,
      flightHours: 1250,
      // FIX: Add missing 'aogDurationHours' property.
      aogDurationHours: null,
      systems: [
        { id: 'sys-01', name: 'Avionics', status: 'nominal', healthIndex: 99, metrics: [] },
        { id: 'sys-02', name: 'Propulsion', status: 'nominal', healthIndex: 97, metrics: [] },
        { id: 'sys-03', name: 'Hydraulics', status: 'warning', healthIndex: 85, metrics: [
          {id: 'm-h-1', title: 'Pressure Fluctuation', value: '5%', unit: 'Δ', status: 'warning', description: ''},
        ]},
        { id: 'sys-04', name: 'Airframe', status: 'nominal', healthIndex: 99, metrics: [] },
      ],
    },
    {
      id: 'ac-002',
      tailNumber: 'KAAN-002',
      // FIX: Add missing 'squadron' and 'missionType' properties.
      squadron: '101st "Asena"',
      missionType: 'Ferry',
      status: 'critical',
      missionCapableRate: 0,
      flightHours: 870,
      aogDurationHours: 48,
      systems: [
        { id: 'sys-01', name: 'Avionics', status: 'nominal', healthIndex: 95, metrics: [] },
        { id: 'sys-02', name: 'Propulsion', status: 'critical', healthIndex: 45, metrics: [
            {id: 'm-p-1', title: 'Turbine RUL', value: '10', unit: 'FH', status: 'critical', description: ''},
            // FIX: Add missing 'unit' property.
            {id: 'm-p-2', title: 'EGT Anomaly', value: '+15°C', status: 'warning', description: '', unit: '°C'},
        ]},
        { id: 'sys-03', name: 'Hydraulics', status: 'nominal', healthIndex: 92, metrics: [] },
        { id: 'sys-04', name: 'Airframe', status: 'nominal', healthIndex: 98, metrics: [] },
      ],
    },
    {
      id: 'ac-003',
      tailNumber: 'KAAN-003',
      // FIX: Add missing 'squadron' and 'missionType' properties.
      squadron: '102nd "Hançer"',
      missionType: 'Training',
      status: 'warning',
      missionCapableRate: 85,
      flightHours: 1530,
      aogDurationHours: null,
      systems: [
        { id: 'sys-01', name: 'Avionics', status: 'nominal', healthIndex: 96, metrics: [] },
        { id: 'sys-02', name: 'Propulsion', status: 'nominal', healthIndex: 94, metrics: [] },
        { id: 'sys-03', name: 'Hydraulics', status: 'warning', healthIndex: 78, metrics: [
             // FIX: Add missing 'unit' property.
             {id: 'm-h-2', title: 'Reservoir Level', value: 'Low', status: 'warning', description: '', unit: ''}
        ]},
        { id: 'sys-04', name: 'Airframe', status: 'warning', healthIndex: 88, metrics: [
             // FIX: Add missing 'unit' property.
             {id: 'm-a-1', title: 'Stress Sensor #7', value: 'High', status: 'warning', description: '', unit: ''}
        ]},
      ],
    },
    {
      id: 'ac-004',
      tailNumber: 'KAAN-004',
      // FIX: Add missing 'squadron' and 'missionType' properties.
      squadron: '102nd "Hançer"',
      missionType: 'Interdiction',
      status: 'nominal',
      missionCapableRate: 99,
      flightHours: 420,
      // FIX: Add missing 'aogDurationHours' property.
      aogDurationHours: null,
      systems: [
        { id: 'sys-01', name: 'Avionics', status: 'nominal', healthIndex: 99, metrics: [] },
        { id: 'sys-02', name: 'Propulsion', status: 'nominal', healthIndex: 98, metrics: [] },
        { id: 'sys-03', name: 'Hydraulics', status: 'nominal', healthIndex: 99, metrics: [] },
        { id: 'sys-04', name: 'Airframe', status: 'nominal', healthIndex: 100, metrics: [] },
      ],
    },
  ],
};


// Chart Data
export const FAULTS_BY_SYSTEM = [
  { name: 'Avionics', count: 12 },
  { name: 'Propulsion', count: 25 },
  { name: 'Hydraulics', count: 18 },
  { name: 'Landing Gear', count: 8 },
  { name: 'ECS', count: 5 },
];

export const SHI_TREND_DATA = [
  { week: 'W-10', shi: 94.5 },
  { week: 'W-9', shi: 95.1 },
  { week: 'W-8', shi: 93.8 },
  { week: 'W-7', shi: 94.2 },
  { week: 'W-6', shi: 92.5 },
  { week: 'W-5', shi: 91.8 },
  { week: 'W-4', shi: 92.1 },
  { week: 'W-3', shi: 90.5 },
  { week: 'W-2', shi: 89.9 },
  { week: 'W-1', shi: 88.7 },
];

// Initial App State Data
export const INITIAL_DASHBOARDS: Dashboard[] = [
    {
        id: 'db-1',
        name: 'Fleet Command Overview',
        tiles: [
            { id: 't-1', type: 'metric', metricId: 'mc-rate', gridSpan: 1 },
            { id: 't-2', type: 'gauge', metricId: 'fleet-availability', gridSpan: 1 },
            { id: 't-3', type: 'metric', metricId: 'nff-rate', gridSpan: 1 },
            { id: 't-4', type: 'metric', metricId: 'aog-events', gridSpan: 1 },
            { id: 't-5', type: 'metric', metricId: 'rul-forecast', gridSpan: 1 },
            { id: 't-6', type: 'aircraft_list', gridSpan: 3 },
            { id: 't-7', type: 'ai_summary', gridSpan: 2 },
            { id: 't-8', type: 'line_chart', title: 'Fleet System Health Index (SHI) Trend', gridSpan: 5 },
        ]
    },
    {
        id: 'db-2',
        name: 'Maintenance Watchlist',
        tiles: []
    }
];

export const INITIAL_CHARTS: ChartConfig[] = [
    {
        id: 'chart-1',
        name: 'Faults by System',
        dataSourceId: 'fault-data',
        chartType: 'bar',
        xAxisField: 'system',
        yAxisField: 'faultCount'
    },
    {
        id: 'chart-2',
        name: 'Vibration Trend - ENG-01',
        dataSourceId: 'engine-vibration',
        chartType: 'line',
        xAxisField: 'date',
        yAxisField: 'vibrationRms'
    }
];

export const DATA_SOURCES: DataSource[] = [
    {
        id: 'fault-data',
        name: 'Historical Fault Data',
        description: 'Aggregated fault codes by system over the last 90 days.',
        icon: 'ShieldAlert',
        fields: [
            { id: 'system', name: 'Aircraft System', type: 'category' },
            { id: 'faultCount', name: 'Fault Count', type: 'value' },
            { id: 'severity', name: 'Average Severity', type: 'value' },
        ]
    },
    {
        id: 'engine-vibration',
        name: 'Engine Vibration Telemetry',
        description: 'Time-series vibration data from engine sensors.',
        icon: 'RadioTower',
        fields: [
            { id: 'date', name: 'Date', type: 'category' },
            { id: 'vibrationRms', name: 'Vibration (RMS)', type: 'value' },
            { id: 'engineId', name: 'Engine ID', type: 'category' },
        ]
    }
];

export const MOCK_CHART_DATA: { [key: string]: any[] } = {
    'fault-data': [
        { system: 'Avionics', faultCount: 12, severity: 2.1 },
        { system: 'Propulsion', faultCount: 25, severity: 4.5 },
        { system: 'Hydraulics', faultCount: 18, severity: 3.2 },
        { system: 'Landing Gear', faultCount: 8, severity: 4.1 },
        { system: 'ECS', faultCount: 5, severity: 1.8 },
    ],
    'engine-vibration': [
        { date: '2023-10-01', vibrationRms: 0.12, engineId: 'ENG-01' },
        { date: '2023-10-02', vibrationRms: 0.13, engineId: 'ENG-01' },
        { date: '2023-10-03', vibrationRms: 0.12, engineId: 'ENG-01' },
        { date: '2023-10-04', vibrationRms: 0.15, engineId: 'ENG-01' },
        { date: '2023-10-05', vibrationRms: 0.16, engineId: 'ENG-01' },
        { date: '2023-10-06', vibrationRms: 0.18, engineId: 'ENG-01' },
    ]
};

// Home Page Data
export const SHORTCUTS_DATA: Shortcut[] = [
    { id: 'sc-1', title: 'Fleet Status', icon: 'Plane', targetApp: 'fleet-status' },
    { id: 'sc-2', title: 'Dashboards', icon: 'LayoutDashboard', targetApp: 'dashboards' },
    { id: 'sc-3', title: 'Chart Builder', icon: 'AreaChart', targetApp: 'chart-builder' },
    { id: 'sc-4', title: 'Administration', icon: 'Settings', targetApp: 'admin' },
];

export const ANNOUNCEMENTS_DATA: Announcement[] = [
    { id: 'an-1', title: 'OBHMS v2.1 Deployed', content: 'Version 2.1 is now live, featuring the new Chart Builder module and enhanced AI summary capabilities.', date: '2023-10-26' },
    { id: 'an-2', title: 'Scheduled Maintenance', content: 'The system will be offline for scheduled maintenance on Sunday from 0200 to 0400 Zulu.', date: '2023-10-24' },
];

export const NEWS_DATA: NewsItem[] = [
    { id: 'nw-1', title: 'New Predictive Maintenance Algorithm Rolled Out for Propulsion Systems', source: 'Engineering Command', content: 'A new ML model is improving RUL accuracy for turbine blades by 15%.', date: '2023-10-25' },
    { id: 'nw-2', title: 'Global Supply Chain Delays Affecting Landing Gear Components', source: 'Logistics Weekly', content: 'Expect extended lead times for specific hydraulic actuators. Plan maintenance accordingly.', date: '2023-10-22' },
];