from sqlalchemy import or_, and_

from sqlalchemy.orm import Session

from . import models, schemas


### ITEMS ###


def get_items(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Item).offset(skip).limit(limit).all()


def get_item(db: Session, item_id: int):
    return db.query(models.Item).filter(models.Item.id == item_id).first()


def create_item(db: Session, item: schemas.ItemCreate):
    db_item = models.Item(**item.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item


def delete_item(db: Session, item_id: int):
    db_item = db.query(models.Item).get(item_id)
    db.delete(db_item)
    db.commit()
    return db_item.id


### USERS ###


def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(
        username=user.username,
        name=user.name,
        state='online',
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def get_user(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()


def get_online_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).filter(models.User.state=='online').offset(skip).limit(limit).all()


### CHATS ###

def get_chat(db: Session, other_id: int, me_id: int):
    q = db.query(models.Chat)
    q = q.filter(
        or_(
            and_(models.Chat.user1 == other_id, models.Chat.user2 == me_id),
            and_(models.Chat.user1 == me_id, models.Chat.user2 == other_id),
        )
    )
    chat = q.first()
    print('get_chat chat:', chat)
    return chat


def create_chat(db: Session, other_id: int, me_id: int):
    db_item = models.Chat(
        user1=me_id,
        user2=other_id,
    )
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item


