import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./detail.css";

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);

  const fetchData = async () => {
    try {
      const url = `http://localhost:8000/movies/details/?movie_id={id}`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setMovie(data);
      }
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <div
      style={{
        backgroundImage: `url(${movie.poster_path})`,
      }}
    >
      <div className="parent">
        <div className="div1">{movie.original_title}</div>
        <div className="div2">Service provider</div>
        <div className="div3">IMBD link </div>
        <div className="div4">Actors </div>
        <div className="div5">
          <h1>Synopsis</h1>
          <p>{movie.overview}</p>
        </div>
        <div className="div6"> {movie.vote_average} </div>
        <div className="div7">
          <form>
            <div class="form-group">
              <label for="exampleFormControlTextarea1">Comments</label>
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
              ></textarea>
            </div>
          </form>
        </div>
        <div className="div8"> </div>
      </div>
    </div>
  );
}

export default MovieDetail;
