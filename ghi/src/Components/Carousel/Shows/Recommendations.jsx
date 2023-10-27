import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsive } from "../CarouselData";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../Movies/TrendingMoviesCarousel.css";
import { Link } from "react-router-dom";

function ShowRecommendationsCarousel() {
  const { id } = useParams();
  const [showRecommendations, setShowRecommendations] = useState([]);
  const ACCOUNTS_API = process.env.REACT_APP_API_HOST;

  const fetchRecommendations = async (id) => {
    const url = `${ACCOUNTS_API}/shows/recommendations/?series_id=${id}`;
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      const first12Movies = data.results.slice(0, 12);
      setShowRecommendations(first12Movies);
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
        {showRecommendations.map((show, id) => (
          <div key={id} className="custom-carousel-item">
            <Link to={`/tv-shows/${show.id}`} onClick={handleLinkClick}>
              <img
                src={imgUrlPrefix + show.poster_path}
                alt={show.title}
                className="carousel-img"
              />
            </Link>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default ShowRecommendationsCarousel;
