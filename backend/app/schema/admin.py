from pydantic import BaseModel, EmailStr

class CreateBirthCert(BaseModel):
    name: str
    father: str
    mother: str
    address: str

class BirthCert(CreateBirthCert):
    birth_cert_no: int