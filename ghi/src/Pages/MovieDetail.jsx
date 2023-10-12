import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./MovieDetail.css";

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const [credits, setCredits] = useState({ cast: [] });
  const [providers, setProviders] = useState({ results: [] });

  const filteredActors = credits.cast.filter(
    (actor) => actor.known_for_department === "Acting"
  );

  const fetchData = async () => {
    try {
      const url = `http://localhost:8000/movies/details/?movie_id=${id}`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setMovie(data);
      }
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  const fetchCreditsData = async () => {
    const creditsUrl = `http://localhost:8000/movies/credits?movie_id=${id}`;
    const response = await fetch(creditsUrl);
    if (response.ok) {
      const data = await response.json();
      setCredits(data);
    }
  };

  const fetchProvidersData = async () => {
    const providersUrl = `http://localhost:8000/movies/providers?movie_id=${id}`;
    const response = await fetch(providersUrl);
    if (response.ok) {
      const data = await response.json();
      setProviders(data);
    }
  };

  useEffect(() => {
    fetchData();
    fetchCreditsData();
    fetchProvidersData();
  }, [id]);

  return (
    <div
      className="movie-container"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
      }}
    >
      <div className="moviegrid">
        <div className="moviediv1">
          <h1>{movie.original_title}</h1>
        </div>
        <div className="moviediv2">
          Now streaming on:{" "}
          {providers.results.US?.rent?.map((provider, index) => (
            <span key={provider.provider_id}>
              {index > 0 ? ", " : ""}
              {provider.provider_name}
            </span>
          ))}
        </div>
        <div className="moviediv3">
          Starring:{" "}
          {filteredActors.slice(0, 15).map((actor, index) => (
            <span key={actor.id}>
              {index > 0 ? ", " : ""}
              {actor.name}
            </span>
          ))}{" "}
          <Link
            className="btn btn-primary"
            to={`https://www.imdb.com/title/${movie.imdb_id}`}
            target="_blank"
          >
            More info
          </Link>
        </div>
        <div className="moviediv4">
          <p style={{ textAlign: "right" }}>{movie.release_date}</p>
          <h2>Synopsis</h2>
          <p>{movie.overview}</p>
        </div>
        <div className="moviediv5">Rating: {movie.vote_average}</div>
        <div className="moviediv6"></div>
        <div className="moviediv7"></div>
      </div>
    </div>
  );
}

export default MovieDetail;
