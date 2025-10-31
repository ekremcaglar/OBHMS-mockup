
export type Status = 'nominal' | 'warning' | 'critical';

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
  id: string;
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
}

export interface FleetData {
  fleetAvailability: Metric;
  missionCapableRate: Metric;
  nffRate: Metric;
  aogEvents: Metric;
  rulExpirationForecast: Metric;
  aircraft: Aircraft[];
}
