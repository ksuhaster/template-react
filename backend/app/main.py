import json

import redis
import uvicorn
from typing import List

from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from schemas import ItemAdd, ItemDB

app = FastAPI()

redis_db = redis.Redis(host='redis', port=6379, db=0, decode_responses=True)


@app.get("/")
def read_root():
    return {"Hello": "World"}


def get_next_index() -> str:
    i = 'item{}'.format(redis_db.incr('next_index'))
    return i


@app.post("/api/item", response_model=ItemAdd)
async def add_item(item_data: ItemAdd):
    i = get_next_index()
    redis_db.set(i, json.dumps(item_data.dict()))
    return item_data


@app.get("/api/items", response_model=List[ItemDB])
async def get_items():
    all_keys = redis_db.keys('item*')
    items: List[ItemDB] = []
    for i in all_keys:
        item_data = json.loads(redis_db.get(i))
        res = item_data.copy()
        res['id'] = i
        items.append(res)
    return items


@app.delete("/api/item/{id}")
async def delete_user(id: str):
    item_data = redis_db.get(id)
    if not item_data:
        return Response(status_code=404)
    redis_db.delete(id)
    return Response(status_code=200)
