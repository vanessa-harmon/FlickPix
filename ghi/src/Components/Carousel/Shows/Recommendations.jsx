import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsive } from "../CarouselData";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../Movies/TrendingMoviesCarousel.css";

function ShowRecommendationsCarousel() {
  const [showRecommendations, setShowRecommendations] = useState([]);
  const { id } = useParams();

  const fetchRecommendations = async () => {
    const url = `http://localhost:8000/shows/recommendations/?series_id=${id}`;
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      const first12Movies = data.results.slice(0, 12);
      setShowRecommendations(first12Movies);
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
        {showRecommendations.map((show, id) => (
          <div key={id} className="custom-carousel-item">
            <img
              src={imgUrlPrefix + show.poster_path}
              alt={show.title}
              className="carousel-img"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default ShowRecommendationsCarousel;
