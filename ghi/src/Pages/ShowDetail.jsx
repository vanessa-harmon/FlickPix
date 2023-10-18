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

  const handleSeenItClick = () => {
    setSeenIt(!seenIt);
  };

  const handleAddClick = async (event) => {
    setAdded(!added);

    event.preventDefault();
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
      style={{
        height: "100vh",
        width: "100%",
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${show.backdrop_path})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="moviegrid">
        <div className="showdiv1">
          <h1>
            {show.original_name}
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
        <div className="showdiv2">
          {" "}
          Now streaming on:{" "}
          {providers.results.US?.flatrate?.map((provider, index) => (
            <span key={provider.provider_id}>
              {index > 0 ? ", " : ""}
              {provider.provider_name}
            </span>
          ))}
        </div>
        <div className="showdiv3">
          Starring:{" "}
          {filteredActors.map((actor, index) => (
            <span key={actor.id}>
              {index > 0 ? " • " : ""}
              {actor.name}
            </span>
          ))}
        </div>
        <div className="showdiv4">
          <p style={{ textAlign: "right" }}>{show.first_air_date}</p>
          <h2>Synopsis</h2>
          <p>{show.overview}</p>
        </div>
        <div className="showdiv5">
          <p>RATING</p>
          <p>
            {show.vote_average ? show.vote_average.toFixed(1) : "Not Rated"}/10
          </p>
        </div>
        <div className="showdiv6">
          <h1>Recommendations</h1>
          <ShowRecommendationsCarousel className="slider" />
        </div>
        <div className="showdiv7"></div>
      </div>
    </div>
  );
}

export default ShowDetail;
