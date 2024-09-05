from fastapi import APIRouter, HTTPException, Depends
from app.db.databse import get_db
from app.utils.security import get_current_user
from fastapi.responses import FileResponse


router = APIRouter()

@router.get("/birthcert/{file_path}")
async def download_birth_cert(file_path: str, current_user: dict = Depends(get_current_user)):
    file_path = f"docsbucket/birth_certificate/{file_path}"
    print(file_path)
    return FileResponse(file_path, media_type="application/octet-stream", filename="nabil_bc.png")

@router.get("/deathcert/{file_path}")
async def download_birth_cert(file_path: str, current_user: dict = Depends(get_current_user)):
    file_path = f"docsbucket/death_certificate/{file_path}"
    print(file_path)
    return FileResponse(file_path, media_type="application/octet-stream", filename="nabil_bc.png")
