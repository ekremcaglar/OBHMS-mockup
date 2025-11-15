import { FleetData, Metric, Dashboard, ChartConfig, DataSource, Shortcut, Announcement, NewsItem, MaintenanceItem, TileType, ReportTemplate, TCP, UserRole } from './types';

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
  unit: '',
};

const rulExpirationForecast: Metric = {
  id: 'rul-forecast',
  title: 'RUL Expirations (30d)',
  description: 'Number of components with Remaining Useful Life expiring in the next 30 days.',
  value: 8,
  status: 'warning',
  trend: 'up',
  unit: 'components',
};

// New metrics for dashboards
const fuselageFatigue: Metric = { id: 'sh-1', title: 'Fuselage Fatigue Life', value: '78', unit: '% Used', status: 'nominal', description: 'Percentage of calculated fuselage fatigue life consumed.' };
const wingStressCycles: Metric = { id: 'sh-2', title: 'Wing Stress Cycles', value: '65,234', unit: 'Cycles', status: 'nominal', description: 'Number of high-stress cycles recorded on wing spars.' };
const landingGearIntegrity: Metric = { id: 'sh-3', title: 'Landing Gear Integrity', value: '99.8', unit: '% Health', status: 'nominal', description: 'Health index based on landing impact sensor data.' };

const pilotFatigueIndex: Metric = {
    id: 'pilot-fatigue-index',
    title: 'Avg. Pilot Fatigue Index',
    description: 'Average fatigue index across all active pilots.',
    value: 25,
    unit: '',
    status: 'nominal',
    trend: 'stable',
};

const totalFlightHours: Metric = {
    id: 'total-flight-hours',
    title: 'Total Flight Hours (Pilot)',
    description: 'Total flight hours for the current pilot.',
    value: 2150,
    unit: 'hrs',
    status: 'nominal',
};

const kaanHours: Metric = {
    id: 'kaan-hours',
    title: 'KAAN Platform Hours (Pilot)',
    description: 'Platform-specific hours for the current pilot.',
    value: 320,
    unit: 'hrs',
    status: 'nominal',
};


