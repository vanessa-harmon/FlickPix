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

  const filteredActors = credits.cast.filter(
    (actor) => actor.known_for_department === "Acting"
  );

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
      console.log("data: ", data);
      setProviders(data);
    }
  };

  useEffect(() => {
    fetchData();
    fetchCreditsData();
    fetchProvidersData();
  }, [id]);

  const [seenIt, setSeenIt] = useState(false);
  const [added, setAdded] = useState(false);

  const handleSeenItClick = () => {
    setSeenIt(!seenIt);
  };

  const handleAddClick = async () => {
    setAdded(!added);
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${show.poster_path})`,
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
