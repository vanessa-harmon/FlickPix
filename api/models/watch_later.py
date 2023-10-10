from pydantic import BaseModel


class WatchLaterOut(BaseModel):
    id: int
    title: str
    synopsis: str
    actors: str
    backdrop_img: str
    poster_img: str
    account_id: int

class DuplicateWatchLaterError(ValueError):
    pass
