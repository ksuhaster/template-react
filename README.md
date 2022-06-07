Install npm packages:

```
docker compose run frontend npm install
```

Start project with fastapi, postgres, redis andd react:
```
docker compose up -d
```

You will see automatic FastAPI docs:
* http://localhost:8000/docs
* http://localhost:8000/redoc

And react project:
* http://localhost:3000