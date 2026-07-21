from fastapi import APIRouter, HTTPException
from app.store import therapists

router = APIRouter(tags=["therapists"])


@router.get("/therapists")
def list_therapists(specialization: str | None = None):
    if specialization and specialization.lower() != "all":
        return [t for t in therapists if specialization in t["specializations"]]
    return therapists


@router.get("/therapists/{tid}")
def therapist_detail(tid: int):
    for t in therapists:
        if t["id"] == tid:
            return t
    raise HTTPException(404, "Therapist not found")


@router.get("/therapists/{tid}/availability")
def availability(tid: int):
    for t in therapists:
        if t["id"] == tid:
            return {"slots": t["availability"]}
    raise HTTPException(404, "Therapist not found")
