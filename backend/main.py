from fastapi import FastAPI
from pydantic import BaseModel
from datetime import datetime
from typing import List
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class Fuckup(BaseModel):
    timestamp: str
    description: str

fuckups: List[Fuckup] = []

@app.get("/fuckups")
def get_fuckups():
    return fuckups

@app.post("/fuckups")
def add_fuckup(description: str):
    f = Fuckup(timestamp=datetime.now().isoformat(), description=description)
    fuckups.append(f)
    return {"message": "Факап добавлен"}

@app.get("/count")
def count():
    return {"count": len(fuckups)}
