import requests
from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from keys.keys import TMDB_API_KEY

router = APIRouter()

@router.get("/videos/{item_type}/{item_id}")
def get_videos(item_type: str, item_id: int):
    tmdb_url = f"https://api.themoviedb.org/3/{item_type}/{item_id}/videos"
    
    headers = {
        "accept": "applications/json",
        "Authorization": TMDB_API_KEY
    }
    response = requests.get(tmdb_url, headers=headers)

    if response.status_code == 200:
        videos = response.json()
        return {"videos": videos["results"]}
    else:
        return {"error": "Failed to fetch videos"}
