from fastapi import APIRouter, HTTPException, Depends
from app.db.databse import get_db
from app.utils.security import get_current_user


router = APIRouter()


# Electricity bill
@router.get("/electricity")
async def get_create_user_bill(db = Depends(get_db),current_user: dict = Depends(get_current_user)):
    user_id = current_user['id']
    cursor = db.cursor()
    cursor.execute("SELECT user_id FROM electricity_bill WHERE user_id = %s", (int(user_id),))
    electricity_user = cursor.fetchone()
    
    print(electricity_user)
    if electricity_user:
        print("ase")
        cursor.execute("SELECT * FROM electricity_bill WHERE user_id = %s", (int(user_id),))
        user_bill_info = cursor.fetchone()
        print(user_bill_info)
    else:
        print("nai create one")
        cursor.execute("INSERT INTO electricity_bill (user_id, month_string) VALUES (%s, %s) RETURNING *", (int(user_id), "000000000000"))
        user_bill_info = cursor.fetchone()
        db.commit()
    cursor.close()
    
    bill_info_dict = {
        "id": user_bill_info[0],
        "monthString": user_bill_info[2],
        "bill": 1236
    }
    
    return bill_info_dict


@router.post("/electricitypay/{month}")
async def pay_bill_per_month(month: str, db = Depends(get_db),current_user: dict = Depends(get_current_user)):
    user_id = int(current_user['id'])
    
    month_dict = {
        "January": 1,
        "February": 2,
        "March": 3,
        "April": 4,
        "May": 5,
        "June": 6,
        "July": 7,
        "August": 8,
        "September": 9,
        "October": 10,
        "November": 11,
        "December": 12
    }
    
    if month_dict[month] > 12:
        return {"msg": "month can't be >12"}
    
    month_idx = month_dict[month]-1
    print(month_idx)
    cursor = db.cursor()
    cursor.execute("SELECT month_string FROM electricity_bill WHERE user_id = %s", (user_id,))
    month_string = cursor.fetchone()[0]
    
    if month_string[month_idx] == "1":
        return {"msg": "ALready paid"}
    
    month_string = month_string[:month_idx]+"1"+month_string[month_idx+1:]
    cursor.execute("UPDATE electricity_bill SET month_string = %s WHERE user_id = %s RETURNING month_string", (month_string, user_id ))
    updated_month_string = cursor.fetchone()[0]
    db.commit()
    cursor.close()
    print(month_string)    
    
    return updated_month_string


# Gas bill
@router.get("/gas")
async def get_create_user_bill(db = Depends(get_db),current_user: dict = Depends(get_current_user)):
    user_id = current_user['id']
    cursor = db.cursor()
    cursor.execute("SELECT user_id FROM gas_bill WHERE user_id = %s", (int(user_id),))
    gas_user = cursor.fetchone()
    
    print(gas_user)
    if gas_user:
        print("ase")
        cursor.execute("SELECT * FROM gas_bill WHERE user_id = %s", (int(user_id),))
        user_bill_info = cursor.fetchone()
        print(user_bill_info)
    else:
        print("nai create one")
        cursor.execute("INSERT INTO gas_bill (user_id, month_string) VALUES (%s, %s) RETURNING *", (int(user_id), "000000000000"))
        user_bill_info = cursor.fetchone()
        db.commit()
    cursor.close()
    
    bill_info_dict = {
        "id": user_bill_info[0],
        "monthString": user_bill_info[2],
        "bill": 950
    }
    
    return bill_info_dict


@router.post("/gaspay/{month}")
async def pay_bill_per_month(month: str, db = Depends(get_db),current_user: dict = Depends(get_current_user)):
    user_id = int(current_user['id'])
    
    month_dict = {
        "January": 1,
        "February": 2,
        "March": 3,
        "April": 4,
        "May": 5,
        "June": 6,
        "July": 7,
        "August": 8,
        "September": 9,
        "October": 10,
        "November": 11,
        "December": 12
    }
    
    if month_dict[month] > 12:
        return {"msg": "month can't be >12"}
    
    month_idx = month_dict[month]-1
    print(month_idx)
    cursor = db.cursor()
    cursor.execute("SELECT month_string FROM gas_bill WHERE user_id = %s", (user_id,))
    month_string = cursor.fetchone()[0]
    
    if month_string[month_idx] == "1":
        return {"msg": "ALready paid"}
    
    month_string = month_string[:month_idx]+"1"+month_string[month_idx+1:]
    cursor.execute("UPDATE gas_bill SET month_string = %s WHERE user_id = %s RETURNING month_string", (month_string, user_id ))
    updated_month_string = cursor.fetchone()[0]
    db.commit()
    cursor.close()
    print(month_string)    
    
    return updated_month_string



# Water bill
@router.get("/water")
async def get_create_user_bill(db = Depends(get_db),current_user: dict = Depends(get_current_user)):
    user_id = current_user['id']
    cursor = db.cursor()
    cursor.execute("SELECT user_id FROM water_bill WHERE user_id = %s", (int(user_id),))
    water_user = cursor.fetchone()
    
    print(water_user)
    if water_user:
        print("ase")
        cursor.execute("SELECT * FROM water_bill WHERE user_id = %s", (int(user_id),))
        user_bill_info = cursor.fetchone()
        print(user_bill_info)
    else:
        print("nai create one")
        cursor.execute("INSERT INTO water_bill (user_id, month_string) VALUES (%s, %s) RETURNING *", (int(user_id), "000000000000"))
        user_bill_info = cursor.fetchone()
        db.commit()
    cursor.close()
    
    bill_info_dict = {
        "id": user_bill_info[0],
        "monthString": user_bill_info[2],
        "bill": 825
    }
    
    return bill_info_dict


@router.post("/waterpay/{month}")
async def pay_bill_per_month(month: str, db = Depends(get_db),current_user: dict = Depends(get_current_user)):
    user_id = int(current_user['id'])
    
    month_dict = {
        "January": 1,
        "February": 2,
        "March": 3,
        "April": 4,
        "May": 5,
        "June": 6,
        "July": 7,
        "August": 8,
        "September": 9,
        "October": 10,
        "November": 11,
        "December": 12
    }
    
    if month_dict[month] > 12:
        return {"msg": "month can't be >12"}
    
    month_idx = month_dict[month]-1
    print(month_idx)
    cursor = db.cursor()
    cursor.execute("SELECT month_string FROM water_bill WHERE user_id = %s", (user_id,))
    month_string = cursor.fetchone()[0]
    
    if month_string[month_idx] == "1":
        return {"msg": "ALready paid"}
    
    month_string = month_string[:month_idx]+"1"+month_string[month_idx+1:]
    cursor.execute("UPDATE water_bill SET month_string = %s WHERE user_id = %s RETURNING month_string", (month_string, user_id ))
    updated_month_string = cursor.fetchone()[0]
    db.commit()
    cursor.close()
    print(month_string)    
    
    return updated_month_string
