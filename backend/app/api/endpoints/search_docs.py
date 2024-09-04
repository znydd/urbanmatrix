from fastapi import APIRouter, HTTPException, Depends
from app.schema.search_docs import BirthCertificate, BirthCertResp, DeathCertificate, DeathCertResp
from app.db.databse import get_db
from app.utils.security import get_current_user




router = APIRouter()


@router.post("/birthcert", response_model=BirthCertResp)
async def serach_birth_certificate(birth_cert_no: BirthCertificate, db = Depends(get_db),current_user: dict = Depends(get_current_user)):
    
    cursor = db.cursor()
    cursor.execute("SELECT birth_cert_no, name FROM birth_certificate WHERE birth_cert_no = (%s)", (int(birth_cert_no.birth_cert_no),))
    birth_cert = cursor.fetchone()
    if birth_cert:
        birth_cert_obj = BirthCertResp(
            birth_cert_no=birth_cert[0],
            name=birth_cert[1]
        )
        cursor.close()
        return birth_cert_obj
    else:
        raise HTTPException(status_code=404, detail="Birth Certificate no found")


@router.post("/deathcert", response_model=DeathCertResp)
async def serach_death_certificate(death_cert_no: DeathCertificate, db = Depends(get_db),current_user: dict = Depends(get_current_user)):
    
    cursor = db.cursor()
    cursor.execute("SELECT death_cert_no, name FROM death_certificate WHERE death_cert_no = (%s)", (int(death_cert_no.death_cert_no),))
    death_cert = cursor.fetchone()
    if death_cert:
        death_cert_obj = DeathCertResp(
            death_cert_no=death_cert[0],
            name=death_cert[1]
        )
        cursor.close()
        return death_cert_obj
    else:
        raise HTTPException(status_code=404, detail="Death Certificate no found")
