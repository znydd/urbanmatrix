from fastapi import APIRouter, HTTPException, Depends
from app.db.databse import get_db
from app.utils.security import get_current_user

router = APIRouter()

@router.get("/alldocs")
async def saved_all_cert( db = Depends(get_db), current_user: dict = Depends(get_current_user)):
    user_id = current_user['id']
    
    cursor = db.cursor()
    birth_query = """
    SELECT DISTINCT bc.*
    FROM users u
    JOIN user_birth_junc j ON u.user_id = j.user_id
    JOIN birth_certificate bc ON j.birth_cert_no = bc.birth_cert_no
    WHERE u.user_id = %s"""
    cursor.execute(birth_query, (user_id,))
    saved_birth_certs = cursor.fetchall()
    
    death_query = """
    SELECT DISTINCT dc.*
    FROM users u
    JOIN user_death_junc j ON u.user_id = j.user_id
    JOIN death_certificate dc ON j.death_cert_no = dc.death_cert_no
    WHERE u.user_id = %s"""
    cursor.execute(death_query, (user_id,))
    saved_death_certs = cursor.fetchall()
    
    cursor.close()
    birth_obj_arr = [{"name": each_tpl[1], "no": each_tpl[0], "type": "Birth Certificate", "file_name": each_tpl[2].split("/")[2]} for each_tpl in saved_birth_certs]
    death_obj_arr = [{"name": each_tpl[1], "no": each_tpl[0], "type": "Death Certificate", "file_name": each_tpl[2].split("/")[2]} for each_tpl in saved_death_certs]


    return birth_obj_arr+death_obj_arr   
    

