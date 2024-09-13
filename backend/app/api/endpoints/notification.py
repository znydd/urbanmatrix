from fastapi import APIRouter, HTTPException, Depends
from app.db.databse import get_db
from app.utils.security import get_current_user



router = APIRouter()


@router.post("/notification")
async def push_notification(msg: str, db = Depends(get_db), current_user: dict = Depends(get_current_user)):
    user_id = current_user['id']
    
    cursor = db.cursor()
    cursor.execute("INSERT INTO user_notification (user_id, msg) VALUES (%s, %s) RETURNING msg_id", (user_id, msg,))
    msg_id = cursor.fetchone()[0]
    db.commit()
    cursor.close()
    
    return msg_id


@router.get("/shownotification")
async def push_notification(db = Depends(get_db), current_user: dict = Depends(get_current_user)):
    user_id = current_user['id']
    cursor = db.cursor()
    
    cursor.execute("SELECT msg FROM user_notification WHERE user_id = %s", (user_id,))
    msg_list = cursor.fetchall()
    cursor.close()
    msg_dict = [msg[0] for msg in msg_list]
    
    print(msg_dict)
    return msg_dict