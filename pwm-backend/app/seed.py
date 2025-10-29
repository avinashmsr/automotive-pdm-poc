from sqlalchemy.orm import Session
from .database import Base, engine, SessionLocal
from . import models
from datetime import datetime, timedelta
import random

def seed():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    db: Session = SessionLocal()
    try:
        vehicles = [
            models.Vehicle(vin="1FADP3F20DL123456", make="Ford", model="Focus", year=2018, owner_name="Alex Johnson", mileage=62000),
            models.Vehicle(vin="2T3JFREV4EW654321", make="Toyota", model="RAV4", year=2020, owner_name="Priya Singh", mileage=41000),
            models.Vehicle(vin="5YJ3E1EA7JF987654", make="Tesla", model="Model 3", year=2019, owner_name="Chris Lee", mileage=53000),
            models.Vehicle(vin="3KPF24AD1ME234567", make="Kia", model="Forte", year=2021, owner_name="Jordan Chen", mileage=28000),
        ]
        for v in vehicles:
            db.add(v)
        db.commit()

        # telemetry history
        for v in db.query(models.Vehicle).all():
            base_miles = v.mileage - 3000
            for i in range(6):
                t = models.TelemetryEvent(
                    vehicle_id=v.id,
                    mileage=base_miles + i*600,
                    engine_temp_avg=random.uniform(88, 98),
                    oil_level=max(0.1, random.uniform(0.4, 0.9) - i*0.03),
                    brake_pad_thickness=max(1.0, random.uniform(6.0, 10.0) - i*0.4),
                    tire_tread_depth=max(2.0, random.uniform(5.0, 8.0) - i*0.3),
                    battery_health=max(0.3, random.uniform(0.6, 0.95) - i*0.05),
                    harsh_braking_count=random.randint(0, 8),
                    dtc_count=random.choice([0,0,0,1,2]),
                    ts=datetime.utcnow() - timedelta(days=(30-i)*5)
                )
                db.add(t)

            # example service
            s = models.ServiceEvent(
                vehicle_id=v.id,
                odometer=v.mileage - random.randint(500, 2500),
                event_type="maintenance",
                description="Oil & filter change; tire rotation",
                parts_replaced='["oil_filter","engine_oil"]'
            )
            db.add(s)
        db.commit()
    finally:
        db.close()

if __name__ == "__main__":
    seed()