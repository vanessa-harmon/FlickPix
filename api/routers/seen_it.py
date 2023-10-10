from fastapi import APIRouter, Depends, Response, Request, HTTPException
from queries.seen_it import SeenItQueries
from models.seen_it import SeenItOut, SeenItIn
from routers.accounts import get_token

router = APIRouter()


@router.get("/api/seen-it", response_model=SeenItOut)
def get_seen_it(token: str = Depends(get_token)):
    try:
        account_id = get_token(token)
        seen_it_queries = SeenItQueries()
        seen_it_movies = seen_it_queries.get(account_id)
        return seen_it_movies
    except Exception:
        raise HTTPException(status_code=500, detail="Internal Server Error")


@router.post("/api/seen-it", response_model=SeenItIn)
async def create_seen_it(
    info: SeenItIn,
    request: Request,
    response: Response,
    seen_it: SeenItQueries = Depends()
):
    try:
        seen_it_movies = seen_it.create(info)
    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Internal Server Error"
        )
    return SeenItIn(seen_it_movies=seen_it_movies)
