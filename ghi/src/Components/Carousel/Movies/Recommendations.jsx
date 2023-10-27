import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsive } from "../CarouselData";
import { useEffect, useState } from "react";
import "./TrendingMoviesCarousel.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function MovieRecommendationsCarousel() {
  const { id } = useParams();
  const [movieRecommendations, setMovieRecommendations] = useState([]);
  const ACCOUNTS_API = process.env.REACT_APP_API_HOST;

  const fetchRecommendations = async (id) => {
    const url = `${ACCOUNTS_API}/movies/recommendations?movie_id=${id}`;
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      const first12Movies = data.results.slice(0, 12);
      setMovieRecommendations(first12Movies);
    }
  };

  const imgUrlPrefix = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    fetchRecommendations(id);
  }, [id]);

  const handleLinkClick = () => {
    window.scrollTo(0, 0);
  };

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
            <Link to={`/movies/${movie.id}`} onClick={handleLinkClick}>
              <img
                src={imgUrlPrefix + movie.poster_path}
                alt={movie.title}
                className="carousel-img"
              />
            </Link>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default MovieRecommendationsCarousel;
