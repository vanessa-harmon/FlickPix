from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
import requests
import os
import json
from keys.keys import TMDB_API_KEY
import random

router = APIRouter()

@router.get('/trending')
async def trending_movie_list():
    url = "https://api.themoviedb.org/3/trending/movie/day?language=en-US&region=United%20States"
    headers = {
        "accept": "applications/json",
        "Authorization": TMDB_API_KEY
    }
    response = requests.get(url, headers=headers)
    movie_info = json.loads(response.content)
    print("MOVIE INFO:    ", movie_info['results'][0])
    return (
        movie_info
    )


@router.get("/popular")
async def popular_movie_list():
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
async def latest_movie_list():
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
async def movie_details(movie_id: int):
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
async def movie_recommendations(movie_id: int):
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
async def movie_providers(movie_id: int):
    url = f'https://api.themoviedb.org/3/movie/{movie_id}/watch/providers'
    headers = {
        "accept": "applications/json",
        "Authorization": TMDB_API_KEY
    }
    response = requests.get(url, headers=headers)
    return (
        json.loads(response.content)
    )


@router.get('/genre')
async def movie_genres(genre_id: int):
    url = f'https://api.themoviedb.org/3/discover/movie?include_adult=false&language=en-US&with_genres={genre_id}'
    headers = {
        "accept": "applications/json",
        "Authorization": TMDB_API_KEY
    }
    response = requests.get(url, headers=headers)
    return (
        json.loads(response.content)
    )


@router.get('/credits')
async def movie_credits(movie_id: int):
    url = f'https://api.themoviedb.org/3/movie/{movie_id}/credits?language=en-US'
    headers = {
        "accept": "applications/json",
        "Authorization": TMDB_API_KEY
    }
    response = requests.get(url, headers=headers)
    return (
        json.loads(response.content)
    )


@router.get('/random')
async def random_item():
    rand_idx = random.randint(0, 1)
    choice_list = ['movie', 'tv']
    movie_tv_selector = choice_list[rand_idx]
    page = random.randint(1, 500)
    url = f"https://api.themoviedb.org/3/discover/{movie_tv_selector}?include_adult=false&language=en-US&page={page}&watch_region=US"
    headers = {
        "accept": "applications/json",
        "Authorization": TMDB_API_KEY
    }
    response = requests.get(url, headers=headers)
    json_response = json.loads(response.content)
    items = json_response['results']
    items_idx = random.randint(0, len(items) - 1)
    return (
        items[items_idx]
    )
