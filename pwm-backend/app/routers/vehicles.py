from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from .. import models, schemas

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