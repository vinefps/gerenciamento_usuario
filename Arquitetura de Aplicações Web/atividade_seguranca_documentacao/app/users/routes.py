from fastapi import APIRouter, Depends
from app.auth.security import get_current_user

router = APIRouter()

@router.get("/users/me")
def get_me(user: dict = Depends(get_current_user)):
    return {"email": user["sub"], "role": user["role"]}
