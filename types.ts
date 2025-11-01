import { Icon } from "lucide-react";

export type Status = 'nominal' | 'warning' | 'critical';
export type UserRole =
  // Execution & Workflow Roles
  | 'Maintenance Technician'
  | 'Logistics Planner / Supply Chain Analyst'
  | 'Pilot / Operator'
  // Analysis & Intelligence Roles
  | 'Prognostic Engineer'
  | 'Diagnostic Engineer / Investigator'
  | 'Reliability Analyst'
  | 'System Engineering Lead'
  // Administration & Governance Roles
  | 'OBHMS Administrator / System Owner'
  | 'Security Officer'
  | 'Data Steward'
  | 'Compliance/Certification Officer'
  | 'External Systems Integrator';
  
export type Priority = 'High' | 'Medium' | 'Low';
export type HealthSubPage = 'Structural' | 'Engine' | 'Pilot';
export type AnalysisSubPage = 
  | 'Time-Series Analysis'
  | 'Data Processing Analysis'
  | 'Feature Engineering Analysis'
  | 'Frequency Analysis'
  | 'Transient Signature Analysis'
  // Diagnostics
  | 'Diagnostic Analysis'
  | 'Fault Isolation Analysis'
  | 'Root Cause Analysis'
  | 'Testability Analysis'
  | 'Inter-Parameter Correlation Analysis'
  | 'Topology-Based Analysis'
  // Prognostics
  | 'Prognostic Analysis'
  | 'Predictive Analytics'
  | 'Survival Analysis'
  | 'Anomaly Detection Analysis'
  | 'Failure Trend Analysis'
  | 'Digital Twin Analysis'
  // Fleet & Operational
  | 'Cross-Aircraft Trend Comparison'
  | 'Cross-Aircraft Anomaly Correlation'
  | 'Reliability Analysis'
  | 'Operational Analysis'
  | 'System-of-Systems Context Analysis'
  | 'Impact Analysis'
  // Management & Foundational
  | 'Natural Language Search Analysis'
  | 'Life and Usage Management Analysis'
  | 'Statistical Analysis'
  // System Specific
  | 'Structural Health Management Analysis'
  | 'Engine Health Management Analysis'
  | 'Pilot Health Monitoring Analysis';


export interface Metric {
  id: string;
  title: string;
  value: string | number;
  unit: string;
  trend?: 'up' | 'down' | 'stable';
  status: Status;
  description: string;
}

export interface AircraftSystem {
  id:string;
  name: string;
  healthIndex: number;
  status: Status;
  metrics: Metric[];
}

export interface Aircraft {
  id: string;
  tailNumber: string;
  status: Status;
  missionCapableRate: number;
  flightHours: number;
  aogDurationHours: number | null;
  systems: AircraftSystem[];
  squadron: string;
  missionType: 'Combat Air Patrol' | 'Interdiction' | 'Training' | 'Ferry';
}

export interface FleetData {
  fleetAvailability: Metric;
  missionCapableRate: Metric;
  nffRate: Metric;
  aogEvents: Metric;
  rulExpirationForecast: Metric;
  aircraft: Aircraft[];
}

export interface MaintenanceItem {
  id:string;
  aircraft: string;
  component: string;
  description: string;
  priority: Priority;
  dueDate: string;
}

// New types for customizable dashboards
export type TileType = 
  | 'metric' 
  | 'gauge' 
  | 'faults_by_system' 
  | 'shi_trend' 
  | 'aircraft_list' 
  | 'ai_summary' 
  | 'maintenance_list'
  | 'engine_vibration'
  | 'bar_chart'
  | 'line_chart'
  | 'area_chart'
  | 'pie_chart'
  | 'radar_chart'
  | 'airframe_stress_chart'
  | 'heatmap'
  | 'model_3d'
  | 'pilot_fatigue_trend';

export interface Tile {
  id: string;
  type: TileType;
  gridSpan: number; // 1-12
  metricId?: string; // for metric and gauge tiles
  title?: string; // for chart tiles
}

export interface Dashboard {
  id: string;
  name: string;
  tiles: Tile[];
}

export type ChartType = 'bar' | 'line' | 'scatter' | 'pie' | 'radar';

export interface ChartConfig {
    id: string;
    name: string;
    dataSourceId: string | null;
    chartType: ChartType;
    xAxisField: string | null;
    yAxisFields: string[] | null;
    color?: string;
}

export interface DataSource {
  id: string;
  name: string;
  description: string;
  icon: string;
  fields: {
    id: string;
    name: string;
    type: 'category' | 'value';
  }[];
}

export interface Shortcut {
  id: string;
  title: string;
  icon: string;
  targetApp: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
}

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  date: string;
  source: string;
}

export interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export type TCPStatus = 'Approved' | 'In Review' | 'Rejected' | 'Draft';

export interface TCP {
  id: string;
  title: string;
  aircraftSerialNumber: string;
  status: TCPStatus;
  author: string;
  createdDate: string;
}