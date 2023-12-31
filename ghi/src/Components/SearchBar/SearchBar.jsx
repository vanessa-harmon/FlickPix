import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, FormControl, Button } from "react-bootstrap";
import "./SearchBar.css";

function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const ACCOUNTS_API = process.env.REACT_APP_API_HOST;

  const searchMovie = async (e) => {
    e.preventDefault();
    console.log("Searching");
    try {
      const url = `${ACCOUNTS_API}/search/results?query=${query}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      navigate("/search-results", {
        state: { movies: data.results, query: query },
      });
    } catch (e) {
      console.log(e);
    }
  };

  const changeHandler = (e) => {
    setQuery(e.target.value);
  };

  return (
    <>
      <Form className="d-flex" onSubmit={searchMovie} autoComplete="on">
        <FormControl
          type="search"
          placeholder="Movie Search"
          className="me-2"
          aria-label="search"
          name="query"
          value={query}
          onChange={changeHandler}
        ></FormControl>
        <Button className="search-button" variant="secondary" type="submit">
          Search
        </Button>
      </Form>
    </>
  );
}

export default SearchBar;
