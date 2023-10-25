from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
import requests
import os
import json
from keys.keys import TMDB_API_KEY
import random

router = APIRouter()

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