export const METRICS_MAP = new Map<string, Metric>([
  ['mc-rate', missionCapableRate],
  ['fleet-availability', fleetAvailability],
  ['nff-rate', nffRate],
  ['aog-events', aogEvents],
  ['rul-forecast', rulExpirationForecast],
  ['sh-1', fuselageFatigue],
  ['sh-2', wingStressCycles],
  ['sh-3', landingGearIntegrity],
  ['pilot-fatigue-index', pilotFatigueIndex],
  ['total-flight-hours', totalFlightHours],
  ['kaan-hours', kaanHours],
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
      squadron: '101st "Asena"',
      missionType: 'Combat Air Patrol',
      status: 'nominal',
      missionCapableRate: 98,
      flightHours: 1250,
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
            {id: 'm-p-2', title: 'EGT Anomaly', value: '+15°C', status: 'warning', description: '', unit: '°C'},
        ]},
        { id: 'sys-03', name: 'Hydraulics', status: 'nominal', healthIndex: 92, metrics: [] },
        { id: 'sys-04', name: 'Airframe', status: 'nominal', healthIndex: 98, metrics: [] },
      ],
    },
    {
      id: 'ac-003',
      tailNumber: 'KAAN-003',
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
             {id: 'm-h-2', title: 'Reservoir Level', value: 'Low', status: 'warning', description: '', unit: ''}
        ]},
        { id: 'sys-04', name: 'Airframe', status: 'warning', healthIndex: 88, metrics: [
             {id: 'm-a-1', title: 'Stress Sensor #7', value: 'High', status: 'warning', description: '', unit: ''}
        ]},
      ],
    },
    {
      id: 'ac-004',
      tailNumber: 'KAAN-004',
      squadron: '102nd "Hançer"',
      missionType: 'Interdiction',
      status: 'nominal',
      missionCapableRate: 99,
      flightHours: 420,
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

export const OPERATIONAL_FORECAST_DATA = {
  'engine-temp': Array.from({ length: 12 }, (_, i) => ({
    month: `M+${i + 1}`,
    forecast: 950 + Math.random() * 50 - 25,
    upperBound: 980 + Math.random() * 20 - 10,
    lowerBound: 920 + Math.random() * 20 - 10,
  })),
  'hydraulic-pressure': Array.from({ length: 12 }, (_, i) => ({
    month: `M+${i + 1}`,
    forecast: 3000 + Math.random() * 100 - 50,
    upperBound: 3100 + Math.random() * 50 - 25,
    lowerBound: 2900 + Math.random() * 50 - 25,
  })),
};

// Initial App State Data
export const INITIAL_DASHBOARDS: Dashboard[] = [
    {
        id: 'db-1',
        name: 'Fleet Command Overview',
        tiles: [
            { id: 't-1', type: 'metric', metricId: 'mc-rate', gridSpan: 3 },
            { id: 't-2', type: 'gauge', metricId: 'fleet-availability', gridSpan: 3 },
            { id: 't-3', type: 'metric', metricId: 'nff-rate', gridSpan: 2 },
            { id: 't-4', type: 'metric', metricId: 'aog-events', gridSpan: 2 },
            { id: 't-5', type: 'metric', metricId: 'rul-forecast', gridSpan: 2 },
            { id: 't-6', type: 'aircraft_list', gridSpan: 4 },
            { id: 't-7', type: 'ai_summary', gridSpan: 8 },
            { id: 't-8', type: 'shi_trend', title: 'Fleet System Health Index (SHI) Trend', gridSpan: 12 },
        ]
    },
    {
        id: 'db-2',
        name: 'Maintenance Watchlist',
        tiles: [
          { id: 't-9', type: 'maintenance_list', gridSpan: 12 },
        ]
    },
    {
        id: 'db-3',
        name: 'Propulsion Deep Dive',
        tiles: [
            { id: 't-10', type: 'engine_vibration', gridSpan: 6 },
            { id: 't-11', type: 'heatmap', gridSpan: 6 },
            { id: 't-12', type: 'metric', metricId: 'rul-forecast', gridSpan: 4 },
            { id: 't-13', type: 'ai_summary', gridSpan: 8 },
        ]
    },
    {
        id: 'db-4',
        name: 'Structural Integrity',
        tiles: [
            { id: 't-14', type: 'airframe_stress_chart', gridSpan: 7 },
            { id: 't-15', type: 'model_3d', gridSpan: 5 },
            { id: 't-16', type: 'metric', metricId: 'sh-1', gridSpan: 4 },
            { id: 't-17', type: 'metric', metricId: 'sh-2', gridSpan: 4 },
            { id: 't-18', type: 'metric', metricId: 'sh-3', gridSpan: 4 },
        ]
    },
    {
        id: 'db-5',
        name: 'Pilot Health & Performance',
        tiles: [
            { id: 't-19', type: 'pilot_fatigue_trend', gridSpan: 12 },
            { id: 't-20', type: 'gauge', metricId: 'pilot-fatigue-index', gridSpan: 4 },
            { id: 't-21', type: 'metric', metricId: 'total-flight-hours', gridSpan: 4 },
            { id: 't-22', type: 'metric', metricId: 'kaan-hours', gridSpan: 4 },
        ]
    },
    {
        id: 'db-6',
        name: 'Fleet Readiness',
        tiles: [
            { id: 't-23', type: 'aircraft_list', gridSpan: 12 },
            { id: 't-24', type: 'faults_by_system', gridSpan: 6 },
            { id: 't-25', type: 'maintenance_list', gridSpan: 6 },
        ]
    },
    {
        id: 'db-7',
        name: 'Cross-Fleet System Comparison',
        tiles: [
            { id: 't-26', type: 'radar_chart', gridSpan: 12 },
            { id: 't-27', type: 'shi_trend', gridSpan: 8 },
            { id: 't-28', type: 'faults_by_system', gridSpan: 4 },
        ]
    },
    {
        id: 'db-8',
        name: 'AI & Analytics Hub',
        tiles: [
            { id: 't-29', type: 'ai_summary', gridSpan: 12 },
            { id: 't-30', type: 'line_chart', title: 'Custom Trend Analysis', gridSpan: 4 },
            { id: 't-31', type: 'bar_chart', title: 'Custom Bar Chart', gridSpan: 4 },
            { id: 't-32', type: 'pie_chart', title: 'Custom Pie Chart', gridSpan: 4 },
        ]
    },
    {
        id: 'db-9',
        name: 'Engine Performance Monitoring',
        tiles: [
            { id: 't-33', type: 'engine_vibration', gridSpan: 12 },
            { id: 't-34', type: 'heatmap', gridSpan: 12 },
        ]
    },
    {
        id: 'db-10',
        name: 'Logistics & Maintenance Planning',
        tiles: [
            { id: 't-35', type: 'maintenance_list', gridSpan: 12 },
            { id: 't-36', type: 'metric', metricId: 'rul-forecast', gridSpan: 6 },
            { id: 't-37', type: 'metric', metricId: 'aog-events', gridSpan: 6 },
        ]
    },
    {
        id: 'db-11',
        name: 'Daily Standup Briefing',
        tiles: [
            { id: 't-38', type: 'metric', metricId: 'mc-rate', gridSpan: 4 },
            { id: 't-39', type: 'gauge', metricId: 'fleet-availability', gridSpan: 4 },
            { id: 't-40', type: 'metric', metricId: 'aog-events', gridSpan: 4 },
            { id: 't-41', type: 'aircraft_list', gridSpan: 6 },
            { id: 't-42', type: 'maintenance_list', gridSpan: 6 },
        ]
    },
    {
        id: 'db-12',
        name: 'Advanced Diagnostics',
        tiles: [
            { id: 't-43', type: 'faults_by_system', gridSpan: 6 },
            { id: 't-44', type: 'heatmap', gridSpan: 6 },
            { id: 't-45', type: 'engine_vibration', gridSpan: 12 },
            { id: 't-46', type: 'ai_summary', gridSpan: 12 },
            { id: 't-47', type: 'area_chart', title: 'Custom Area Chart', gridSpan: 12 },
        ]
    },
    {
        id: 'engine-vibration-fft',
        name: 'Engine Vibration FFT',
        description: 'Frequency domain analysis of engine vibration data.',
        icon: 'WaveSquare',
        fields: [
            { id: 'frequency', name: 'Frequency (Hz)', type: 'category' },
            { id: 'amplitude', name: 'Amplitude', type: 'value' },
        ]
    },
    {
        id: 'failure-trend-data',
        name: 'Failure Trend Over Time',
        description: 'Monthly failure counts for a specific component.',
        icon: 'TrendingUp',
        fields: [
            { id: 'month', name: 'Month', type: 'category' },
            { id: 'failures', name: 'Failures', type: 'value' },
        ]
    },
    {
        id: 'data-processing-pipeline',
        name: 'Data Processing Pipeline',
        description: 'Volume of data at each stage of the processing pipeline.',
        icon: 'Database',
        fields: [
            { id: 'stage', name: 'Stage', type: 'category' },
            { id: 'dataVolume', name: 'Data Volume (GB)', type: 'value' },
        ]
    },
    {
        id: 'feature-engineering-data',
        name: 'Engine Feature Correlation',
        description: 'Correlation between different engineered features from engine data.',
        icon: 'Cpu',
        fields: [
            { id: 'vibrationRms', name: 'Vibration (RMS)', type: 'value' },
            { id: 'peakToPeak', name: 'Peak-to-Peak', type: 'value' },
            { id: 'kurtosis', name: 'Kurtosis', type: 'value' },
            { id: 'crestFactor', name: 'Crest Factor', type: 'value' },
        ]
    },
    {
        id: 'transient-event-data',
        name: 'Landing Gear Transient Event',
        description: 'High-frequency data captured during a landing gear deployment event.',
        icon: 'Zap',
        fields: [
            { id: 'time', name: 'Time (ms)', type: 'value' },
            { id: 'amplitude', name: 'Amplitude', type: 'value' },
            { id: 'baseline', name: 'Baseline', type: 'value' },
        ]
    }
];

export const INITIAL_CHARTS: ChartConfig[] = [
    {
        id: 'chart-1',
        name: 'Faults by System',
        dataSourceId: 'fault-data',
        chartType: 'bar',
        xAxisField: 'system',
        yAxisFields: ['faultCount']
    },
    {
        id: 'chart-2',
        name: 'Engine Telemetry Trend',
        dataSourceId: 'engine-vibration',
        chartType: 'line',
        xAxisField: 'date',
        yAxisFields: ['vibrationRms', 'egt']
    },
    {
        id: 'chart-3',
        name: 'Fault Severity Distribution',
        dataSourceId: 'fault-data',
        chartType: 'pie',
        xAxisField: 'system',
        yAxisFields: ['severity']
    },
    {
        id: 'chart-4',
        name: 'Vibration vs EGT',
        dataSourceId: 'engine-vibration',
        chartType: 'scatter',
        xAxisField: 'egt',
        yAxisFields: ['vibrationRms']
    },
    {
        id: 'chart-5',
        name: 'System Health Comparison',
        dataSourceId: 'system-health-comparison',
        chartType: 'radar',
        xAxisField: 'subject',
        yAxisFields: ['KAAN-001', 'KAAN-002', 'KAAN-003', 'KAAN-004']
    }
];

export const CHART_DATA_SOURCES: DataSource[] = [
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
            { id: 'egt', name: 'EGT (°C)', type: 'value' },
            { id: 'engineId', name: 'Engine ID', type: 'category' },
        ]
    },
    {
        id: 'system-health-comparison',
        name: 'System Health Comparison Data',
        description: 'Health indices for major systems across the fleet.',
        icon: 'Radar',
        fields: [
            { id: 'subject', name: 'System', type: 'category' },
            { id: 'KAAN-001', name: 'KAAN-001', type: 'value' },
            { id: 'KAAN-002', name: 'KAAN-002', type: 'value' },
            { id: 'KAAN-003', name: 'KAAN-003', type: 'value' },
            { id: 'KAAN-004', name: 'KAAN-004', type: 'value' },
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
        { date: '2023-10-01', vibrationRms: 0.12, egt: 850, engineId: 'ENG-01' },
        { date: '2023-10-02', vibrationRms: 0.13, egt: 852, engineId: 'ENG-01' },
        { date: '2023-10-03', vibrationRms: 0.12, egt: 851, engineId: 'ENG-01' },
        { date: '2023-10-04', vibrationRms: 0.15, egt: 855, engineId: 'ENG-01' },
        { date: '2023-10-05', vibrationRms: 0.16, egt: 858, engineId: 'ENG-01' },
        { date: '2023-10-06', vibrationRms: 0.18, egt: 860, engineId: 'ENG-01' },
    ],
    'system-health-comparison': [
      { subject: 'Avionics', 'KAAN-001': 99, 'KAAN-002': 95, 'KAAN-003': 96, 'KAAN-004': 99 },
      { subject: 'Propulsion', 'KAAN-001': 97, 'KAAN-002': 45, 'KAAN-003': 94, 'KAAN-004': 98 },
      { subject: 'Hydraulics', 'KAAN-001': 85, 'KAAN-002': 92, 'KAAN-003': 78, 'KAAN-004': 99 },
      { subject: 'Airframe', 'KAAN-001': 99, 'KAAN-002': 98, 'KAAN-003': 88, 'KAAN-004': 100 },
    ],
    'engine-vibration-fft': Array.from({ length: 50 }, (_, i) => ({
        frequency: i * 10,
        amplitude: Math.random() * (i === 20 ? 5 : 1),
    })),
    'failure-trend-data': [
        { month: 'Jan', failures: 2 },
        { month: 'Feb', failures: 3 },
        { month: 'Mar', failures: 2 },
        { month: 'Apr', failures: 4 },
        { month: 'May', failures: 5 },
        { month: 'Jun', failures: 4 },
        { month: 'Jul', failures: 6 },
        { month: 'Aug', failures: 5 },
    ],
    'data-processing-pipeline': [
        { stage: 'Ingest', dataVolume: 500 },
        { stage: 'Clean', dataVolume: 450 },
        { stage: 'Validate', dataVolume: 440 },
        { stage: 'Align', dataVolume: 420 },
        { stage: 'Standardize', dataVolume: 410 },
        { stage: 'Store', dataVolume: 400 },
    ],
    'feature-engineering-data': Array.from({ length: 50 }, () => ({
        vibrationRms: Math.random() * 2,
        peakToPeak: Math.random() * 5,
        kurtosis: 3 + Math.random() * 2,
        crestFactor: 1.5 + Math.random(),
    })),
    'transient-event-data': Array.from({ length: 100 }, (_, i) => {
        const baseline = 1 + Math.sin(i / 10) * 0.2;
        let amplitude = baseline + (Math.random() - 0.5) * 0.1;
        if (i > 40 && i < 50) {
            amplitude += Math.sin((i - 40) * Math.PI / 10) * 3;
        }
        return { time: i * 2, amplitude, baseline };
    }),
};

