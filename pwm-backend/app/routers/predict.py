import json
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from .. import models, schemas
from ..ml.model import ensure_model, predict_and_explain
from ..ml.synth import FEATURES

router = APIRouter(prefix="/predict", tags=["predict"])
clf = ensure_model()

def load_latest_for_vehicle(db: Session, vehicle_id: int) -> dict | None:
    tel = (db.query(models.TelemetryEvent)
             .filter(models.TelemetryEvent.vehicle_id==vehicle_id)
             .order_by(models.TelemetryEvent.ts.desc()).first())
    if not tel: return None
    return {f: getattr(tel, f) for f in FEATURES}

@router.post("", response_model=schemas.PredictOut)
def predict(req: schemas.PredictIn, db: Session = Depends(get_db)):
    vehicle_id = req.vehicle_id
    if not vehicle_id:
        raise HTTPException(400, "vehicle_id is required for PoC")

    # Merge precedence: payload overrides latest telemetry
    latest = load_latest_for_vehicle(db, vehicle_id) or {}
    merged = {f: latest.get(f) for f in FEATURES}
    for f in FEATURES:
        v = getattr(req, f, None)
        if v is not None: merged[f] = v
        if merged[f] is None:
            raise HTTPException(400, f"Missing feature: {f}. Ingest telemetry or pass it.")

    proba, label, eta, top = predict_and_explain(clf, merged)

    pred = models.Prediction(
        vehicle_id=vehicle_id,
        risk_score=proba,
        risk_label=label,
        next_service_eta_days=eta,
        top_factors=json.dumps(top)
    )
    db.add(pred); db.commit()

    return schemas.PredictOut(
        vehicle_id=vehicle_id,
        risk_score=round(proba, 3),
        risk_label=label,
        next_service_eta_days=eta,
        top_factors=top
    )