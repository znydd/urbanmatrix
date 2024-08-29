from pydantic import BaseModel, EmailStr

class UserInfo(BaseModel):
    name: str
    email: EmailStr
    birth_cert: str | None
    nid: str | None
    bidder: bool
