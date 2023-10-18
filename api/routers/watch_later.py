from fastapi import APIRouter, Depends, Response, Request, HTTPException, status
from queries.watch_later import WatchLaterQueries
from models.watch_later import WatchLaterIn, WatchLaterOut
from authenticator import authenticator


router = APIRouter()


@router.post("/api/watch_later", response_model=WatchLaterIn)
async def create_watch_later(
    data: WatchLaterIn,
    request: Request,
    response: Response,
    watch_later_queries: WatchLaterQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        account_id = account_data['id']
        watch_later_id = watch_later_queries.create(data, account_id)
        print("watchlaterid:", watch_later_id)
        return watch_later_id
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot add to Watch List",
        )


@router.get("/api/watch_later", response_model=WatchLaterOut)
async def get_watch_later(
    request: Request,
    watch_later_queries: WatchLaterQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    try:
        account_id = account_data['id']
        print("ACCOUNT ID:    ", account_id)
        watch_later = watch_later_queries.get(account_id)
        print("WATCH LATER:           ", watch_later)
        return watch_later
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Could not get record for this account",
        )


@router.delete("/api/watch_later")
async def delete_watch_later(
    title: str,
    watch_later_queries: WatchLaterQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    account_id = account_data['id']
    watch_later_delete = watch_later_queries.delete(title, account_id)
    if watch_later_delete:
        return "Item was deleted."
    else:
        return "Item could not be deleted."
