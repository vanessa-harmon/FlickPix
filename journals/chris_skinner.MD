## Sep 28, 2023

This week I worked:

_Used Fast API to make a request to retrieve data from the third-party API (TMDB)
_ Retrieved Movie data for trending, popular,
and movies by genre. Retrieved TV Show data for trending, popular, and by genre

Andrew was able to retrieve the JSON data and render it on the front-end for our carousels.

\*Working on the database structure for logged-in users to add movies
/shows to a watch-later and seen it list. The DB will have a relation
to user_id so we can retrieve and render the lists that are associated with the user from the DB.

\*Completed building the databases. DBs for must watch and seen it tables are both showing
up in pg-admin. I started to work on connecting the API routes for CRUD operations on the
must_watch list.

## OCT 13, 2023

This week I worked on:

Completed the API endpoints to post items to the watch later lists for the user's account

Completed the API endpoint to post items to the seen it lists for the user's account

Completed the API endpoint to get items from the watch later
lists from the users account

Currently working on:

Completing the API endpoint to get items from the seen it lists
for the users account

Using React to render the data from the users account and
show a list of movies that they have saved to their watch later
or seen it list.
