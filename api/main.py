from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from routers import movies, shows, movie_detail, show_detail, accounts, search, popular, trailer, watch_later, seen_it
from authenticator import authenticator

app = FastAPI()

app.include_router(authenticator.router)
app.include_router(accounts.router)
app.include_router(watch_later.router, tags=['watch_later'])
app.include_router(seen_it.router, tags=['seen_it'])
# app.include_router(profile.router, tags=['profile'])

origins = [
    "http://localhost:3000",
    os.environ.get("CORS_HOST", "https://wsquad.gitlab.io/module3-project-gamma"),
    "https://module3-project-gamma-wsquad-8aa31316f67d1c734e42d5ae3c6e40d226.gitlab.io",
    "https://wsquad.gitlab.io"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "You hit the root path!"}


@app.get("/api/launch-details")
def launch_details():
    return {
        "launch_details": {
            "module": 3,
            "week": 17,
            "day": 5,
            "hour": 19,
            "min": "00"
        }
    }


app.include_router(
    movies.router,
    prefix='/movies',
    tags=['movies']
)


app.include_router(
    shows.router,
    prefix='/shows',
    tags=['shows']
)


app.include_router(
    movie_detail.router,
    prefix='/movie',
    tags=['detail']
)


app.include_router(
    show_detail.router,
    prefix='/show',
    tags=['detail']
)


app.include_router(
    search.router,
    prefix='/search',
    tags=['search']
)


# app.include_router(
#     profile.router,
#     tags=['profile']
# )

app.include_router(
    popular.router,
    prefix='/popular',
    tags=['popular']
)

app.include_router(
    trailer.router,
    prefix='/trailer',
    tags=['trailer']
)
