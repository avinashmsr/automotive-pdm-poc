from pydantic import BaseModel, Field, field_validator
from typing import Optional, List, Literal
from datetime import datetime
import json

# ---- Vehicle ----
class VehicleCreate(BaseModel):
    vin: str
    make: str
    model: str
    year: int
    owner_name: Optional[str] = None
    mileage: int = 0

class VehicleOut(BaseModel):
    id: int
    vin: str
    make: str
    model: str
    year: int
    owner_name: Optional[str] = None
    mileage: int
    in_service_date: datetime
    class Config: from_attributes = True

# ---- Telemetry ----
class TelemetryIn(BaseModel):
    vehicle_id: int
    mileage: int
    engine_temp_avg: float = 90.0
    oil_level: float = Field(ge=0, le=1, default=0.6)
    brake_pad_thickness: float = 8.0
    tire_tread_depth: float = 6.0
    battery_health: float = Field(ge=0, le=1, default=0.8)
    harsh_braking_count: int = 0
    dtc_count: int = 0

class TelemetryOut(TelemetryIn):
    id: int
    ts: datetime
    class Config: from_attributes = True

# ---- Service ----
class ServiceIn(BaseModel):
    vehicle_id: int
    odometer: int
    event_type: Literal["maintenance","repair","inspection"] = "maintenance"
    description: str = ""
    parts_replaced: List[str] = []

class ServiceOut(ServiceIn):
    id: int
    date: datetime
    class Config: from_attributes = True

    @field_validator("parts_replaced", mode="before")
    @classmethod
    def _coerce_parts(cls, v):
        if isinstance(v, str):
            v = v.strip()
            if not v:
                return []
            # try JSON first
            try:
                parsed = json.loads(v)
                if isinstance(parsed, list):
                    return parsed
            except Exception:
                pass
            # fallback: comma-separated string
            return [p.strip() for p in v.split(",") if p.strip()]
        return v

# ---- Prediction ----
class PredictIn(BaseModel):
    vehicle_id: Optional[int] = None
    mileage: Optional[int] = None
    engine_temp_avg: Optional[float] = None
    oil_level: Optional[float] = None
    brake_pad_thickness: Optional[float] = None
    tire_tread_depth: Optional[float] = None
    battery_health: Optional[float] = None
    harsh_braking_count: Optional[int] = None
    dtc_count: Optional[int] = None

class Factor(BaseModel):
    name: str
    contribution: float

class PredictOut(BaseModel):
    vehicle_id: int
    risk_score: float
    risk_label: str
    next_service_eta_days: int
    top_factors: List[Factor]