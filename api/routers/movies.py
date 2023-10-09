from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
import requests
import os
import json
from keys.keys import TMDB_API_KEY

router = APIRouter()

@router.get('/trending')
def trending_movie_list():
    url = "https://api.themoviedb.org/3/trending/movie/day?language=en-US"
    headers = {
        "accept": "applications/json",
        "Authorization": TMDB_API_KEY
    }
    response = requests.get(url, headers=headers)
    return (
        json.loads(response.content)
    )


@router.get("/popular")
def popular_movie_list():
    url = "https://api.themoviedb.org/3/movie/popular?language=en-US"
    headers = {
        "accept": "applications/json",
        "Authorization": TMDB_API_KEY
    }
    response = requests.get(url, headers=headers)
    return (
        json.loads(response.content)
    )


@router.get('/latest')
def latest_movie_list():
    url = "https://api.themoviedb.org/3/movie/now_playing?language=en-US"
    headers = {
        "accept": "applications/json",
        "Authorization": TMDB_API_KEY
    }
    response = requests.get(url, headers=headers)
    return (
        json.loads(response.content)
    )


@router.get('/details/')
def movie_details(movie_id: int):
    url = f'https://api.themoviedb.org/3/movie/{movie_id}?language=en-US'
    headers = {
        "accept": "applications/json",
        "Authorization": TMDB_API_KEY
    }
    response = requests.get(url, headers=headers)
    return (
        json.loads(response.content)
    )


@router.get('/recommendations')
def movie_recommendations(movie_id: int):
    url = f'https://api.themoviedb.org/3/movie/{movie_id}/recommendations?language=en-US'
    headers = {
        "accept": "applications/json",
        "Authorization": TMDB_API_KEY
    }
    response = requests.get(url, headers=headers)
    return (
        json.loads(response.content)
    )


@router.get('/providers')
def movie_providers(movie_id: int):
    url = f'https://api.themoviedb.org/3/movie/{movie_id}/watch/providers'
    headers = {
        "accept": "applications/json",
        "Authorization": TMDB_API_KEY
    }
    response = requests.get(url, headers=headers)
    return (
        json.loads(response.content)
    )
