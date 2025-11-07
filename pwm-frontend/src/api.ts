const API = import.meta.env.VITE_API_URL || "http://localhost:8000";
async function j<T>(res: Response): Promise<T> {
  if (!res.ok) throw new Error(await res.text());
  return res.json() as Promise<T>;
}
export const listVehicles = () => fetch(`${API}/vehicles`).then(j);
export const latestTelemetry = (vehicleId: number) =>
  fetch(`${API}/telemetry/latest/${vehicleId}`).then(j);
export const postPredict = (payload: Record<string, unknown>) =>
  fetch(`${API}/predict`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }).then(j);
export const ingestTelemetry = (payload: Record<string, unknown>) =>
  fetch(`${API}/telemetry`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }).then(j);
export const serviceHistory = (vehicleId: number) =>
  fetch(`${API}/service/${vehicleId}`).then(j);

export const listVehicleSummary = () =>
  fetch(`${API}/vehicles/summary`).then(j);

export const getVehicle = (id: number) =>
  fetch(`${API}/vehicles/${id}`).then(j);