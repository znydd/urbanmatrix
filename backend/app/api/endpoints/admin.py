from fastapi import APIRouter, Depends, HTTPException
from app.schema.admin import CreateBirthCert, BirthCert, CreateNid, Nid, CreateDeathCert, DeathCert
from app.db.databse import get_db
from app.service.create_nid_card import create_nid_card
from app.service.create_birth_cert import create_birth_certificate
from app.service.create_death_cert import create_death_certificate
from app.utils.security import get_current_user
import os


router = APIRouter()


@router.post('/createbirthcert', response_model=BirthCert)
async def create_birth_cert(user_info: CreateBirthCert, db = Depends(get_db), current_user: dict = Depends(get_current_user)):

    with db.cursor() as cursor:
        cursor.execute("SELECT birth_count FROM unique_count")
        birth_count = cursor.fetchone()
        user_info = BirthCert(              
            name=user_info.name,
            father=user_info.father,
            mother=user_info.mother,
            dob=user_info.dob,
            address=user_info.address,
            birth_cert_no=f"{birth_count[0]}"
        )
        file_path = await create_birth_certificate(user_info)
        cursor.execute("INSERT INTO birth_certificate (birth_cert_no, name, file) VALUES (%s, %s, %s)", (birth_count[0], user_info.name, file_path))
        cursor.execute("UPDATE unique_count SET birth_count = birth_count + 1")
        db.commit()
        cursor.close()
        
    print(file_path)
    return user_info



@router.post('/createnid', response_model=Nid)
async def create_nid(user_info: CreateNid, db = Depends(get_db), current_user: dict = Depends(get_current_user)):
    
    cursor = db.cursor()
    cursor.execute("SELECT birth_cert_no FROM nid WHERE birth_cert_no = (%s)",(int(user_info.birth_cert_no),))
    birth_cert_ck = cursor.fetchone()

    if birth_cert_ck:
        cursor.close()
        raise HTTPException(status_code=409, detail="Birth cert number already exist")
    else:
        cursor.execute("SELECT nid_count FROM unique_count")
        nid_count = cursor.fetchone()
        user_info = Nid(              
            name=user_info.name,
            father=user_info.father,
            mother=user_info.mother,
            email=user_info.email,
            dob=user_info.dob,
            birth_cert_no=user_info.birth_cert_no,
            address=user_info.address,
            nid_no=f"{nid_count[0]}"
        )
        file_path = await create_nid_card(user_info)
        cursor.execute("INSERT INTO nid (nid_no, name, email, file, birth_cert_no) VALUES (%s, %s, %s, %s, %s)",
                       (nid_count[0], user_info.name, user_info.email, file_path, int(user_info.birth_cert_no)))
        cursor.execute("UPDATE unique_count SET nid_count = nid_count + 1")
        db.commit()
        cursor.close()

        print(file_path)
        return user_info



@router.post('/createdeathcert', response_model=DeathCert)
async def create_death_cert(user_info: CreateDeathCert, db = Depends(get_db), current_user: dict = Depends(get_current_user)):

    cursor = db.cursor()
    cursor.execute("SELECT birth_cert_no FROM death_certificate WHERE birth_cert_no = (%s)",(int(user_info.birth_cert_no),))
    birth_cert_ck = cursor.fetchone()

    
    if birth_cert_ck:
        cursor.close()
        raise HTTPException(status_code=409, detail="Birth cert number already exist")
    else:
        cursor.execute("SELECT death_count FROM unique_count")
        death_count = cursor.fetchone()
        user_info = DeathCert(              
            name=user_info.name,
            father=user_info.father,
            mother=user_info.mother,
            dod=user_info.dod,
            birth_cert_no=user_info.birth_cert_no,
            address=user_info.address,
            death_cert_no=f"{death_count[0]}"
        )
        file_path = await create_death_certificate(user_info)
        cursor.execute("INSERT INTO death_certificate (death_cert_no, name, file, birth_cert_no) VALUES (%s, %s, %s, %s)",
                       (death_count[0], user_info.name, file_path, int(user_info.birth_cert_no)))
        cursor.execute("UPDATE unique_count SET death_count = death_count + 1")
        db.commit()
        cursor.close()

        print(file_path)
        return user_info


@router.get("/allregreq")
async def get_all_reg_req(db = Depends(get_db)):
    
    cursor = db.cursor()
    cursor.execute("SELECT * FROM birth_request")
    birth_req_form = cursor.fetchall()
    birth_req_dict = [{"doc_type":"Birth Certificate",
                       "req_id":req_form[1],
                       "status":req_form[2],
                       "file_path":req_form[3],
                       "name":req_form[4],
                       "father":req_form[5],
                       "mother":req_form[6],
                       "dob":req_form[7],
                       "address":req_form[8]}
                      for req_form in birth_req_form]
    
    
    
    cursor.execute("SELECT * FROM nid_request")
    nid_req_form = cursor.fetchall()
    nid_req_dict = [{"doc_type":"NID",
                     "req_id":req_form[1],
                     "status":req_form[2],
                     "file_path":req_form[3],
                     "name":req_form[4],
                     "father":req_form[5],
                     "mother":req_form[6],
                     "email":req_form[7],
                     "dob":req_form[8],
                     "birth_cert_no":req_form[9],
                     "address":req_form[10]}
                    for req_form in nid_req_form]
    
    
    cursor.execute("SELECT * FROM death_request")
    death_req_form = cursor.fetchall()
    death_req_dict = [{"doc_type":"Death Certificate",
                       "req_id":req_form[1],
                       "status":req_form[2],
                       "file_path":req_form[3],
                       "name":req_form[4],
                       "father":req_form[5],
                       "mother":req_form[6],
                       "dod":req_form[7],
                       "birth_cert_no":req_form[8],
                       "address":req_form[9]}
                      for req_form in death_req_form]
        
    all_req_form = birth_req_dict+nid_req_dict+death_req_dict
    
    
    print(all_req_form)
    return all_req_form


@router.delete("/deletereq/{req_id_type}")
async def birth_reg_req(req_id_type: str, db = Depends(get_db)):
    print(req_id_type)
    param = req_id_type.split("<>")
    req_id = param[0]
    doc_type = param[1]
    print(req_id)
    print(doc_type)
    cursor = db.cursor()

    if(doc_type == "Birth Certificate"):
        cursor.execute("DELETE FROM birth_request WHERE req_id = %s RETURNING doc_path",(req_id,))
        birth_req = cursor.fetchone()
        os.remove(birth_req[0])
        db.commit()
        cursor.close()
    elif(doc_type == "NID"):
        cursor.execute("DELETE FROM nid_request WHERE req_id = %s RETURNING doc_path",(req_id,))
        nid_req = cursor.fetchone()
        os.remove(nid_req[0])
        db.commit()
        cursor.close()
    elif(doc_type == "Death Certificate"):
        cursor.execute("DELETE FROM death_request WHERE req_id = %s RETURNING doc_path",(req_id,))
        death_req = cursor.fetchone()
        os.remove(death_req[0])
        db.commit()
        cursor.close()

    return req_id