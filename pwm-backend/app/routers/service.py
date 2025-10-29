import json
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from .. import models, schemas

router = APIRouter(prefix="/service", tags=["service"])

@router.post("", response_model=schemas.ServiceOut)
def add_service(s: schemas.ServiceIn, db: Session = Depends(get_db)):
    veh = db.query(models.Vehicle).get(s.vehicle_id)
    if not veh: raise HTTPException(404, "Vehicle not found")
    m = models.ServiceEvent(
        vehicle_id=s.vehicle_id,
        odometer=s.odometer,
        event_type=s.event_type,
        description=s.description,
        parts_replaced=json.dumps(s.parts_replaced),
    )
    db.add(m); db.commit(); db.refresh(m)
    return m

@router.get("/{vehicle_id}", response_model=list[schemas.ServiceOut])
def history(vehicle_id: int, db: Session = Depends(get_db)):
    return (db.query(models.ServiceEvent)
              .filter(models.ServiceEvent.vehicle_id==vehicle_id)
              .order_by(models.ServiceEvent.date.desc())
              .all())