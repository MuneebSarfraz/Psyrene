from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.store import appointments, next_appt_id, therapists

router = APIRouter(tags=["appointments"])


class BookIn(BaseModel):
    therapist_id: int
    slot: str
    session_type: str = "video"
    patient_email: str = "khadija@example.com"


@router.post("/appointments")
def book(body: BookIn):
    if not any(t["id"] == body.therapist_id for t in therapists):
        raise HTTPException(404, "Therapist not found")
    appt = {
        "id": next_appt_id(),
        "patient_email": body.patient_email,
        "therapist_id": body.therapist_id,
        "slot": body.slot,
        "session_type": body.session_type,
        "status": "confirmed",
    }
    appointments.append(appt)
    return appt


@router.get("/appointments")
def list_appointments(status: str | None = None):
    if status:
        return [a for a in appointments if a["status"] == status]
    return appointments


@router.patch("/appointments/{aid}/cancel")
def cancel(aid: int):
    for a in appointments:
        if a["id"] == aid:
            a["status"] = "cancelled"
            return a
    raise HTTPException(404, "Appointment not found")
