from pydantic import BaseModel


class ItemCreate(BaseModel):
    title: str
    description: str

class ItemDB(BaseModel):
    id: int
    title: str
    description: str

    class Config:
        orm_mode = True