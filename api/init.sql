-- DROP TABLE IF EXISTS accounts;


-- Accounts table
CREATE TABLE IF NOT EXISTS accounts (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    email VARCHAR(30) NOT NULL,
    date_of_birth DATE NOT NULL,
    hashed_password VARCHAR(128),
    date_joined TIMESTAMP WITH TIME ZONE,
    last_login TIMESTAMP WITH TIME ZONE
);


CREATE TABLE IF NOT EXISTS watch_later(
    id SERIAL PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    synopsis VARCHAR(250),
    actors VARCHAR(250),
    backdrop_img VARCHAR(150),
    poster_img VARCHAR(150),
    account_id INTEGER NOT NULL REFERENCES accounts("id") ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS seen_it(
    id SERIAL PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    synopsis VARCHAR(250),
    actors VARCHAR(250),
    backdrop_img VARCHAR(150),
    poster_img VARCHAR(150),
    account_id INTEGER NOT NULL REFERENCES accounts("id") ON DELETE CASCADE
);