export const MOCK_DIAGNOSTIC_ANALYSIS: { [key: string]: any } = {
    'fl-2': {
        symptoms: [
            "Hydraulic Pressure Warning Light On",
            "Slow landing gear deployment reported by pilot",
            "Telemetry shows pressure drop in port-side hydraulic line during high-G maneuvers"
        ],
        probableCauses: [
            {
                component: "Hydraulic Line P-78B",
                reasoning: "Stress analysis indicates this line is prone to fatigue cracks. Recent flight profiles involved high stress.",
                probability: 0.75,
                source: "Physics-Based Model"
            },
            {
                component: "Reservoir Pressure Sensor",
                reasoning: "Sensor has a history of intermittent failures across the fleet. Could be a false positive.",
                probability: 0.20,
                source: "Historical Data"
            },
            {
                component: "Hydraulic Pump Assembly",
                reasoning: "Pump is nearing its scheduled maintenance interval, but shows no other signs of degradation.",
                probability: 0.05,
                source: "Maintenance Records"
            }
        ]
    }
};

// Home Page Data
export const SHORTCUTS_DATA: Shortcut[] = [
    { id: 'sc-1', title: 'Dashboards', icon: 'LayoutDashboard', targetApp: 'Dashboards' },
    { id: 'sc-2', title: 'Health Monitoring', icon: 'HeartPulse', targetApp: 'Health' },
    { id: 'sc-3', title: 'Chart Builder', icon: 'AreaChart', targetApp: 'Chart Builder' },
    { id: 'sc-4', title: 'Reports', icon: 'FileText', targetApp: 'Reports' },
    { id: 'sc-6', title: 'User Roles', icon: 'Users', targetApp: 'UserRoles' },
    { id: 'sc-7', title: 'Requirements', icon: 'ClipboardList', targetApp: 'Requirements' },
    { id: 'sc-14', title: 'Home Page Manual', icon: 'NotebookText', targetApp: 'HomeManual' },
    { id: 'sc-15', title: 'Top Panel Manual', icon: 'PanelTop', targetApp: 'TopPanelManual' },
    { id: 'sc-8', title: 'Dashboard Manual', icon: 'BookOpen', targetApp: 'DashboardManual' },
    { id: 'sc-9', title: 'Chart Builder Manual', icon: 'BarChartHorizontal', targetApp: 'ChartBuilderManual' },
    { id: 'sc-10', title: 'Health Monitoring Manual', icon: 'Stethoscope', targetApp: 'HealthMonitoringManual' },
    { id: 'sc-11', title: 'Reports Manual', icon: 'FilePieChart', targetApp: 'ReportsManual' },
    { id: 'sc-12', title: 'TCP Manual', icon: 'FileCheck2', targetApp: 'TCPManual' },
    { id: 'sc-13', title: 'UI/UX Specs', icon: 'Palette', targetApp: 'UISpecsManual' },
    { id: 'sc-16', title: 'Software Architecture', icon: 'Component', targetApp: 'ArchitectureManual' },
    { id: 'sc-5', title: 'Help', icon: 'HelpCircle', targetApp: 'Help' },
];

