"""Minimal JWT + password hashing helpers (dev-grade).

For production, follow NF-01: use argon2/bcrypt and rotate refresh tokens.
"""
import time
import hashlib
import hmac
import base64
import json

SECRET = "dev-secret-change-me"


def hash_password(password: str) -> str:
    # Dev-only: swap for passlib[bcrypt] / argon2 in production.
    return hashlib.sha256((SECRET + password).encode()).hexdigest()


def verify_password(password: str, hashed: str) -> bool:
    return hmac.compare_digest(hash_password(password), hashed)


def _b64(data: bytes) -> str:
    return base64.urlsafe_b64encode(data).decode().rstrip("=")


def create_token(sub: str, role: str, ttl: int = 3600) -> str:
    header = _b64(json.dumps({"alg": "HS256", "typ": "JWT"}).encode())
    payload = _b64(json.dumps({"sub": sub, "role": role, "exp": int(time.time()) + ttl}).encode())
    sig = _b64(hmac.new(SECRET.encode(), f"{header}.{payload}".encode(), hashlib.sha256).digest())
    return f"{header}.{payload}.{sig}"
