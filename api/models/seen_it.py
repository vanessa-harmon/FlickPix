from pydantic import BaseModel


class SeenItOut(BaseModel):
    id: int
    title: str
    synopsis: str
    actors: str
    backdrop_img: str
    poster_img: str
    account_id: int


class SeenItIn(BaseModel):
    title: str
    synopsis: str
    actors:str
    backdrop_img: str
    poster_img: str
    account_id: int

class DuplicateSeenItError(ValueError):
    pass
