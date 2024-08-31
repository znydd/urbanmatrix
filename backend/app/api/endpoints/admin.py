from fastapi import APIRouter, Depends
from app.schema.admin import CreateBirthCert, BirthCert
from app.db.databse import get_db
from app.service.create_birth_cert import create_birth_certificate

router = router = APIRouter()


@router.post('/createbirthcert', response_model=BirthCert)
async def create_birth_cert(user_info: CreateBirthCert, db = Depends(get_db),):
    
    with db.cursor() as cursor:
        cursor.execute("SELECT birth_count FROM unique_count")
        birth_count = cursor.fetchone()
        user_info = BirthCert(              
            name=user_info.name,
            father=user_info.father,
            mother=user_info.mother,
            address=user_info.address,
            birth_cert_no=f"{birth_count[0]}"
        )
        file_path = await create_birth_certificate(user_info)
        cursor.execute("INSERT INTO birth_certificate (birth_cert_no, name, file) VALUES (%s, %s, %s)", (birth_count[0], user_info.name, file_path))
        cursor.execute("INSERT INTO unique_count (birth_count) VALUES (%s)",(birth_count[0]+1,))
        db.commit()
        cursor.close()
        
    print(file_path)
    return user_info