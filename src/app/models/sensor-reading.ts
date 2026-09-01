export interface SensorReading {
  temperature: number; // in Celsius
  energyUsage: number; // in kW
  occupancy: number; // percentage of building occupied, 0-100
  airQuality: number; // index, 0-100 (higher is better)
  timestamp: number;
}

export interface FloorStatus {
  id: string;
  label: string;
  status: 'normal' | 'warning' | 'alert';
  temperature: number;
}
