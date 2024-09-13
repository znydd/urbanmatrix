from fastapi import APIRouter, HTTPException, Depends
from app.db.databse import get_db
from app.utils.security import get_current_user
from fastapi.responses import FileResponse
from app.db.databse import get_db


router = APIRouter()

@router.get("/birthcert/{file_name}")
async def download_birth_cert(file_name: str, current_user: dict = Depends(get_current_user)):
    file_path = f"docsbucket/birth_certificate/{file_name}"
    print(file_path)
    return FileResponse(file_path, media_type="application/octet-stream", filename=f"{file_name}")

@router.get("/deathcert/{file_name}")
async def download_birth_cert(file_name: str, current_user: dict = Depends(get_current_user)):
    file_path = f"docsbucket/death_certificate/{file_name}"
    print(file_path)
    return FileResponse(file_path, media_type="application/octet-stream", filename=f"{file_name}")

@router.get("/nid")
async def download_nid_cert(db = Depends(get_db), current_user: dict = Depends(get_current_user)):
    email = current_user["email"]
    
    cursor = db.cursor()
    cursor.execute("SELECT file FROM nid WHERE email = %s", (email,))
    file_path = cursor.fetchone()[0]
    cursor.close()
    
    if not file_path:
        raise HTTPException(status_code=404, detail="No NID was found under this email")
    
    print(file_path)
    return FileResponse(file_path, media_type="application/octet-stream", filename="nid.png")


@router.get("/anydocs/{file_path}")
async def download_any_file(file_path: str, current_user: dict = Depends(get_current_user)):
    split = file_path.split("<>")
    file_path = split[0]+"/"+split[1]+"/"+split[2]
    return FileResponse(file_path, media_type="application/octet-stream", filename=f"{file_path.split("/")[2]}")
