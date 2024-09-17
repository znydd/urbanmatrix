from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from app.api.router import api_router
from app.db.databse import get_db
from app.utils.security import get_current_user

from fastapi.responses import FileResponse

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#for testing
@app.get("/istokenvalid")
def read_items(current_user: dict = Depends(get_current_user)):
    return {"msg":"valid"}


app.include_router(api_router, prefix="/api")
