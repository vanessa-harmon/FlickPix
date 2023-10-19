from fastapi import APIRouter, Depends, Response, Request, HTTPException, status, Query
from queries.seen_it import SeenItQueries
from models.seen_it import SeenItIn, SeenItOut
from authenticator import authenticator


router = APIRouter()


@router.post("/api/seen_it", response_model=SeenItIn)
async def create_seen_it(
    data: SeenItIn,
    request: Request,
    response: Response,
    seen_it_queries: SeenItQueries = Depends(),
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


@router.get("/api/seen_it", response_model=SeenItOut)
async def get_seen_it(
    request: Request,
    seen_it_queries: SeenItQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    try:
        account_id = account_data['id']
        print("ACCOUNT ID:          ", account_id)
        seen_it = seen_it_queries.get(account_id)
        return seen_it
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Could not get record for this account",
        )


# @router.delete("/api/seen_it")
# async def delete_seen_it(
#     title: str,
#     seen_it_queries: SeenItQueries = Depends(),
#     account_data: dict = Depends(authenticator.get_current_account_data)
# ):
#     account_id = account_data['id']
#     seen_it_delete = seen_it_queries.delete(title, account_id)
#     if seen_it_delete:
#         return "Item was deleted"
#     else:
#         return "Item could not be deleted"

@router.delete("/api/seen_it")
async def delete_seen_it(
    title: str = Query(..., description="Title of deleted movie"),
    seen_it_queries: SeenItQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    account_id = account_data['id']
    seen_it_delete = seen_it_queries.delete(title, account_id)
    if seen_it_delete:
        return "Item was deleted"
    else:
        return "Item could not be deleted"
