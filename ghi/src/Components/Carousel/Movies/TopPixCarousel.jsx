import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsive } from "../CarouselData";
import { useEffect, useState } from "react";
import "./TrendingMoviesCarousel.css";
import MovieModal from "./Modal/MovieModal";
import { useDisclosure } from "@chakra-ui/react";

function TopPixCarousel() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [seenIt, setSeenIt] = useState([]);
  const [watchLater, setWatchLater] = useState([]);
  const [combined, setCombined] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const ACCOUNTS_API = process.env.REACT_APP_API_HOST;

  const openModal = (movie) => {
    setSelectedMovie(movie);
    onOpen();
  };

  const closeModal = () => {
    setSelectedMovie(null);
    onClose();
  };

  const fetchSeenIt = async () => {
    const response = await fetch(`${ACCOUNTS_API}/api/seen_it`, {
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      setSeenIt(data);
    }
  };

  const fetchWatchLater = async () => {
    const response = await fetch(`${ACCOUNTS_API}/api/watch_later`, {
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      setWatchLater(data);
    }
  };

  const imgUrlPrefix = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    fetchSeenIt();
    fetchWatchLater();
  });

  useEffect(() => {
    if (seenIt.items?.length > 0 || watchLater.items?.length > 0) {
      const combinedData = [];
      if (seenIt.items) {
        combinedData.push(...seenIt.items);
      }
      if (watchLater.items) {
        combinedData.push(...watchLater.items);
      }
      setCombined(combinedData);
    }
  }, [seenIt.items, watchLater.items]);

  const recommendations = [];

  const fetchRecommended = async (tmdbId) => {
    let url = `${ACCOUNTS_API}/movies/similar?movie_id=${tmdbId}`;
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      recommendations.push(data);
    }
  };

  const addRecommendations = async () => {
    const recommendationsData = [];
    for (const item of combined) {
      await fetchRecommended(item.tmdb_id);
      recommendationsData.push(recommendations);
    }
    setRecommended(recommendationsData);
  };

  useEffect(() => {
    if (combined.length > 0) {
      addRecommendations();
    }
  });

  const flattenRecommended = (recommended) => {
    const flattened = recommended.flat();
    const movies = flattened.map((page) => page.results);
    return movies.flat();
  };

  const flattenedMovies = flattenRecommended(recommended);

  const selectedTopPicks = flattenedMovies.filter(
    (movie) => movie?.poster_path && movie.original_language === "en"
  );

  console.log("TOP Pick", selectedTopPicks);

  const maxMovies = Math.min(20, selectedTopPicks.length);
  const randIdx = Math.floor(
    Math.random() * (selectedTopPicks.length - maxMovies + 1)
  );
  const topPicksCarousel = selectedTopPicks.slice(randIdx, randIdx + maxMovies);

  const addItemsComponent = () => (
    <div className="add-item-container">
      <div className="add-item-card">
        <div className="add-text-box">
          <h4>Want Recommendations Built For You?</h4>
          <p>Log In and add an item to one of your personal lists.</p>
        </div>
        <img src="movie-theater.jpg" alt="movie theater" />
      </div>
    </div>
  );

  const TopPixComponent = () => (
    <div>
      <Carousel
        centerMode={true}
        infinite={true}
        responsive={responsive}
        containerClass="carousel-container"
      >
        {topPicksCarousel.map((movie, id) => (
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

  return (
    <>
      {topPicksCarousel.length === 0 ? (
        addItemsComponent()
      ) : (
        <TopPixComponent />
      )}
    </>
  );
}

export default TopPixCarousel;
