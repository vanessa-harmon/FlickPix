from fastapi import APIRouter, Depends, Response, Request, HTTPException
from queries.watch_later import WatchLaterQueries
from models.watch_later import WatchLaterOut, DuplicateWatchLaterError
from routers.accounts import get_token


router = APIRouter()


@router.get("/api/watch-later", response_model=WatchLaterOut)
def get_watch_later(token: str = Depends(get_token)):
    try:
        account_id = get_token(token)
        watch_later_queries = WatchLaterQueries()
        watch_later_movies = watch_later_queries.get(account_id)
        return watch_later_movies
    except Exception:
        raise HTTPException(status_code=500, detail="Internal Server Error")


@router.post("/api/watch-later", response_model=WatchLaterOut)
async def create_watch_later(
    info: WatchLaterOut,
    request: Request,
    response: Response,
    watch_later_list: WatchLaterQueries = Depends(),
):
    try:
        watch_later = watch_later_list.create(info)
    except DuplicateWatchLaterError:
        raise HTTPException(
            status_code=400,
            detail="Item has already been added to list"
        )
