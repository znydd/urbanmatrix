from typing import Union
from fastapi import FastAPI

app = FastAPI()

app.include_router()

@app.get("/")
def hello():
    return {"hello": "brothers"}