import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  IconButton,
  SimpleGrid,
} from "@chakra-ui/react";
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

    const addToSeenIt = async () => {
        const url = "http://localhost:8000/api/seen_it";
        const data = {
            title: movie.title,
            synopsis: movie.overview,
            actors: actors,
            backdrop_img: movie.backdrop_path,
            poster_img: movie.poster_path,
            account_id: 0,
        };
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {"Content-Type": "application/json"},
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
      className="movie-container"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
      }}
    >
      <div className="moviegrid">
        <div className="moviediv1">
          <h1>
            {movie.original_title}
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
          {filteredActors.slice(0, 10).map((actor, index) => (
            <span key={actor.id}>
              {index > 0 ? " • " : ""}
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
        <div className="moviediv5">
          <p>RATING</p>
          <p>
            {movie.vote_average ? movie.vote_average.toFixed(1) : "Not Rated"}/10
          </p>
        </div>
        <div className="moviediv6">
          <h1>Recommendations</h1>
          <MovieRecommendationsCarousel className="slider" />
        </div>
        <div className="moviediv7"></div>
      </div>
    </div>
  );
}

export default MovieDetail;
