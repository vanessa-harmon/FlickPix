import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./detail.css";

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const [credits, setCredits] = useState({ cast: [] });
  const [providers, setProviders] = useState({ results: [] })

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
  }

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
      className="parent"
      style={{
        height: "100%",
        width: "100%",
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >

        <div className="div1">
          <h1>{movie.original_title}</h1>
        </div>
        <div className="div2">
          Now streaming on:{" "}
          {providers.results.US?.rent?.map((provider, index) => (
            <span key={provider.provider_id}>
              {index > 0 ? ", " : ""}
              {provider.provider_name}
            </span>
          ))}
        </div>
        <div className="div3">IMBD link </div>
        <div className="div4">
          <ul>
            {filteredActors.map((actor) => (
              <li key={actor.id}>{actor.name}</li>
            ))}
          </ul>
        </div>
        <div className="div5">
          <h2>Synopsis</h2>
          <p>{movie.overview}</p>
        </div>
        <div className="div6">Rating {movie.vote_average}</div>
        <div className="div7">
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
        <div className="div8"> </div>

    </div>
  );
}

export default MovieDetail;
