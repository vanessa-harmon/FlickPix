from fastapi import APIRouter
import requests
import json
from keys.keys import TMDB_API_KEY

router = APIRouter()


@router.get("/trending")
def trending_show_list():
    url = "https://api.themoviedb.org/3/trending/tv/day?language=en-US"
    headers = {
        "accept": "applications/json",
        "Authorization": TMDB_API_KEY
    }
    response = requests.get(url, headers=headers)
    return (
        json.loads(response.content)
    )


@router.get('/popular')
def popular_show_list():
    url = "https://api.themoviedb.org/3/tv/popular?language=en"
    headers = {
        "accept": "applications/json",
        "Authorization": TMDB_API_KEY
    }
    response = requests.get(url, headers=headers)
    return (
        json.loads(response.content)
    )


@router.get('/latest')
def latest_show_list():
    url = "https://api.themoviedb.org/3/tv/airing_today?language=en-US"
    headers = {
        "accept": "applications/json",
        "Authorization": TMDB_API_KEY
    }
    response = requests.get(url, headers=headers)
    return (
        json.loads(response.content)
    )


@router.get('/details')
def show_details(series_id: int):
    url = f'https://api.themoviedb.org/3/tv/{series_id}?language=en-US'
    headers = {
        "accept": "applications/json",
        "Authorization": TMDB_API_KEY
    }
    response = requests.get(url, headers=headers)
    return (
        json.loads(response.content)
    )


@router.get('/recommendations')
def show_recommendations(series_id: int):
    url = f'https://api.themoviedb.org/3/tv/{series_id}/recommendations?language=en-US'
    headers = {
        "accept": "applications/json",
        "Authorization": TMDB_API_KEY
    }
    response = requests.get(url, headers=headers)
    return (
        json.loads(response.content)
    )


@router.get('/providers')
def show_providers(series_id: int):
    url = f'https://api.themoviedb.org/3/tv/{series_id}/watch/providers'
    headers = {
        "accept": "applications/json",
        "Authorization": TMDB_API_KEY
    }
    response = requests.get(url, headers=headers)
    return (
        json.loads(response.content)
    )
