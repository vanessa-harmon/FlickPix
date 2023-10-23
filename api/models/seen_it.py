from pydantic import BaseModel
from typing import List


class SeenItIn(BaseModel):
    title: str
    tmdb_id: int
    synopsis: str
    actors: str
    backdrop_img: str
    poster_img: str
    account_id: int


class SeenItItem(BaseModel):
    title: str
    tmdb_id: int
    synopsis: str
    actors: str
    backdrop_img: str
    poster_img: str
    account_id: int


class SeenItOut(BaseModel):
    items: List[SeenItItem]
