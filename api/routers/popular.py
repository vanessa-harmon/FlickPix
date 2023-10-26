from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
import requests
import os
import json
import random

router = APIRouter()

TMDB_API_KEY = os.environ.get('API_KEY')

@router.get("/all")
async def popular_list():
    url = "https://api.themoviedb.org/3/trending/all/day?language=en-US"
    headers = {
        "accept": "applications/json",
        "Authorization": TMDB_API_KEY
    }
    response = requests.get(url, headers=headers)
    return (
        json.loads(response.content)
    )