export const ANNOUNCEMENTS_DATA: Announcement[] = [
    { id: 'an-1', title: 'OBHMS v2.1 Deployed', content: 'Version 2.1 is now live, featuring the new Chart Builder module and enhanced AI summary capabilities.', date: '2023-10-26' },
    { id: 'an-2', title: 'Scheduled Maintenance', content: 'The system will be offline for scheduled maintenance on Sunday from 0200 to 0400 Zulu.', date: '2023-10-24' },
];

export const NEWS_DATA: NewsItem[] = [
    { id: 'nw-1', title: 'New Predictive Maintenance Algorithm Rolled Out for Propulsion Systems', source: 'Engineering Command', content: 'A new ML model is improving RUL accuracy for turbine blades by 15%.', date: '2023-10-25' },
    { id: 'nw-2', title: 'Global Supply Chain Delays Affecting Landing Gear Components', source: 'Logistics Weekly', content: 'Expect extended lead times for specific hydraulic actuators. Plan maintenance accordingly.', date: '2023-10-22' },
];

export const AVAILABLE_TILES = [
    { name: 'Metric', type: 'metric' as TileType, defaultGridSpan: 3, defaultMetricId: 'mc-rate' },
    { name: 'Gauge', type: 'gauge' as TileType, defaultGridSpan: 3, defaultMetricId: 'fleet-availability' },
    { name: 'Faults By System', type: 'faults_by_system' as TileType, defaultGridSpan: 6 },
    { name: 'SHI Trend', type: 'shi_trend' as TileType, defaultGridSpan: 6 },
    { name: 'Aircraft List', type: 'aircraft_list' as TileType, defaultGridSpan: 12 },
    { name: 'AI Summary', type: 'ai_summary' as TileType, defaultGridSpan: 12 },
    { name: 'Maintenance List', type: 'maintenance_list' as TileType, defaultGridSpan: 12 },
    { name: 'Engine Vibration', type: 'engine_vibration' as TileType, defaultGridSpan: 6 },
    { name: 'Airframe Stress Chart', type: 'airframe_stress_chart' as TileType, defaultGridSpan: 6 },
    { name: 'Radar Chart', type: 'radar_chart' as TileType, defaultGridSpan: 6 },
    { name: 'Heatmap', type: 'heatmap' as TileType, defaultGridSpan: 6 },
    { name: '3D Model', type: 'model_3d' as TileType, defaultGridSpan: 6 },
    { name: 'Pilot Fatigue Trend', type: 'pilot_fatigue_trend' as TileType, defaultGridSpan: 6 },
];

