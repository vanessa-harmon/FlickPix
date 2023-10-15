from pydantic import BaseModel
from typing import List


class WatchLaterIn(BaseModel):
    title: str
    synopsis: str
    actors: str
    backdrop_img: str
    poster_img: str
    account_id: int


class WatchLaterItem(BaseModel):
    title: str
    synopsis: str
    actors: str
    backdrop_img: str
    poster_img: str
    account_id: int


class WatchLaterOut(BaseModel):
    items: List[WatchLaterItem]
