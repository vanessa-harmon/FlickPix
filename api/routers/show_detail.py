from fastapi import APIRouter
import requests
import json
import os

router = APIRouter()

TMDB_API_KEY = os.environ.get("TMDB_API_KEY")


@router.get("/{serie_id}")
def show_detail(serie_id: int):
    url = f"https://api.themoviedb.org/3/tv/{serie_id}?language=en-US"

    headers = {
        "accept": "application/json",
        "Authorization": f'Bearer {TMDB_API_KEY}'
    }

    response = requests.get(url, headers=headers)
    show_data = json.loads(response.content)

    show_details = {
        "title": show_data.get("name"),
        "year_produced": show_data.get("first_air_date"),
        "synopsis": show_data.get("overview"),
        "poster": show_data.get("poster_path"),
        "ratings": show_data.get("vote_average"),
    }

    service_providers = show_providers(serie_id)
    cast_list = show_cast(serie_id)

    show_details["service_providers"] = service_providers
    show_details["cast_list"] = cast_list

    return show_details


@router.get('/providers')
def show_providers(serie_id: int):
    url = f'https://api.themoviedb.org/3/tv/{serie_id}/watch/providers'
    headers = {
        "accept": "applications/json",
        "Authorization": f'Bearer {TMDB_API_KEY}'
    }
    response = requests.get(url, headers=headers)
    providers_data = json.loads(response.content)

    us_providers = []

    if "results" in providers_data and "US" in providers_data["results"]:
        us_providers = providers_data["results"]["US"]

    return us_providers


@router.get('/credits')
def show_cast(serie_id: int):
    url = f'https://api.themoviedb.org/3/tv/{serie_id}/credits'
    headers = {
        "accept": "application/json",
        "Authorization": f'Bearer {TMDB_API_KEY}'
    }
    response = requests.get(url, headers=headers)
    cast_data = json.loads(response.content)

    actors = []

    if "cast" in cast_data:
        actors = cast_data["cast"]

    return actors
