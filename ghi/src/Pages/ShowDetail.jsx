import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ShowDetail.css";
import ShowRecommendationsCarousel from "../Components/Carousel/Shows/Recommendations";

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
          <h1>{show.original_name}</h1>
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
              {index > 0 ? ", " : ""}
              {actor.name}
            </span>
          ))}
        </div>
        <div className="showdiv4">
          <p style={{ textAlign: "right" }}>{show.first_air_date}</p>
          <h2>Synopsis</h2>
          <p>{show.overview}</p>
        </div>
        <div className="showdiv5">Rating: {show.vote_average}</div>
        <div className="showdiv6">
          {" "}
          <h1>Recommendations</h1>
          <ShowRecommendationsCarousel className="slider" />
        </div>
        <div className="showdiv7"></div>
      </div>
    </div>
  );
}

export default ShowDetail;
