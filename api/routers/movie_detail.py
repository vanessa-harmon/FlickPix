from fastapi import APIRouter
import requests
import json
import os


router = APIRouter()

TMDB_API_KEY = os.environ.get("TMDB_API_KEY")


@router.get("/{movie_id}")
def movie_detail(movie_id: int):
    url = f"https://api.themoviedb.org/3/movie/{movie_id}?language=en-US"

    headers = {
        "accept": "application/json",
        "Authorization": TMDB_API_KEY
    }

    response = requests.get(url, headers=headers)
    movie_data = json.loads(response.content)

    movie_details = {
        "title": movie_data.get("original_title"),
        "imdb_link": movie_data.get("imdb_id"),
        "year_produced": movie_data.get("release_date"),
        "synopsis": movie_data.get("overview"),
        "poster": movie_data.get("poster_path"),
        "ratings": movie_data.get("vote_average"),
    }

    service_providers = movie_providers(movie_id)
    cast_list = movie_cast(movie_id)

    movie_details["service_providers"] = service_providers
    movie_details["cast_list"] = cast_list

    return movie_details


@router.get('/providers')
def movie_providers(movie_id: int):
    url = f'https://api.themoviedb.org/3/movie/{movie_id}/watch/providers'
    headers = {
        "accept": "application/json",
        "Authorization": TMDB_API_KEY
    }
    response = requests.get(url, headers=headers)
    providers_data = json.loads(response.content)

    us_providers = []

    if "results" in providers_data and "US" in providers_data["results"]:
        us_providers = providers_data["results"]["US"]

    return us_providers


@router.get('/credits')
def movie_cast(movie_id: int):
    url = f'https://api.themoviedb.org/3/movie/{movie_id}/credits'
    headers = {
        "accept": "application/json",
        "Authorization": TMDB_API_KEY
    }
    response = requests.get(url, headers=headers)
    cast_data = json.loads(response.content)

    actors = []

    if "cast" in cast_data:
        actors = cast_data["cast"]

    return actors
