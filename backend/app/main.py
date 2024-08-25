from fastapi import FastAPI, Depends
from app.api.router import api_router
from fastapi.middleware.cors import CORSMiddleware
from app.db.databse import get_db

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# @app.get("/user")
# def read_items(db = Depends(get_db)):
#     with db.cursor() as cursor:
#         cursor.execute("SELECT * FROM users")
#         items = cursor.fetchall()
#     return items

app.include_router(api_router, prefix="/api")
