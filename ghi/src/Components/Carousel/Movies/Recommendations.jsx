import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsive } from "../CarouselData";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./TrendingMoviesCarousel.css";

function MovieRecommendationsCarousel() {
  const [movieRecommendations, setMovieRecommendations] = useState([]);
  const { id } = useParams();

  const fetchRecommendations = async () => {
    const url = `http://localhost:8000/movies/recommendations/?movie_id=${id}`;
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      const first12Movies = data.results.slice(0, 12);
      setMovieRecommendations(first12Movies);
    }
  };

  const imgUrlPrefix = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    fetchRecommendations();
  }, []);

  return (
    <div>
      <Carousel
        centerMode={true}
        infinite={true}
        responsive={responsive}
        containerClass="carousel-container"
      >
        {movieRecommendations.map((movie, id) => (
          <div key={id} className="custom-carousel-item">
            <img
              src={imgUrlPrefix + movie.poster_path}
              alt={movie.title}
              className="carousel-img"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default MovieRecommendationsCarousel;