export const MOCK_MAINTENANCE_DATA: MaintenanceItem[] = [
    { id: 'maint-1', aircraft: 'KAAN-002', component: 'Turbine Blade S7', description: 'RUL below 20 hours, requires inspection.', priority: 'High', dueDate: '2 days' },
    { id: 'maint-2', aircraft: 'KAAN-003', component: 'Hydraulic Reservoir', description: 'Persistent low level warning, check for leaks.', priority: 'Medium', dueDate: '5 days' },
    { id: 'maint-3', aircraft: 'KAAN-001', component: 'Avionics Bus #3', description: 'Intermittent data dropouts reported.', priority: 'Medium', dueDate: '7 days' },
];

export const STRUCTURAL_HEALTH_METRICS = {
    fuselageFatigue,
    wingStressCycles,
    landingGearIntegrity,
};

export const PORT_ENGINE_DATA = Array.from({ length: 50 }, (_, i) => ({
    time: i,
    egt: 850 + Math.random() * 10 - 5,
    n1: 98 + Math.random() * 0.5 - 0.25,
    oil: 90 + Math.random() * 4 - 2,
    vibration: 1.2 + Math.random() * 0.1 - 0.05,
}));
export const STARBOARD_ENGINE_DATA = Array.from({ length: 50 }, (_, i) => ({
    time: i,
    egt: 865 + Math.random() * 12 - 6,
    n1: 97.8 + Math.random() * 0.6 - 0.3,
    oil: 88 + Math.random() * 5 - 2.5,
    vibration: 1.5 + Math.random() * 0.2 - 0.1,
}));

export const PILOT_DATA = {
    name: 'Major Ali Vural',
    callsign: 'Cobra',
    status: 'Cleared for Flight',
    totalFlightHours: 2150,
    kaanHours: 320,
    lastFlight: '2023-10-25',
    fatigueIndex: 25,
    certifications: ['Combat Ready', 'IFR', 'Night Ops', 'Test Pilot Level 2'],
};

export const PILOT_FATIGUE_TREND = Array.from({ length: 10 }, (_, i) => ({
    flight: i + 1,
    fatigueIndex: 15 + Math.random() * 20,
}));

export const PILOT_LIVE_BIOMETRICS = {
    heartRate: Array.from({ length: 20 }, (_, i) => ({ x: i, y: 75 + Math.random() * 10 - 5 })),
    respiration: Array.from({ length: 20 }, (_, i) => ({ x: i, y: 16 + Math.random() * 4 - 2 })),
    gForce: Array.from({ length: 20 }, (_, i) => ({ x: i, y: 1 + Math.sin(i / 5) * 0.5 + Math.random() * 0.2 })),
};

export const AIRFRAME_STRESS_DATA = [
    { fh: 1200, events: 2 },
    { fh: 1210, events: 1 },
    { fh: 1220, events: 5 },
    { fh: 1230, events: 3 },
    { fh: 1240, events: 2 },
    { fh: 1250, events: 4 },
];

export const ENGINE_VIBRATION_DATA = Array.from({ length: 12 }, (v, i) => ({
    date: `2023-${String(i+1).padStart(2,'0')}-01`,
    vibration: 1.2 + Math.random() * 0.4,
}));

export const RADAR_CHART_DATA = [
    { subject: 'Avionics', 'KAAN-001': 99, 'KAAN-002': 95, 'KAAN-003': 96, 'KAAN-004': 99 },
    { subject: 'Propulsion', 'KAAN-001': 97, 'KAAN-002': 45, 'KAAN-003': 94, 'KAAN-004': 98 },
    { subject: 'Hydraulics', 'KAAN-001': 85, 'KAAN-002': 92, 'KAAN-003': 78, 'KAAN-004': 99 },
    { subject: 'Airframe', 'KAAN-001': 99, 'KAAN-002': 98, 'KAAN-003': 88, 'KAAN-004': 100 },
];

export const HEATMAP_DATA = {
    labels: ['EGT', 'N1', 'Oil Press', 'Vibration'],
    data: [
      [1.00, 0.65, -0.32, 0.81],
      [0.65, 1.00, -0.21, 0.75],
      [-0.32, -0.21, 1.00, -0.40],
      [0.81, 0.75, -0.40, 1.00],
    ],
};

// New data for Structural Heatmap
export const AIRFRAME_STRESS_HEATMAP_DATA = {
    labels: ['L-Wing Root', 'R-Wing Root', 'Fuselage-Fwd', 'Fuselage-Aft', 'Empennage'],
    yLabels: ['Tension', 'Compression', 'Shear', 'Torsion'],
    data: [
      // L-Wing, R-Wing, Fuselage-Fwd, Fuselage-Aft, Empennage
      [0.8, 0.82, 0.5, 0.7, 0.6], // Tension
      [0.6, 0.65, 0.4, 0.8, 0.5], // Compression
      [0.7, 0.71, 0.3, 0.6, 0.8], // Shear
      [0.4, 0.4, 0.2, 0.5, 0.9],  // Torsion
    ],
};

// New data for Pilot Skills Radar Chart
export const PILOT_SKILLS_DATA = [
    { skill: 'Take-off', pilot: 92, average: 85 },
    { skill: 'Landing', pilot: 88, average: 82 },
    { skill: 'Combat Maneuvers', pilot: 95, average: 90 },
    { skill: 'Instrument Flight', pilot: 85, average: 88 },
    { skill: 'Emergency Proc.', pilot: 90, average: 86 },
];


