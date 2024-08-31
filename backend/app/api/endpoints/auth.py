from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, status, Form
from fastapi.security import OAuth2PasswordRequestForm
from app.schema.auth import Token, UserCreate
from app.db.databse import get_db
from app.utils.security import verify_password, get_password_hash, create_access_token



router = APIRouter()


@router.post("/login", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db = Depends(get_db) ):
    
    with db.cursor() as cursor:
        cursor.execute("SELECT email, password FROM users WHERE email = %s", (form_data.username,))
        user = cursor.fetchone()
        cursor.close()
        print(user)
        if not user or not verify_password(form_data.password, user[1]):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect username or password",
                headers={"WWW-Authenticate": "Bearer"},
            )
        access_token = create_access_token(data={"sub": user[0]})
        
        print(access_token)
        
    return {"access_token": access_token, "token_type": "bearer"}



@router.post("/signup", response_model=Token)
async def signup(name: Annotated[str,Form()],
                 email: Annotated[str,Form()],
                 password: Annotated[str,Form()],
                 db= Depends(get_db)):
    
    user = UserCreate(name=name, email=email, password=password)
    print(name)
    
    with db.cursor() as cursor:        
        # Check if user already exists
        cursor.execute("SELECT email FROM users WHERE email = %s", (user.email,))
        if cursor.fetchone():
            raise HTTPException(status_code=400, detail="Email already registered")
        
        # Create new user
        hashed_password = get_password_hash(user.password)
        cursor.execute("INSERT INTO users (name, email, password) VALUES (%s, %s, %s) RETURNING user_id", 
                    (user.name, user.email, hashed_password))
        user_id = cursor.fetchone()[0]
        print(user_id)
        db.commit()
        cursor.close()
        access_token = create_access_token(data={"sub": user.email})
        
        print(access_token)
        
    return {"access_token": access_token, "token_type": "bearer"}
