from pydantic import BaseModel


class SeenItIn(BaseModel):
    title: str
    synopsis: str
    actors: str
    backdrop_img: str
    poster_img: str
    account_id: int
