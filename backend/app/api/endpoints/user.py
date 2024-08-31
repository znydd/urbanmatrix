from fastapi import APIRouter, Depends
import json
from app.schema.user import UserInfo
from app.db.databse import get_db
from app.utils.security import get_current_user

router = APIRouter()


@router.get("/userinfo", response_model=UserInfo)
async def get_user_info(db = Depends(get_db), current_user: dict = Depends(get_current_user)):

    with db.cursor() as cursor:
        cursor.execute("SELECT name, email, birth_cert, nid, bidder FROM users WHERE user_id = %s", (current_user["id"],))
        user_info = cursor.fetchone()
        
    user_info_response = UserInfo(
        name= user_info[0],
        email= user_info[1],
        birth_cert= user_info[2],
        nid= user_info[3],
        bidder= user_info[4]
    )
    return user_info_response

