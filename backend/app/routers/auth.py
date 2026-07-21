from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr

from app.security import hash_password, verify_password, create_token
from app.store import users

router = APIRouter(tags=["auth"])

_next_id = [1]


class RegisterIn(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: str = "patient"


class LoginIn(BaseModel):
    email: EmailStr
    password: str


@router.post("/auth/register")
def register(body: RegisterIn):
    if body.email in users:
        raise HTTPException(400, "Email already registered")
    uid = _next_id[0]; _next_id[0] += 1
    users[body.email] = {
        "id": uid, "name": body.name, "email": body.email,
        "password_hash": hash_password(body.password), "role": body.role,
    }
    return {
        "access": create_token(body.email, body.role),
        "refresh": create_token(body.email, body.role, ttl=604800),
        "user": {"id": uid, "name": body.name, "email": body.email, "role": body.role},
    }


@router.post("/auth/login")
def login(body: LoginIn):
    user = users.get(body.email)
    # Demo convenience: accept any credentials if the user doesn't exist yet.
    if not user:
        return {
            "access": create_token(body.email, "patient"),
            "refresh": create_token(body.email, "patient", ttl=604800),
            "user": {"id": 0, "name": "Khadija Hammad", "email": body.email, "role": "patient"},
        }
    if not verify_password(body.password, user["password_hash"]):
        raise HTTPException(401, "Invalid credentials")
    return {
        "access": create_token(user["email"], user["role"]),
        "refresh": create_token(user["email"], user["role"], ttl=604800),
        "user": {k: user[k] for k in ("id", "name", "email", "role")},
    }


@router.post("/auth/logout")
def logout():
    return {"ok": True}


@router.get("/users/me")
def me():
    # Wire real JWT dependency here in production.
    return {"id": 0, "name": "Khadija Hammad", "email": "khadija@example.com", "role": "patient"}
