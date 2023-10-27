## September 28, 2023

This week I worked on:

- Getting the back-end login, logout, and create an account authentication functionality.
- I also created a database for our application and designed the accounts table.

I worked on Back-end FASTAPI to create queries and routes to create an account, get protected, login, and logout, and to retrieve a token.

I learned how to use pgAdmin to create a database and manipulate the accounts in the database. I coincidentally just learned about the F2/Rename symbol functionality in VS Code and it allows me to rename a variable once and it automatically replaces all instances of the variable everywhere else.

## OCT 13, 2023

This week I worked on:

- The front-end for the sign up and login functionality. Using React and Chakra I designed a signup and login form in a modal format.
- I connected the back-end functionality for the sign up and login with the front-end.

For the front-end signup and login I created an Accounts folder within src/Components folders and added a LoginModal.jsx and a SignupModal.jsx. I also added this as apart of the Navbar.jsx.

I learned how to test that the front-end was working using the FastAPI swagger and adding several print statements to ensure that I was able to create an account, login, and access a token. It was a lot of trial and error but I was able to create accounts and login and verify this via the database in pgAdmin.

## OCT 20, 2023

This week I worked on:

- The back-end for the logout functionality and ensuring that once a user logs out, there is no more token associated with this account.
- The front-end for the logout functionality Using React and Chakra I added the logout functionality to the Navbar.jsx.
- I also worked on stretch goals including adding a Profile and Avatar.

I utilized the JWTdown for FastAPI docs to learn how to code the back-end fo the logout functionality and followed the signup and logout front-end code I had previously done to ensure the logout functionality would work. I started working on stretch goals adding an Avatar and a Profile.

Whenever I did not know how to do something I researched on google and youtube and used documentation. This is a learning process as using keywords was important. I learned that I was able to follow docs and implement everything we had learned throughout the class to accomplish the logout functionality and front-end, plus start working on stretch goals.

## OCT 27, 2023

This week I worked on:

- Creating a profile(s) for each account and for each profile being able to update a nickname and avatar from a selection of images from the web.
- I also worked on preparing our docs and project to be deployment ready.
- Team Mobbed Unit Tests
- Team Mobbed Deployment

I worked on being able to create a profile, once logged in and adding a nickname and an selecting an avatar from a drop-down menu and also from a selection of pictures. The problem I encountered was being able to keep the avatar from changing once I refresh the page. I researched and changed my code dozens of times to check if it would work. It didn't. I received help from SEIRs and instructors about potentially using cookies or storage and we tried it both ways. We realized it would be a little more time consuming, so since this was a stretch goal anyways, I made the tough choice to focus on deployment instead. Given countless of hours working on this and getting it to the final lap and not being able to showcase the work completed already was the tough part.w

The deployment preparation was a learning curve. We had to make sure that we resolved any flake8 warnings. Added items ot the .flake8 file. Deleted any unused variables and imports. We updated our .gitlab-ci.yml and updated our dockerfile for production. We also deleted our keys.py file and added any third-party api keys to our .env file. We added our environment variables to Gitlab Browser. We decided to Team Mob both unit tests and deployment.