export const MOCK_TCP_DATA: TCP[] = [
    { id: 'TCP-2023-001', title: 'Upgrade F-135 Engine Control Software to v3.2.1', aircraftSerialNumber: 'ALL', status: 'Approved', author: 'J. Doe', createdDate: '2023-10-15' },
    { id: 'TCP-2023-002', title: 'Inspect Port-side Wing Spar for hairline cracks', aircraftSerialNumber: 'KAAN-003', status: 'In Review', author: 'A. Smith', createdDate: '2023-10-22' },
    { id: 'TCP-2023-003', title: 'Replace cockpit display unit (CDU) #2', aircraftSerialNumber: 'KAAN-001', status: 'Rejected', author: 'B. White', createdDate: '2023-09-30' },
    { id: 'TCP-2023-004', title: 'Calibrate Radar Altimeter', aircraftSerialNumber: 'ALL', status: 'Draft', author: 'C. Green', createdDate: '2023-10-26' },
    { id: 'TCP-2023-005', title: 'Install new sensor bracket on landing gear', aircraftSerialNumber: 'KAAN-004', status: 'Approved', author: 'J. Doe', createdDate: '2023-08-11' },
];

export const REPORT_TEMPLATES: ReportTemplate[] = [
    { id: 'rt-1', name: 'aircraft_health_summary', description: 'aircraft_health_summary_desc', icon: 'HeartPulse' },
    { id: 'rt-2', name: 'fleet_mission_capability', description: 'fleet_mission_capability_desc', icon: 'Plane' },
    { id: 'rt-3', name: 'system_fault_analysis', description: 'system_fault_analysis_desc', icon: 'ShieldAlert' },
    { id: 'rt-4', name: 'component_rul_forecast', description: 'component_rul_forecast_desc', icon: 'TrendingUp' },
    { id: 'rt-5', name: 'pilot_fatigue_report', description: 'pilot_fatigue_report_desc', icon: 'User' },
];

export const MOCK_FAULT_LOGS = [
  { id: 'fl-1', timestamp: '2023-10-26 08:15', aircraft: 'KAAN-002', system: 'Propulsion', code: 'P0128', description: 'Coolant Thermostat Malfunction', severity: 'Medium' },
  { id: 'fl-2', timestamp: '2023-10-26 07:30', aircraft: 'KAAN-003', system: 'Hydraulics', code: 'H5501', description: 'Reservoir Pressure Low - Port', severity: 'High' },
  { id: 'fl-3', timestamp: '2023-10-25 14:00', aircraft: 'KAAN-001', system: 'Avionics', code: 'A2310', description: 'Intermittent MFD #3 Blanking', severity: 'Low' },
  { id: 'fl-4', timestamp: '2023-10-25 11:20', aircraft: 'KAAN-002', system: 'Propulsion', code: 'P0420', description: 'Catalyst System Efficiency Below Threshold', severity: 'Medium' },
  { id: 'fl-5', timestamp: '2023-10-24 16:45', aircraft: 'KAAN-002', system: 'Propulsion', code: 'P0301', description: 'Cylinder 1 Misfire Detected', severity: 'High' },
  { id: 'fl-6', timestamp: '2023-10-23 09:05', aircraft: 'KAAN-004', system: 'ECS', code: 'E1005', description: 'Cabin Pressure Sensor Drift', severity: 'Low' },
];
export const ADMIN_ROLES: UserRole[] = [
  'OBHMS Administrator / System Owner',
  'Security Officer',
  'Data Steward',
  'Compliance/Certification Officer',
  'External Systems Integrator',
];

export const ROLE_I18N_MAP: Record<UserRole, string> = {
  'Maintenance Technician': 'maintenance_technician',
  'Logistics Planner / Supply Chain Analyst': 'logistics_planner',
  'Pilot / Operator': 'pilot_operator',
  'Prognostic Engineer': 'prognostic_engineer',
  'Diagnostic Engineer / Investigator': 'diagnostic_engineer',
  'Reliability Analyst': 'reliability_analyst',
  'System Engineering Lead': 'system_engineering_lead',
  'OBHMS Administrator / System Owner': 'obhms_administrator',
  'Security Officer': 'security_officer',
  'Data Steward': 'data_steward',
  'Compliance/Certification Officer': 'compliance_officer',
  'External Systems Integrator': 'external_systems_integrator',
};

export const ROLE_GROUPS = [
  { group: 'execution_workflow_roles', roles: [
      'Maintenance Technician',
      'Logistics Planner / Supply Chain Analyst',
      'Pilot / Operator',
    ] as UserRole[] 
  },
  { group: 'analysis_intelligence_roles', roles: [
      'Prognostic Engineer',
      'Diagnostic Engineer / Investigator',
      'Reliability Analyst',
      'System Engineering Lead',
    ] as UserRole[] 
  },
  { group: 'administration_governance_roles', roles: [
      'OBHMS Administrator / System Owner',
      'Security Officer',
      'Data Steward',
      'Compliance/Certification Officer',
      'External Systems Integrator',
    ] as UserRole[] 
  },
];

