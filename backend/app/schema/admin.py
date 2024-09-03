from pydantic import BaseModel, EmailStr
from datetime import date

class CreateBirthCert(BaseModel):
    name: str
    father: str
    mother: str
    dob: date
    address: str

class BirthCert(CreateBirthCert):
    birth_cert_no: int
    
class CreateNid(BaseModel):
    name: str
    father: str
    mother: str
    email: EmailStr
    dob: date
    birth_cert_no: str
    address: str

class Nid(CreateNid):
    nid_no: int
    

class CreateDeathCert(BaseModel):
    name: str
    father: str
    mother: str
    dod: date
    birth_cert_no: str
    address: str

class DeathCert(CreateDeathCert):
    death_cert_no: int