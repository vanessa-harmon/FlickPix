import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./detail.css";

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
      console.log("data: ", data)
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
        class="parent"
        style={{
          height: "100%",
          width: "100%",
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${show.poster_path})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div class="div1">
          <h1>{show.original_name}</h1>
        </div>
        <div class="div2">
          {" "}
          Now streaming on:{" "}
          {providers.results.US?.flatrate?.map((provider, index) => (
            <span key={provider.provider_id}>
              {index > 0 ? ", " : ""}
              {provider.provider_name}
            </span>
          ))}
        </div>
        <div class="div3">imbd link</div>
        <div class="div4">
          {" "}
          <ul>
            {filteredActors.map((actor) => (
              <li key={actor.id}>{actor.name}</li>
            ))}
          </ul>
        </div>
        <div class="div5">
          <h2>Synopsis</h2>
          <p>{show.overview}</p>
        </div>
        <div class="div6">Rating {show.vote_average}</div>
        <div class="div7">
          {/* <form>
            <div class="form-group">
              <label for="exampleFormControlTextarea1">Comments</label>
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
              ></textarea>
            </div>
          </form> */}
        </div>
        <div class="div8"> </div>
      </div>
  );
}

export default ShowDetail;
