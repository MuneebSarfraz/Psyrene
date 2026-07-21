from fastapi import APIRouter
import uuid

router = APIRouter(tags=["sessions"])


@router.post("/sessions/{appointment_id}/start")
def start(appointment_id: int):
    # In production, generate a Daily.co / Agora room token here.
    return {"appointment_id": appointment_id, "room_url": f"https://demo.daily.co/{uuid.uuid4().hex[:12]}"}


@router.post("/sessions/{sid}/join")
def join(sid: str):
    return {"session_id": sid, "joined": True}


@router.post("/sessions/{sid}/end")
def end(sid: str):
    return {"session_id": sid, "ended": True, "summary": "Session completed. Summary will appear in Records."}
