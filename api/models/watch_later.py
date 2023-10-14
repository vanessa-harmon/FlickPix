from pydantic import BaseModel


class WatchLaterIn(BaseModel):
    title: str
    synopsis: str
    actors: str
    backdrop_img: str
    poster_img: str
    account_id: int
