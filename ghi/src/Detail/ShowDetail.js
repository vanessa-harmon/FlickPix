import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./detail.css";

function ShowDetail() {
  const { id } = useParams();
  const [show, setShow] = useState([]);

  const fetchData = async () => {
    try {
      const url = `http://localhost:8000/shows/details?series_id={id}`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setShow(data);
      }
    } catch (error) {
      console.error("Error fetching show details:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <div
      style={{
        backgroundImage: `url(${show.poster_path})`,
      }}
    >
      <div class="parent">
        <div class="div1">{show.original_name}</div>
        <div class="div2">service provider{}</div>
        <div class="div3">imbd link</div>
        <div class="div4">Actors</div>
        <div class="div5">
          <h1>Synopsis</h1>
          <p>{show.overview}</p>
        </div>
        <div class="div6">{show.vote_average}</div>
        <div class="div7">
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
        <div class="div8"> </div>
      </div>
    </div>
  );
}

export default ShowDetail;
