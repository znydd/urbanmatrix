from fastapi import APIRouter
from app.api.endpoints import auth, user, admin

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(user.router, prefix="/user", tags=["user"])


# Admin route
api_router.include_router(admin.router, prefix="/admin", tags=["admin"])