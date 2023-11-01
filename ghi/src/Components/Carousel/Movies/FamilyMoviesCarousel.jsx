import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsive } from "../CarouselData";
import { useEffect, useState } from "react";
import "./TrendingMoviesCarousel.css";
import MovieModal from "./Modal/MovieModal";
import { useDisclosure } from "@chakra-ui/react";

function FamilyMoviesCarousel() {
  const [familyMovies, setFamilyMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const ACCOUNTS_API = process.env.REACT_APP_API_HOST;

  const openModal = (movie) => {
    setSelectedMovie(movie);
    onOpen();
  };

  const closeModal = () => {
    setSelectedMovie(null);
    onClose();
  };

  const imgUrlPrefix = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    const fetchFamilyMovies = async () => {
      const genreId = 10751;
      const response = await fetch(
        `${ACCOUNTS_API}/movies/genre?genre_id=${genreId}`
      );

      if (response.ok) {
        const data = await response.json();
        const first12Movies = data.results.slice(0, 12);
        setFamilyMovies(first12Movies);
      }
    };
    fetchFamilyMovies();
  }, [ACCOUNTS_API]);

  return (
    <div>
      <Carousel
        centerMode={true}
        infinite={true}
        responsive={responsive}
        containerClass="carousel-container"
      >
        {familyMovies.map((movie, id) => (
          <div
            key={id}
            className="custom-carousel-item"
            onClick={() => openModal(movie)}
          >
            <img
              src={imgUrlPrefix + movie.poster_path}
              alt={movie.title}
              className="carousel-img"
            />
          </div>
        ))}
      </Carousel>
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          isOpen={isOpen}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default FamilyMoviesCarousel;
