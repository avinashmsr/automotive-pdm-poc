from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from .. import models, schemas

router = APIRouter(prefix="/telemetry", tags=["telemetry"])

@router.post("", response_model=schemas.TelemetryOut)
def ingest(t: schemas.TelemetryIn, db: Session = Depends(get_db)):
    veh = db.query(models.Vehicle).get(t.vehicle_id)
    if not veh: raise HTTPException(404, "Vehicle not found")
    m = models.TelemetryEvent(**t.model_dump())
    veh.mileage = t.mileage
    db.add(m); db.commit(); db.refresh(m)
    return m

@router.get("/latest/{vehicle_id}", response_model=schemas.TelemetryOut | None)
def latest(vehicle_id: int, db: Session = Depends(get_db)):
    q = (db.query(models.TelemetryEvent)
           .filter(models.TelemetryEvent.vehicle_id==vehicle_id)
           .order_by(models.TelemetryEvent.ts.desc()))
    return q.first()