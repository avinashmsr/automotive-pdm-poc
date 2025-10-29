from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import Base, engine
from .routers import vehicles, telemetry, service, predict
from .ml.model import ensure_model

Base.metadata.create_all(bind=engine)
ensure_model()

app = FastAPI(title="Predictive Warranty (Maintenance) PoC", version="0.1.0")

# -----------------------------------------------------------------------------
# CORS (allow local dev UIs on 5173 React and 5174 Vue)
# -----------------------------------------------------------------------------
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5174",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins, allow_credentials=True,
    allow_methods=["*"], allow_headers=["*"],
)

app.include_router(vehicles.router)
app.include_router(telemetry.router)
app.include_router(service.router)
app.include_router(predict.router)

@app.get("/")
def root():
    return {"ok": True, "service": "PWM PoC"}