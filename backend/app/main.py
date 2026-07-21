"""
Psyrene backend — FastAPI skeleton for Sprints 1–3.

This is an in-memory MVP so the React Native app has real endpoints to talk to
during development. Swap the fake stores for SQLAlchemy + PostgreSQL as per the
coding-context document when you wire up persistence.

Run:  uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
Docs: http://localhost:8000/docs
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import auth, therapists, appointments, sessions

app = FastAPI(title="Psyrene API", version="0.1.0")

# Allow the Expo dev client / device to reach the API during development.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(therapists.router)
app.include_router(appointments.router)
app.include_router(sessions.router)


@app.get("/")
def root():
    return {"app": "Psyrene", "status": "ok"}
