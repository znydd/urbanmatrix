from fastapi import APIRouter, HTTPException, Depends
from app.db.databse import get_db
from app.utils.security import get_current_user

router = APIRouter()

@router.post("/birthcert/{birth_cert_no}")
async def add_birth_certificate(birth_cert_no: str,  db = Depends(get_db), current_user: dict = Depends(get_current_user)):

    cursor = db.cursor()
    cursor.execute("INSERT INTO user_birth_junc (birth_cert_no, user_id) VALUES (%s, %s) RETURNING user_id",
                   (int(birth_cert_no), current_user['id']))
    user_id = cursor.fetchone()[0]
    db.commit()
    cursor.close()
    if not user_id:
        raise HTTPException(status_code=500)
    return user_id

    
@router.post("/deathcert/{death_cert_no}")
async def add_death_certificate(death_cert_no: str,  db = Depends(get_db), current_user: dict = Depends(get_current_user)):
    cursor = db.cursor()
    cursor.execute("INSERT INTO user_death_junc (death_cert_no, user_id) VALUES (%s, %s) RETURNING user_id",
                   (int(death_cert_no), current_user['id']))
    user_id = cursor.fetchone()[0]
    db.commit()
    cursor.close()
    if not user_id:
        raise HTTPException(status_code=500)
    return user_id
