import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, FormControl, Button } from 'react-bootstrap'
import "./SearchBar.css"


function SearchBar() {
    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const searchMovie = async (e) => {
        e.preventDefault();
        console.log("Searching");
        try {
            const url = `http://localhost:8000/search/results?query=${query}`
            const response = await fetch(url)
            const data = await response.json();
            console.log(data);
            setMovies(data.results);
            navigate('/search-results', { state: { movies: data.results, query: query } });
        }
        catch (e) {
            console.log(e);
        }
    }

    const changeHandler = (e) => {
        setQuery(e.target.value);
    }

    return (
        <>
            <Form className="d-flex" onSubmit={searchMovie} autoComplete="on">
                <FormControl
                    type="search"
                    placeholder="Movie Search"
                    className="me-2"
                    aria-label="search"
                    name="query"
                    value={query} onChange={changeHandler}>
                </FormControl>
                <Button className="search-button" variant="secondary" type="submit">Search</Button>
            </Form >
        </>
    );
}

export default SearchBar;
