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


class UserCreate(BaseModel):
    username: str
    name: str


class UserReturn(BaseModel):
    id: int
    username: str
    name: str


class UserList(BaseModel):
    id: int
    username: str
    name: str

    class Config:
        orm_mode = True


class UserDB(BaseModel):
    id: int
    username: str
    name: str
    state: str

    class Config:
        orm_mode = True


### CHATS ###

class ChatCreate(BaseModel):
    other_id: int
    me_id: int

class ChatReturn(BaseModel):
    id: int
    user1: int
    user2: int

    class Config:
        orm_mode = True
