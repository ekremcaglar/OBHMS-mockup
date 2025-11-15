export type Status = 'nominal' | 'warning' | 'critical';

export type Trend = 'up' | 'down' | 'stable';

export interface Metric {
  id: string;
  title: string;
  description: string;
  value: string | number;
  unit?: string;
  status: Status;
  trend?: Trend;
}

export interface System {
  id: string;
  name: string;
  status: Status;
  healthIndex: number;
  metrics: Metric[];
}

export interface Aircraft {
  id: string;
  tailNumber: string;
  status: Status;
  missionCapableRate: number;
  flightHours: number;
  aogDurationHours?: number;
  systems: System[];
}

export interface FleetData {
  missionCapableRate: Metric;
  fleetAvailability: Metric;
  nffRate: Metric;
  aogEvents: Metric;
  rulExpirationForecast: Metric;
  aircraft: Aircraft[];
}

export interface Dashboard {
  id: string;
  name: string;
  tiles: Tile[];
}

export interface Tile {
  id: string;
  type: 'metric' | 'gauge' | 'bar_chart' | 'line_chart' | 'aircraft_list' | 'ai_summary';
  metricId?: string;
  gridSpan?: number;
  title?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export type ChartType = 'bar' | 'line' | 'scatter';

export interface ChartConfig {
    id: string;
    name: string;
    dataSourceId: string | null;
    chartType: ChartType;
    xAxisField: string | null;
    // FIX: Replaced 'yAxisField' with 'yAxisFields' to support multiple data series on the y-axis, aligning with modern charting requirements and fixing type errors.
    yAxisFields: string[] | null;
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
  source: string;
  content: string;
  date: string;
}