export const PILLARS_DATA = [
  {
    titleKey: 'pillar_core_analytics',
    sections: [
      { key: 'Analysis', titleKey: 'section_analysis_title', descriptionKey: 'section_analysis_desc' },
      { key: 'Health Monitoring', titleKey: 'section_health_monitoring_title', descriptionKey: 'section_health_monitoring_desc' },
      { key: 'RCA Workbench', titleKey: 'section_rca_workbench_title', descriptionKey: 'section_rca_workbench_desc' },
      { key: 'Modeling & Algorithm Management', titleKey: 'section_modeling_management_title', descriptionKey: 'section_modeling_management_desc' },
      { key: 'Digital Twins & Simulation', titleKey: 'section_digital_twins_title', descriptionKey: 'section_digital_twins_desc' },
      { key: 'Custom Feature Builder', titleKey: 'section_feature_builder_title', descriptionKey: 'section_feature_builder_desc' },
      { key: 'Life Cycle Cost (LCC) Modeling', titleKey: 'section_lcc_modeling_title', descriptionKey: 'section_lcc_modeling_desc' },
      { key: 'Design Change Impact Simulator', titleKey: 'section_design_change_simulator_title', descriptionKey: 'section_design_change_simulator_desc' },
      { key: 'Health Threshold Management', titleKey: 'section_health_threshold_management_title', descriptionKey: 'section_health_threshold_management_desc' },
      { key: 'Mission Planning & Profiles', titleKey: 'section_mission_planning_title', descriptionKey: 'section_mission_planning_desc' },
      { key: 'Environmental & Operational Limits', titleKey: 'section_env_op_limits_title', descriptionKey: 'section_env_op_limits_desc' },
      { key: 'Statistical Process Control (SPC) Charts', titleKey: 'section_spc_charts_title', descriptionKey: 'section_spc_charts_desc' },
      { key: 'Wear-out Rate Comparison', titleKey: 'section_wear_rate_comparison_title', descriptionKey: 'section_wear_rate_comparison_desc' },
      { key: 'Training Simulator Data Interface', titleKey: 'section_training_simulator_interface_title', descriptionKey: 'section_training_simulator_interface_desc' },
      { key: 'Cost-Benefit Analysis Report Generator', titleKey: 'section_cost_benefit_analysis_title', descriptionKey: 'section_cost_benefit_analysis_desc' },
    ]
  },
  {
    titleKey: 'pillar_data_management',
    sections: [
      { key: 'User & Role Administration', titleKey: 'section_user_admin_title', descriptionKey: 'section_user_admin_desc' },
      { key: 'System Configuration & Settings', titleKey: 'section_system_config_title', descriptionKey: 'section_system_config_desc' },
      { key: 'Data Ingestion Management', titleKey: 'section_data_ingestion_title', descriptionKey: 'section_data_ingestion_desc' },
      { key: 'Audit Trail & Security Logs', titleKey: 'section_audit_trail_title', descriptionKey: 'section_audit_trail_desc' },
      { key: 'System Health Monitoring', titleKey: 'section_system_health_monitoring_title', descriptionKey: 'section_system_health_monitoring_desc' },
      { key: 'Data Quality & Governance', titleKey: 'section_data_quality_title', descriptionKey: 'section_data_quality_desc' },
      { key: 'Sensor Calibration & Health Log', titleKey: 'section_sensor_calibration_title', descriptionKey: 'section_sensor_calibration_desc' },
      { key: 'Cybersecurity Threat Assessment', titleKey: 'section_cybersecurity_title', descriptionKey: 'section_cybersecurity_desc' },
      { key: 'Software Updates & Patch Management', titleKey: 'section_software_updates_title', descriptionKey: 'section_software_updates_desc' },
      { key: 'Data Governance Rules Engine', titleKey: 'section_data_governance_title', descriptionKey: 'section_data_governance_desc' },
      { key: 'Alerts & Notifications Center', titleKey: 'section_alerts_notifications_title', descriptionKey: 'section_alerts_notifications_desc' },
      { key: 'Offline Mode Management', titleKey: 'section_offline_mode_title', descriptionKey: 'section_offline_mode_desc' },
      { key: 'Change Management & Versioning', titleKey: 'section_change_management_title', descriptionKey: 'section_change_management_desc' },
      { key: 'Multi-Language Support & Localization', titleKey: 'section_multi_language_title', descriptionKey: 'section_multi_language_desc' },
      { key: 'User Behavior Analytics', titleKey: 'section_user_behavior_analytics_title', descriptionKey: 'section_user_behavior_analytics_desc' },
      { key: 'Data Export/Import Utility', titleKey: 'section_data_export_import_title', descriptionKey: 'section_data_export_import_desc' },
      { key: 'User Personalization & Customization', titleKey: 'section_user_personalization_title', descriptionKey: 'section_user_personalization_desc' },
    ]
  },
  {
    titleKey: 'pillar_maintenance_workflow',
    sections: [
      { key: 'Dashboards', titleKey: 'section_dashboards_title', descriptionKey: 'section_dashboards_desc' },
      { key: 'Chart Builder', titleKey: 'section_chart_builder_title', descriptionKey: 'section_chart_builder_desc' },
      { key: 'Reports', titleKey: 'section_reports_title', descriptionKey: 'section_reports_desc' },
      { key: 'Work Order & Scheduling', titleKey: 'section_work_order_title', descriptionKey: 'section_work_order_desc' },
      { key: 'Component Inventory & Traceability', titleKey: 'section_component_inventory_title', descriptionKey: 'section_component_inventory_desc' },
      { key: 'Supply Chain & Logistics Dashboard', titleKey: 'section_supply_chain_title', descriptionKey: 'section_supply_chain_desc' },
      { key: 'Master Equipment List (MEL) Management', titleKey: 'section_mel_management_title', descriptionKey: 'section_mel_management_desc' },
      { key: 'Resource Allocation Optimization', titleKey: 'section_resource_allocation_title', descriptionKey: 'section_resource_allocation_desc' },
      { key: 'Preventive Maintenance Task Library', titleKey: 'section_pm_task_library_title', descriptionKey: 'section_pm_task_library_desc' },
      { key: 'Ground Support Equipment (GSE) Log', titleKey: 'section_gse_log_title', descriptionKey: 'section_gse_log_desc' },
      { key: 'Discrepancy Reporting & Tracking', titleKey: 'section_discrepancy_reporting_title', descriptionKey: 'section_discrepancy_reporting_desc' },
      { key: 'Mission Debrief Interface', titleKey: 'section_mission_debrief_title', descriptionKey: 'section_mission_debrief_desc' },
      { key: 'Digital Signatures & Approvals', titleKey: 'section_digital_signatures_title', descriptionKey: 'section_digital_signatures_desc' },
      { key: 'TCP', titleKey: 'section_tcp_title', descriptionKey: 'section_tcp_desc' },
    ]
  },
  {
    titleKey: 'pillar_compliance_integration',
    sections: [
      { key: 'Fleet Management', titleKey: 'section_fleet_management_title', descriptionKey: 'section_fleet_management_desc' },
      { key: 'API & Integration Console', titleKey: 'section_api_integration_title', descriptionKey: 'section_api_integration_desc' },
      { key: 'Search & Knowledge Base', titleKey: 'section_search_knowledge_base_title', descriptionKey: 'section_search_knowledge_base_desc' },
      { key: 'Training & Documentation', titleKey: 'section_training_documentation_title', descriptionKey: 'section_training_documentation_desc' },
      { key: 'Certification & Compliance Tracking', titleKey: 'section_certification_compliance_title', descriptionKey: 'section_certification_compliance_desc' },
      { key: 'Engineering Review Board (ERB) Interface', titleKey: 'section_erb_interface_title', descriptionKey: 'section_erb_interface_desc' },
      { key: 'Maintenance Procedure Viewer', titleKey: 'section_maintenance_procedure_viewer_title', descriptionKey: 'section_maintenance_procedure_viewer_desc' },
      { key: 'System Integration Validation', titleKey: 'section_system_integration_validation_title', descriptionKey: 'section_system_integration_validation_desc' },
      { key: 'Aviation Standards Reference', titleKey: 'section_aviation_standards_reference_title', descriptionKey: 'section_aviation_standards_reference_desc' },
      { key: 'User Feedback & Enhancement Pipeline', titleKey: 'section_user_feedback_title', descriptionKey: 'section_user_feedback_desc' },
    ]
  }
];

