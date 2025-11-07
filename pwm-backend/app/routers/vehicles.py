from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from .. import models, schemas
from sqlalchemy import func

router = APIRouter(prefix="/vehicles", tags=["vehicles"])

@router.get("", response_model=list[schemas.VehicleOut])
def list_vehicles(db: Session = Depends(get_db)):
    return db.query(models.Vehicle).all()

@router.post("", response_model=schemas.VehicleOut)
def create_vehicle(v: schemas.VehicleCreate, db: Session = Depends(get_db)):
    exists = db.query(models.Vehicle).filter_by(vin=v.vin).first()
    if exists: raise HTTPException(400, "VIN already exists")
    m = models.Vehicle(**v.model_dump())
    db.add(m); db.commit(); db.refresh(m)
    return m

@router.get("/{vehicle_id}", response_model=schemas.VehicleOut)   # added endpoint
def get_vehicle(vehicle_id: int, db: Session = Depends(get_db)):
    v = db.get(models.Vehicle, vehicle_id)
    if not v:
        raise HTTPException(404, "Vehicle not found")
    return v

@router.get("/summary", response_model=list[schemas.VehicleSummaryOut])  # added endpoint
def list_vehicle_summary(db: Session = Depends(get_db)):
    subq = (
        db.query(
            models.ServiceEvent.vehicle_id,
            func.max(models.ServiceEvent.date).label("last_service_date"),
        )
        .group_by(models.ServiceEvent.vehicle_id)
        .subquery()
    )
    rows = (
        db.query(models.Vehicle, subq.c.last_service_date)
        .outerjoin(subq, subq.c.vehicle_id == models.Vehicle.id)
        .all()
    )
    out = []
    for v, last_date in rows:
        out.append(
            schemas.VehicleSummaryOut(
                id=v.id,
                vin=v.vin,
                make=v.make,
                model=v.model,
                year=v.year,
                mileage=v.mileage,
                in_service_date=v.in_service_date,
                last_service_date=last_date,
            )
        )
    return out