from fastapi import FastAPI
from app.auth.routes import router as auth_router
from app.users.routes import router as user_router

app = FastAPI(title="API com JWT e Modularização")

app.include_router(auth_router, prefix="/auth", tags=["Auth"])
app.include_router(user_router, prefix="/users", tags=["Users"])