export const CROSS_AIRCRAFT_TREND_DATA = {
  comparisonData: [
    ...RADAR_CHART_DATA,
  ],
};

export const ALL_SECTION_KEYS = PILLARS_DATA.flatMap(p => p.sections.map(s => s.key));

export const SECTION_I18N_KEYS = new Map(PILLARS_DATA.flatMap(p => p.sections.map(s => [s.key, { titleKey: s.titleKey, descriptionKey: s.descriptionKey }])));

export const REQUIREMENTS_DATA = [
  {
    pillarKey: 'pillar_core_analytics',
    sections: [
      { key: 'Health Monitoring', titleKey: 'req_health_monitoring_title', descriptionKey: 'req_health_monitoring_desc' },
      { key: 'Analysis', titleKey: 'req_analysis_title', descriptionKey: 'req_analysis_desc' },
      { key: 'Prognostic Analysis', titleKey: 'req_prognostics_title', descriptionKey: 'req_prognostics_desc' },
      { key: 'Root Cause Analysis', titleKey: 'req_rca_title', descriptionKey: 'req_rca_desc' },
      { key: 'Digital Twins & Simulation', titleKey: 'req_digital_twin_title', descriptionKey: 'req_digital_twin_desc' },
    ]
  },
  {
    pillarKey: 'pillar_data_management',
    sections: [
      { key: 'User & Role Administration', titleKey: 'req_user_admin_title', descriptionKey: 'req_user_admin_desc' },
      { key: 'Data Ingestion Management', titleKey: 'req_data_ingestion_title', descriptionKey: 'req_data_ingestion_desc' },
      { key: 'Audit Trail & Security Logs', titleKey: 'req_security_logs_title', descriptionKey: 'req_security_logs_desc' },
      { key: 'System Configuration & Settings', titleKey: 'req_system_config_title', descriptionKey: 'req_system_config_desc' },
    ]
  },
  {
    pillarKey: 'pillar_maintenance_workflow',
    sections: [
      { key: 'Dashboards', titleKey: 'req_dashboards_title', descriptionKey: 'req_dashboards_desc' },
      { key: 'Chart Builder', titleKey: 'req_chart_builder_title', descriptionKey: 'req_chart_builder_desc' },
      { key: 'Reports', titleKey: 'req_reports_title', descriptionKey: 'req_reports_desc' },
      { key: 'TCP', titleKey: 'req_tcp_title', descriptionKey: 'req_tcp_desc' },
      { key: 'Natural Language Search Analysis', titleKey: 'req_search_title', descriptionKey: 'req_search_desc' },
    ]
  },
  {
    pillarKey: 'pillar_compliance_integration',
    sections: [
      { key: 'API & Integration Console', titleKey: 'req_api_integration_title', descriptionKey: 'req_api_integration_desc' },
      { key: 'Certification & Compliance Tracking', titleKey: 'req_compliance_tracking_title', descriptionKey: 'req_compliance_tracking_desc' },
      { key: 'Training & Documentation', titleKey: 'req_documentation_title', descriptionKey: 'req_documentation_desc' },
      { key: 'Multi-Language Support & Localization', titleKey: 'req_localization_title', descriptionKey: 'req_localization_desc' },
    ]
  }
];