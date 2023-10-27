# FlickPix

- Ade Adesanoye
- Andrew Garcia
- Chris Skinner
- Valeria Nogales
- Vanessa Harmon

FlickPix - Movie and tv show recommendation website

## Functionality

- Acess a vast collection of movies and TV shows from  reliable third-party API.
- Watch-Later List: Add shows and movies to your watch-later list.
- Seen-It List: Keep track of the shows and movies you've watched.
- Utilize the "Seen-It List" data to generate personalized recommendations based on your viewing history.
- Get spontaneous entertainment recommendations by using the randomizer feature, providing you with a random show or movie from the API.

## User Stories/Scenarios :cucumber:

- `Given` a user is logged in, `When` they add a show or movie to their watch-later list, `Then` the show or movie should be added to their watch-later list
- `Given` a user is logged in, `When` they add a show or movie to their seen-it list, `Then` the show or movie should be added to their seen-it list
- `Given` a user is logged in and they have shows or movies in their seen-it list, `When` the system generates recommendations, `Then` the recommendations should be based on the user's seen-it list
- `Given` a user is logged in, `When` they use the randomizer feature, `Then` a random show or movie should be provided from the API
- `Given` a user is logged in and they have a show or movie in their watch-later or seen-it list, `When` they remove the show or movie from the list, `Then` the show or movie should be removed from the respective list

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

- To use the application the way it was intended make sure to follow the steps below.

1. Sign up for an account on https://www.themoviedb.org/
2. Fork and clone the repo
3. Create a signing key within the .env file
  SIGNING_KEY='Your unique key'
4. Get Get your API Read Access Token from the settings/api page and paste it within the .env file
  TMDB_API_KEY=Bearer 'ENTER YOUR TOKEN'
5. CD into the new project directory
6. install dependencies via `npm install`
7. run `docker volume create flickpix`
8. run `docker volume create pg-admin`
9. Run `docker compose build`
10. Run `docker compose up`

## Tech Stack :books:

- React
- FastAPI
- PostgreSQL
- Docker
- RESTful APIs

## Documentation :clipboard:

![Excalidraw](docs/FlickPix%20Excalidraw.png)

- https://excalidraw.com/#json=x1jCbFZfzLjxUU7piWUql,Q4nWxzqKx2Kw1pIMJF_SEA




## Issue Tracking

-E.g. - links or screenshoots, could be included in the doc’s dir

## Testing :white_check_mark:

- Ade Adesanoye : Tested get seen it list
- Andrew Garcia : Tested create item for seen it list
- Vanessa Harmon : Tested get watch later list
- Chris Skinner : Tested create item for watch later list
- Valeria Nogales : Tested get token for accounts logged in
