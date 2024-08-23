from typing import Union
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def hello():
    return {"hello": "brothers"}