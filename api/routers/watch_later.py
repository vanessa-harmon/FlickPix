from fastapi import APIRouter, Depends, Response, Request, HTTPException, status
from queries.watch_later import WatchLaterQueries
from models.watch_later import WatchLaterIn
from authenticator import authenticator


router = APIRouter()


@router.post("/api/watch_later", response_model=WatchLaterIn)
async def create_seen_it(
    data: WatchLaterIn,
    request: Request,
    response: Response,
    seen_it_queries: WatchLaterQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        account_id = account_data['id']
        seen_it_id = seen_it_queries.create(data, account_id)
        return seen_it_id
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot add to Watch List",
        )
