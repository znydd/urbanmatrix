from fastapi import APIRouter, HTTPException, Depends, Form, UploadFile
from app.db.databse import get_db
from app.utils.security import get_current_user
from app.schema.admin import CreateBirthCert
from typing import Annotated
import os



router = APIRouter()

@router.post("/birthcert")
async def brith_cert_req(name: Annotated[str,Form()],
                         father: Annotated[str,Form()],
                         mother: Annotated[str,Form()],
                         address: Annotated[str,Form()],
                         dob: Annotated[str,Form()],
                         file: UploadFile,
                         db = Depends(get_db),
                         current_user: dict = Depends(get_current_user)
                         ):

    # Todo -> write on db and save file with correct name  


    UPLOAD_DIR = "req_files/birth_cert"
    os.makedirs(UPLOAD_DIR, exist_ok=True)
    file_extension = os.path.splitext(file.filename)[1]
    unique_filename = f"image{file_extension}"    
    file_path = os.path.join(UPLOAD_DIR, unique_filename)
    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())
    
    return {"msg":"success"}

@router.post("/nid")
async def nid_req():
    pass


@router.post("/deathcert")
async def death_cert_req():
    pass