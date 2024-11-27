from fastapi import APIRouter, HTTPException, Depends
from app.auth.jwt import create_access_token
from app.auth.schemas import Token, LoginData

router = APIRouter()

# Simulação de banco de dados
fake_users_db = {"user@example.com": {"password": "1234", "role": "admin"}}

@router.post("/login", response_model=Token)
def login(data: LoginData):
    user = fake_users_db.get(data.email)
    if not user or user["password"] != data.password:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_access_token({"sub": data.email, "role": user["role"]})
    return {"access_token": token, "token_type": "bearer"}
