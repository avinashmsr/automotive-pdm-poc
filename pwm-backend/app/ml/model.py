from pathlib import Path
import joblib
import numpy as np
from .synth import make_synth, FEATURES
from sklearn.linear_model import LogisticRegression

MODEL_DIR = Path("models")
MODEL_PATH = MODEL_DIR / "warranty_model.joblib"

def ensure_model():
    MODEL_DIR.mkdir(exist_ok=True, parents=True)
    if MODEL_PATH.exists():
        return joblib.load(MODEL_PATH)
    df = make_synth()
    X = df[FEATURES].values
    y = df["target"].values
    clf = LogisticRegression(max_iter=200, n_jobs=None)
    clf.fit(X, y)
    joblib.dump(clf, MODEL_PATH)
    return clf

def predict_and_explain(clf, payload: dict):
    x = np.array([[payload[f] for f in FEATURES]], dtype=float)
    proba = float(clf.predict_proba(x)[0,1])
    # contributions ~ beta_i * x_i (no SHAP; simple and fast)
    coefs = clf.coef_[0]
    contributions = {f: float(coefs[i]*x[0,i]) for i,f in enumerate(FEATURES)}
    # Derive ETA heuristic
    if proba >= 0.75: eta = 7
    elif proba >= 0.5: eta = 21
    else: eta = 45
    # Label
    label = "HIGH" if proba >= 0.75 else "MEDIUM" if proba >= 0.50 else "LOW"
    # Top factors
    top = sorted(contributions.items(), key=lambda kv: abs(kv[1]), reverse=True)[:5]
    return proba, label, eta, [{"name": k, "contribution": v} for k,v in top]