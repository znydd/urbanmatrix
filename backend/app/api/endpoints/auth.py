from fastapi import APIRouter

router = APIRouter()

@router.post("/login")
def login():
    return {"Hello":"from login"}

@router.post("/signup")
def signup():
    return {"Hello":"from signup"}