## September 28, 2023

This week I worked on:

- The back-end for the Show and Movie detail pages

- Started connecting the routes from the front-end to the back-end

I used FASTAPI to create routes to fetch data in regards to the tv/movie details by the medias ID, the cast involved with the tv/movie, and the providers that allow you too watch the movie.

I initially had trouble receiving specific data in regards to the cast as the reference called for every contributor to the show/movie. So i had to figure out a way to filter out the actors only from the API so that we would solely receive the data necessary.

## October 13, 2023

This week I worked on:

- Completed connecting the routes from the front-end to the back-end

- Started working on the front end for the seen it and watch later pages with Vanessa

I started working on the front-end for the seen it page, while Vanessa worked on the front-end for the watch later page. We were able to use the back-end that Chris provided to fetch data from the API. Users would be able to use these pages once they created an account to add to these lists, by using a POST method.

Had trouble when testing the fastAPI for adding movies to the lists beause of a 422 unproccessible entity. We were able to solve this by changing the limit of how many characters were allowed for the descriptions of the media was posted.

## OCT 20, 2023

This week I worked on:

- Add/delete from seen it or watch later button functionality implemented for the tv/show modal and detail pages

- Worked on the CSS for the seen it and watch later pages

Worked on the seen it/watch later buttons on the Modals and detail pages that allowed users too add and delete movies from their account with Vanessa. We used a post method based off the title of the movie. Also added some CSS that helped kep the page clean.

We initially had issues with the delete function connected to the button since we were using the title as the identifier. It would delete any movie that shared the title within watch later. Since the movie and shows had different id sources we used the imdb id too identify the show/movie so that this error wouldnt repeat
