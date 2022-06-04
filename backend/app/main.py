import redis
import uvicorn
from typing import List

from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from schemas import S_User, S_UserData


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["POST", "GET", "DELETE"],
    allow_headers=["*"],
)

redis_db = redis.Redis(host='redis', port=6379, db=0, decode_responses=True)


@app.get("/")
def read_root():
    return {"Hello": "World"}


def compile_user(user_name, db_data: S_UserData) -> S_User:
    user: S_User = S_User(name=user_name, data={**db_data})
    return user


@app.post("/api/register-user", response_model=S_User)
async def register_user(user_data: S_User):
    redis_db.delete(user_data.name)
    redis_db.hmset(user_data.name, user_data.data.dict())
    db_data = redis_db.hgetall(user_data.name)
    print(db_data, type(db_data))
    response = compile_user(user_data.name, db_data)
    return response


@app.get("/api/load-user/{user_name}", response_model=S_User)
async def load_user(user_name: str):
    db_data = redis_db.hgetall(user_name)
    if not db_data:
        return Response(status_code=404)

    response = compile_user(user_name, db_data)
    return response


@app.get("/api/load-all-users", response_model=List[S_User])
async def load_all_users():
    all_keys = redis_db.keys()
    if not all_keys:
        return Response(status_code=404)

    users: List[S_User] = []
    for user_name in all_keys:
        db_user_data = redis_db.hgetall(user_name)
        compiled_user = compile_user(user_name, db_user_data)
        users.append(compiled_user)

    return sorted(users, key=lambda user: user.data.timestamp, reverse=True)


@app.delete("/api/reset-user/{user_name}", response_model=List[S_User])
async def reset_user(user_name: str):
    db_data = redis_db.hgetall(user_name)
    if not db_data:
        return Response(status_code=404)
    redis_db.delete(user_name)

    return Response(status_code=200)
