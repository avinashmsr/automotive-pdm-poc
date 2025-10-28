import numpy as np
import pandas as pd

FEATURES = [
    "mileage","engine_temp_avg","oil_level","brake_pad_thickness",
    "tire_tread_depth","battery_health","harsh_braking_count","dtc_count"
]

def make_synth(n=4000, seed=42):
    rng = np.random.default_rng(seed)
    df = pd.DataFrame({
        "mileage": rng.integers(5_000, 180_000, n),
        "engine_temp_avg": rng.normal(92, 6, n).clip(70, 120),
        "oil_level": rng.beta(2, 2, n),  # 0..1
        "brake_pad_thickness": rng.normal(7.5, 2.0, n).clip(0.5, 14),
        "tire_tread_depth": rng.normal(6.5, 1.8, n).clip(0.5, 12),
        "battery_health": rng.beta(3, 1.5, n),  # skew high, 0..1
        "harsh_braking_count": rng.poisson(3, n).clip(0, 30),
        "dtc_count": rng.poisson(0.8, n).clip(0, 15),
    })

    # Latent failure risk (warranty-relevant in next 45 days)
    z = (
        0.000012*df["mileage"]
        + 0.03*(df["engine_temp_avg"]-90)
        - 2.0*df["oil_level"]
        - 0.35*df["brake_pad_thickness"]
        - 0.30*df["tire_tread_depth"]
        - 1.5*df["battery_health"]
        + 0.08*df["harsh_braking_count"]
        + 0.22*df["dtc_count"]
        + rng.normal(0, 0.6, n)
    )
    p = 1/(1+np.exp(-z))
    y = (p>0.52).astype(int)
    df["target"] = y
    return df