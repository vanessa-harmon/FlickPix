import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { IconButton } from "@chakra-ui/react";
import "./MovieDetail.css";
import MovieRecommendationsCarousel from "../Components/Carousel/Movies/Recommendations";
import { MdOutlineLibraryAddCheck, MdOutlineAddToQueue } from "react-icons/md";

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const [credits, setCredits] = useState({ cast: [] });
  const [providers, setProviders] = useState({ results: [] });
  const [seenIt, setSeenIt] = useState(false);
  const [added, setAdded] = useState(false);
  const imgUrlPrefix = "https://image.tmdb.org/t/p/original/";

  const filteredActors = credits.cast.filter(
    (actor) => actor.known_for_department === "Acting"
  );

  let actors = "";
  for (let actor of filteredActors.slice(0, 15)) {
    actors = actors + actor["name"] + ", ";
  }

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

  //Seen It
    const handleSeenItClick = async () => {
        if (seenIt) {await deleteFromSeenIt();}
            else {await addToSeenIt();}
        setSeenIt(!seenIt);
    };

    const data = {
      title: movie.title,
      tmdb_id: movie.id,
      synopsis: movie.overview,
      actors: actors,
      backdrop_img: movie.backdrop_path,
      poster_img: movie.poster_path,
      account_id: 0,
    };

    const url = "http://localhost:8000/api/seen_it";
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    };

        const response = await fetch(url, fetchConfig);
        if (response.ok) {alert("Added to 'Seen It'!");}
            else {throw new Error("Request failed");}
    };

    const deleteFromSeenIt = async () => {
        const url = `http://localhost:8000/api/seen_it?title=${encodeURIComponent(movie.title)}`;
        const fetchConfig = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        };

        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            alert("Removed from 'Seen It'!");
            setSeenIt(!seenIt);
        }   else {throw new Error("Request failed");}
    };

  const handleAddClick = async (event) => {
    setAdded(!added);

    event.preventDefault();
    const data = {
      title: movie.title,
      tmdb_id: movie.id,
      synopsis: movie.overview,
      actors: actors,
      backdrop_img: movie.backdrop_path,
      poster_img: movie.poster_path,
      account_id: 0,
    };
    console.log("data:", data);

    const url = "http://localhost:8000/api/watch_later";
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    };

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      console.log("Item added to watch later list!");
    } else {
      console.error("Failed to add item to watch later list.");
    }
  };

  useEffect(() => {
    fetchData();
    fetchCreditsData();
    fetchProvidersData();
  }, [id]);

  return (
    <div
      className="movie-grid"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
      }}
    >
      <div className="movie-poster">
        <img src={imgUrlPrefix + movie.poster_path} />
      </div>
      <div className="movie-details">
        <h1>
          {movie.original_title} (
          {movie.release_date && movie.release_date.slice(0, 4)})
          <IconButton
            icon={<MdOutlineLibraryAddCheck />}
            colorScheme={seenIt ? "green" : "green"}
            variant="outline"
            aria-label="Seen It"
            onClick={handleSeenItClick}
            isActive={seenIt}
            isRound={true}
          />
          <IconButton
            icon={<MdOutlineAddToQueue />}
            colorScheme={added ? "yellow" : "yellow"}
            variant="outline"
            aria-label="Add"
            onClick={handleAddClick}
            isActive={added}
            isRound={true}
          />
        </h1>
        <h6>
          {new Date(movie.release_date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })}
          {" • "}
          {movie.genres && (
            <span>
              Genres: {movie.genres.map((genre) => genre.name).join(", ")}
            </span>
          )}
          {" • "}
          {movie.runtime} minutes
        </h6>
        <h6>
          <div class="circle">
            <span class="percentage">
              {movie.vote_average
                ? (movie.vote_average * 10).toFixed(0) + "%"
                : "NR"}
            </span>
          </div>
        </h6>
        <p>Overview: {movie.overview} </p>
        <p>
          Cast:{" "}
          {filteredActors.slice(0, 15).map((actor, index) => (
            <span key={actor.id}>
              {index > 0 ? " • " : ""}
              {actor.name}
            </span>
          ))}{" "}
          <Link
            to={`https://www.imdb.com/title/${movie.imdb_id}`}
            target="_blank"
            className="imbd-link"
          >
            For more info
          </Link>
        </p>
        {providers.results.US?.rent && (
          <p>
            Now streaming on:{" "}
            {providers.results.US?.rent?.map((provider, index) => (
              <span key={provider.provider_id}>
                {index > 0 ? ", " : ""}
                {provider.provider_name}
              </span>
            ))}
          </p>
        )}
      </div>
      <div className="movie-recommendations">
        <h1>More Like This</h1>
        <MovieRecommendationsCarousel className="slider" />
      </div>
    </div>
  );
}

export default MovieDetail;
