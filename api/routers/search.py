from fastapi import APIRouter, Query
import requests
import os
import json


router = APIRouter()

TMDB_API_KEY = os.environ["TMDB_API_KEY"]


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
