from fastapi import APIRouter
from app.api.endpoints import auth, user, admin, search_docs

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(user.router, prefix="/user", tags=["user"])
api_router.include_router(search_docs.router, prefix="/searchdocs", tags=["searchdocs"])


# Admin route
api_router.include_router(admin.router, prefix="/admin", tags=["admin"])