from fastapi import APIRouter
from app.api.endpoints import auth, user, admin, search_docs, download_docs, add_docs, saved_docs, register_docs, notification

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(user.router, prefix="/user", tags=["user"])
api_router.include_router(search_docs.router, prefix="/searchdocs", tags=["searchdocs"])
api_router.include_router(download_docs.router, prefix="/download", tags=["download"])
api_router.include_router(add_docs.router, prefix="/adddocs", tags=["adddocs"])
api_router.include_router(saved_docs.router, prefix="/saveddocs", tags=["saveddocs"])
api_router.include_router(register_docs.router, prefix="/registerdocs", tags=["registerdocs"])
api_router.include_router(notification.router, prefix="/user", tags=["user_notification"])


# Admin route
api_router.include_router(admin.router, prefix="/admin", tags=["admin"])