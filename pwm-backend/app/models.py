from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base

class Vehicle(Base):
    __tablename__ = "vehicles"
    id = Column(Integer, primary_key=True, index=True)
    vin = Column(String, unique=True, index=True, nullable=False)
    make = Column(String, nullable=False)
    model = Column(String, nullable=False)
    year = Column(Integer, nullable=False)
    owner_name = Column(String, nullable=True)
    mileage = Column(Integer, default=0)
    in_service_date = Column(DateTime, default=datetime.utcnow)

    telemetry = relationship("TelemetryEvent", back_populates="vehicle", cascade="all, delete-orphan")
    services = relationship("ServiceEvent", back_populates="vehicle", cascade="all, delete-orphan")
    predictions = relationship("Prediction", back_populates="vehicle", cascade="all, delete-orphan")

class TelemetryEvent(Base):
    __tablename__ = "telemetry"
    id = Column(Integer, primary_key=True)
    vehicle_id = Column(Integer, ForeignKey("vehicles.id"), index=True)
    ts = Column(DateTime, default=datetime.utcnow, index=True)

    mileage = Column(Integer, default=0)
    engine_temp_avg = Column(Float, default=90.0)       # °C
    oil_level = Column(Float, default=0.6)              # 0..1
    brake_pad_thickness = Column(Float, default=8.0)    # mm
    tire_tread_depth = Column(Float, default=6.0)       # mm
    battery_health = Column(Float, default=0.8)         # 0..1
    harsh_braking_count = Column(Integer, default=0)
    dtc_count = Column(Integer, default=0)

    vehicle = relationship("Vehicle", back_populates="telemetry")

class ServiceEvent(Base):
    __tablename__ = "service_events"
    id = Column(Integer, primary_key=True)
    vehicle_id = Column(Integer, ForeignKey("vehicles.id"), index=True)
    date = Column(DateTime, default=datetime.utcnow)
    odometer = Column(Integer, default=0)
    event_type = Column(String, default="maintenance")  # maintenance|repair|inspection
    description = Column(Text, default="")
    parts_replaced = Column(Text, default="[]")         # JSON string

    vehicle = relationship("Vehicle", back_populates="services")

class Prediction(Base):
    __tablename__ = "predictions"
    id = Column(Integer, primary_key=True)
    vehicle_id = Column(Integer, ForeignKey("vehicles.id"), index=True)
    ts = Column(DateTime, default=datetime.utcnow)
    risk_score = Column(Float)
    risk_label = Column(String)
    next_service_eta_days = Column(Integer)
    top_factors = Column(Text, default="[]")            # JSON string

    vehicle = relationship("Vehicle", back_populates="predictions")