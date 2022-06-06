from typing import Optional
from pydantic import BaseModel


class ItemAdd(BaseModel):
    title: str
    description: str

class ItemDB(BaseModel):
    id: str
    title: str
    description: str
