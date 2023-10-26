# FlickPix

- Ade Adesanoye
- Andrew Garcia
- Chris Skinner
- Valeria Nogales
- Vanessa Harmon

FlickPix - Movie and tv show recommendation website

## Functionality

- Articulate the capabilities of your app or service.
- E.g.: Our RESTful API enables CRUD operations for movie reviews.

## User Stories/Scenarios`: Outline key use-cases, ideally using Gherkin syntax. :cucumber:

- E.g.: `Given` a user is logged in, `When` they post a review, `Then` it appears on their profile.

## Intended Market

Aimed at show/movie enjoyers and binge watchers who want recommendations based on their watch history.

## Stretch goals

- Enable users to filter content based on their preferred service providers
- Create parental control feature, allowing parents to monitor and restrict content access for younger users
- Light/dark mode feature
- The abilty for users to update their profile avatar
- Display how much of a match a show/movie is based on past watch history
- Recommendations based on a user prompt via thirdparty AI service
- Implement a comment feature, enabling users to share their thoughts and opinions on shows/movies they've watched
- Enable users to rate movies/shows they've seen on a scale from 1 to 5
- Create advanced filtering options based on genres, TV providers, and other relevant criteria
- Develop user profile page
- Implement the abilty to view other users profile pages, seen it lists, watch later lists, add friend connections

## Onboarding

- E.g.: Fork the repo, clone locally, install dependencies via `npm install`, and checkout to a feature branch.
To use the application the way it was intended make sure to follow the steps below.

1. Sign up for an account on https://www.themoviedb.org/si
2. Fork and clone the repo
3. Get Get your API Read Access Token from the settings/api page and paste it within the api/keys.py
  TMDB_API_KEY = "Bearer 'ENTER YOUR TOKEN'"
4. CD into the new project directory
5. run `docker volume create flickpix`
6. run `docker volume create pg-admin`
7. Run `docker compose build`
8. Run `docker compose up`

## Tech Stack: Specify technologies, libraries, and frameworks. :books:

- E.g.: React, FastAPI, PostgreSQL, Docker.

## Documentation`: Attach DB schemas, wireframes, and API contracts. :clipboard:

-E.g.: point to the documents dir


## Issue Tracking`: Link to your Linear or JIRA board for bug tracking. :ladybug:

-E.g. - links or screenshoots, could be included in the doc’s dir

## Testing`: Describe unit tests. :white_check_mark:

- Ade Adesanoye : Tested get seen it list
- Andrew Garcia : Tested create item for seen it list
- Vanessa Harmon : Tested get watch later list
- Chris Skinner : Tested create item for watch later list
- Valeria Nogales : Tested get token for accounts logged in
