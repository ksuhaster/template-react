from sqlalchemy import Column, Integer, String, ForeignKey
from .database import Base


class Item(Base):
    __tablename__ = "item"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String, index=True)


class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, index=True, unique=True)
    name = Column(String, index=True)
    state = Column(String, index=True)


class Chat(Base):
    __tablename__ = "chat"

    id = Column(Integer, primary_key=True, index=True)
    # link = Column(String, index=True)
    user1 = Column(Integer, ForeignKey("user.id"))
    user2 = Column(Integer, ForeignKey("user.id"))


class Message(Base):
    __tablename__ = "message"

    id = Column(Integer, primary_key=True, index=True)
    chat_id = Column(Integer, ForeignKey("chat.id"))
    user_id = Column(Integer, ForeignKey("user.id"))
    text = Column(String, index=True)
