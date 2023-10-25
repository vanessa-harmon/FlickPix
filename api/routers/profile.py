from fastapi import APIRouter, Depends, Response, Request, HTTPException, status, Body
from queries.profile import ProfileQueries
from models.profile import Profile
from authenticator import authenticator


router = APIRouter()


@router.post("/api/profile", response_model=Profile)
async def create_profile(
    data: Profile,
    request: Request,
    response: Response,
    profile_queries: ProfileQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        account_id = account_data['id']
        profile_id = profile_queries.create(data, account_id)
        return profile_id

    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create Profile",
        )


@router.get("/api/profile", response_model=Profile)
async def get_profile(
    profile_id: int,
    request: Request,
    profile_queries: ProfileQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    try:
        account_id = account_data['id']
        profile_id = profile_id
        profile = profile_queries.get(account_id, profile_id)
        return profile

    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Could not find this Profile for this Account",
        )


@router.put("/api/profile", response_model=Profile)
async def update_profile(
    profile_id: int,
    data: Profile,
    request: Request,
    response: Response,
    profile_queries: ProfileQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        account_id = account_data['id']
        profile_id = profile_id
        updated_profile = profile_queries.update(data, account_id, profile_id)
        return updated_profile

    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot update the Profile for this Account.",
        )
