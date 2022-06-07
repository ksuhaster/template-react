from typing import List

from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from .database import SessionLocal, engine
from . import crud, models, schemas

models.Base.metadata.create_all(bind=engine)

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["POST", "GET", "DELETE"],
    allow_headers=["*"],
)


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/api/items/", response_model=schemas.ItemDB)
def create_item_for_user(item: schemas.ItemCreate, db: Session = Depends(get_db)):
    return crud.create_item(db=db, item=item)


@app.delete("/api/items/{item_id}")
def delete_item(item_id: int, db: Session = Depends(get_db)):
    db_item = crud.get_item(db=db, id=item_id)
    if db_item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return crud.delete_item(db=db, item_id=item_id)


@app.get("/api/items/", response_model=List[schemas.ItemDB])
def get_items(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    items = crud.get_items(db, skip=skip, limit=limit)
    return items


### Redis command examples ###
# redis_db = redis.Redis(host='redis', port=6379, db=0, decode_responses=True)
# all_keys = redis_db.keys('item*')
# redis_db.incr('next_index')
# redis_db.set(i, json.dumps(item_data.dict()))
# item_data = redis_db.get(id)
# redis_db.delete(id)
