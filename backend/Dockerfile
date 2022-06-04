FROM python:3.10

RUN mkdir /app

WORKDIR /app/

RUN apt-get update && apt-get install -y vim

COPY requirements.txt /app

RUN pip install -r requirements.txt

ENV PYTHONPATH=/app
