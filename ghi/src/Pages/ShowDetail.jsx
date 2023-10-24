import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ShowDetail.css";
import ShowRecommendationsCarousel from "../Components/Carousel/Shows/Recommendations";
import { IconButton } from "@chakra-ui/react";
import { MdOutlineLibraryAddCheck, MdOutlineAddToQueue } from "react-icons/md";

function ShowDetail() {
  const { id } = useParams();
  const [show, setShow] = useState([]);
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
      const url = `http://localhost:8000/shows/details?series_id=${id}`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setShow(data);
      }
    } catch (error) {
      console.error("Error fetching show details:", error);
    }
  };

  const fetchCreditsData = async () => {
    const creditsUrl = `http://localhost:8000/shows/credits?series_id=${id}`;
    const response = await fetch(creditsUrl);
    if (response.ok) {
      const data = await response.json();
      setCredits(data);
    }
  };

  const fetchProvidersData = async () => {
    const providersUrl = `http://localhost:8000/shows/providers?series_id=${id}`;
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
      title: show.original_name,
      synopsis: show.overview,
      actors: actors,
      backdrop_img: show.backdrop_path,
      poster_img: show.poster_path,
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
    const url = `http://localhost:8000/api/seen_it?title=${encodeURIComponent(show.original_name)}`;
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


    const data = {
      title: show.original_name,
      synopsis: show.overview,
      actors: actors,
      backdrop_img: show.backdrop_path,
      poster_img: show.poster_path,
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
      className="show-grid"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${show.backdrop_path})`,
      }}
    >
      <div className="show-poster">
        <img src={imgUrlPrefix + show.poster_path} />
      </div>
      <div className="show-details">
        <h1>
          {show.original_name} (
          {show.first_air_date && show.first_air_date.slice(0, 4)})
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
          {new Date(show.first_air_date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })}
          {" • "}
          {show.genres && (
            <span>
              Genres: {show.genres.map((genre) => genre.name).join(", ")}
            </span>
          )}
        </h6>
        <h6>
          <div class="circle">
            <span class="percentage">
              {show.vote_average
                ? (show.vote_average * 10).toFixed(0) + "%"
                : "NR"}
            </span>
          </div>
        </h6>
        <p>Overview: {show.overview} </p>
        <p>
          Cast:{" "}
          {filteredActors.slice(0, 15).map((actor, index) => (
            <span key={actor.id}>
              {index > 0 ? " • " : ""}
              {actor.name}
            </span>
          ))}
        </p>
        {providers.results.US?.flatrate &&
          providers.results.US.flatrate.length > 0 && (
            <p>
              Now streaming on:{" "}
              {providers.results.US.flatrate.map((provider, index) => (
                <span key={provider.provider_id}>
                  {index > 0 ? ", " : ""}
                  {provider.provider_name}
                </span>
              ))}
            </p>
          )}
      </div>
      <div className="show-recommendations">
        <h1>More Like This</h1>
        <ShowRecommendationsCarousel className="slider" />
      </div>
    </div>
  );
}

export default ShowDetail;
