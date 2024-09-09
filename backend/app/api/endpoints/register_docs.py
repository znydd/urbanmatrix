from fastapi import APIRouter, HTTPException, Depends, Form, UploadFile
from app.db.databse import get_db
from app.utils.security import get_current_user
from app.schema.admin import CreateBirthCert
from typing import Annotated
from pydantic import EmailStr
import os
from datetime import date
import uuid


router = APIRouter()

@router.post("/birthcert")
async def brith_cert_req(name: Annotated[str,Form()],
                         father: Annotated[str,Form()],
                         mother: Annotated[str,Form()],
                         address: Annotated[str,Form()],
                         dob: Annotated[date,Form()],
                         file: UploadFile,
                         db = Depends(get_db),
                         current_user: dict = Depends(get_current_user)
                         ):
    
    user_id = current_user["id"]
    req_id = uuid.uuid4()
    
    UPLOAD_DIR = "req_files/birth_cert"
    os.makedirs(UPLOAD_DIR, exist_ok=True)
    
    file_extension = os.path.splitext(file.filename)[1]
    unique_filename = f"{str(req_id)}_{user_id}_req_doc{file_extension}"    
    
    file_path = os.path.join(UPLOAD_DIR, unique_filename)
    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())
    
    cursor = db.cursor()
    cursor.execute("INSERT INTO birth_request (user_id, req_id, doc_path, name, father, mother, dob, address) VALUES (%s, %s, %s, %s, %s, %s, %s, %s) RETURNING req_id",
                   (current_user['id'], str(req_id), file_path, name, father, mother, dob, address))
    resp_req_id = cursor.fetchone()[0]
    db.commit()
    cursor.close()
    
    return {"request ID": resp_req_id}



@router.post("/nid")
async def nid_req(name: Annotated[str,Form()],
                father: Annotated[str,Form()],
                mother: Annotated[str,Form()],
                email: Annotated[EmailStr,Form()],
                dob: Annotated[date,Form()],
                birth_cert_no: Annotated[str,Form()],
                address: Annotated[str,Form()],
                file: UploadFile,
                db = Depends(get_db),
                current_user: dict = Depends(get_current_user)
                ):
    print(email)
    cursor = db.cursor()
    cursor.execute("SELECT email FROM nid WHERE email = %s", (email,))
    email_ck = cursor.fetchone()
    if email_ck:
        cursor.close()
        return {'msg': "exist for this email"}
    else:
        user_id = current_user["id"]
        req_id = uuid.uuid4()

        UPLOAD_DIR = "req_files/nid"
        os.makedirs(UPLOAD_DIR, exist_ok=True)

        file_extension = os.path.splitext(file.filename)[1]
        unique_filename = f"{str(req_id)}_{user_id}_req_doc{file_extension}"    

        file_path = os.path.join(UPLOAD_DIR, unique_filename)
        with open(file_path, "wb") as buffer:
            buffer.write(await file.read())

        cursor = db.cursor()
        cursor.execute("INSERT INTO nid_request (user_id, req_id, doc_path, name, father, mother, email, dob, birth_cert_no, address) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING req_id",
                       (current_user['id'], str(req_id), file_path, name, father, mother, email, dob, birth_cert_no, address))
        resp_req_id = cursor.fetchone()[0]
        db.commit()
        cursor.close()        
        print(name)
        print(father)
        return {"request ID": resp_req_id}
    
    
    


@router.post("/deathcert")
async def death_cert_req(name: Annotated[str,Form()],
                        father: Annotated[str,Form()],
                        mother: Annotated[str,Form()],
                        dod: Annotated[date,Form()],
                        birth_cert_no: Annotated[str,Form()],
                        address: Annotated[str,Form()],
                        file: UploadFile,
                        db = Depends(get_db),
                        current_user: dict = Depends(get_current_user)
                        ):
    cursor = db.cursor()
    cursor.execute("SELECT birth_cert_no FROM death_certificate WHERE birth_cert_no = %s", (birth_cert_no,))
    exist_ck = cursor.fetchone()
    if exist_ck:
        cursor.close()
        return {"msg": "death certificate already exists"}
    else:
        user_id = current_user["id"]
        req_id = uuid.uuid4()

        UPLOAD_DIR = "req_files/death_cert"
        os.makedirs(UPLOAD_DIR, exist_ok=True)

        file_extension = os.path.splitext(file.filename)[1]
        unique_filename = f"{str(req_id)}_{user_id}_req_doc{file_extension}"    

        file_path = os.path.join(UPLOAD_DIR, unique_filename)
        with open(file_path, "wb") as buffer:
            buffer.write(await file.read())

        cursor = db.cursor()
        cursor.execute("INSERT INTO death_request (user_id, req_id, doc_path, name, father, mother, dod, birth_cert_no, address) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING req_id",
                       (current_user['id'], str(req_id), file_path, name, father, mother, dod, birth_cert_no, address))
        resp_req_id = cursor.fetchone()[0]
        db.commit()
        cursor.close()        
        print(name)
        print(father)
        return {"request ID": resp_req_id} 