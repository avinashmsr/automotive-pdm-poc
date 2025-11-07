export type Vehicle = {
  id: number; vin: string; make: string; model: string; year: number;
  owner_name?: string; mileage: number; in_service_date: string;
};
export type Telemetry = {
  id: number; vehicle_id: number; ts: string; mileage: number;
  engine_temp_avg: number; oil_level: number; brake_pad_thickness: number;
  tire_tread_depth: number; battery_health: number; harsh_braking_count: number; dtc_count: number;
};
export type PredictOut = {
  vehicle_id: number; risk_score: number; risk_label: string; next_service_eta_days: number;
  top_factors: { name: string; contribution: number }[];
};

export type VehicleSummary = Vehicle & {
  last_service_date?: string | null;
};