import uuid
from pydantic import BaseModel, EmailStr
from app.users.models import Role

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    name: str
    role: Role = Role.customer

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: uuid.UUID
    email: EmailStr
    name: str
    role: Role

class Config:
    from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"