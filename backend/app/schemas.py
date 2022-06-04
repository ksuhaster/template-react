from typing import Optional
from pydantic import BaseModel


class S_UserData(BaseModel):
    description: str
    public_msg: str
    timestamp: Optional[int]


class S_User(BaseModel):
    name: str
    data: S_UserData
