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

## OCT 20, 2023

This week I worked on:

Completed API endpoints to retreive items from the seen it / watch later lists for the user accounts.

Worked with Vanessa to retreive the items from the endpoint to render the data for the lists in React.

Wrote algorithm to allow user to click a button for a random item selection. Used the endpoint for "random selection" to randomly select item on the click of a button in the navbar. Completed styling for the function.

Ade informed me of a bug that was allowing duplicate items to be added to a users list. Formatted the postgres database to add a tmdb_id column which relates to the associated id given to the movie from the tmdb third party api. Corrected the bug in the query for the post to the watch later and seen it lists to first retrieve the account id and tmdb id for the item, and only add the item if it was not already entered in the database for that user.

Completed fastapi routers and queries to allow for deletion of an item in the user's list. Endpoint is working appropriately in the FastAPI swagger UI.

Next week will work on:

Working with Vanessa and Ade to implement the delete functionality.

Group will work together on implementing unit tests and deployment.
