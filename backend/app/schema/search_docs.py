from pydantic import BaseModel

class BirthCertificate(BaseModel):
    birth_cert_no: str | int

class BirthCertResp(BirthCertificate):
    name: str
    file: str


class DeathCertificate(BaseModel):
    death_cert_no: str | int

class DeathCertResp(DeathCertificate):
    name: str
    file: str