from fastapi import FastAPI, APIRouter, HTTPException, Query
import requests
import os
from fastapi.middleware.cors import CORSMiddleware
import json
from keys.keys import TMDB_API_KEY

router = APIRouter()


@router.get("/results")
def search(query: str = Query(..., description="Search query")):
    url = "https://api.themoviedb.org/3/search/multi"
    headers = {
        "accept": "application/json",
        "Authorization": TMDB_API_KEY
    }
    params = {
        "query": query,
        "api_key": TMDB_API_KEY
    }

    response = requests.get(url, params=params, headers=headers)
    return (
        json.loads(response.content)
    )
