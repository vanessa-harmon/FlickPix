import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsive } from "../CarouselData";
import { useEffect, useState } from "react";
import "../Movies/TrendingMoviesCarousel.css";
import ShowModal from "./Modal/ShowsModal";
import { Box, Button, useDisclosure } from "@chakra-ui/react";

function TopPixShows() {
  const [selectedShow, setSelectedShow] = useState(null); // Rename selectedMovie to selectedShow
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [seenIt, setSeenIt] = useState([]);
  const [watchLater, setWatchLater] = useState([]);
  const [combined, setCombined] = useState([]);
  const [recommended, setRecommended] = useState([]);

  const openModal = (show) => {
    setSelectedShow(show); // Rename movie to show
    onOpen();
  };

  const closeModal = () => {
    setSelectedShow(null);
    onClose();
  };

  const fetchSeenIt = async () => {
    const response = await fetch("http://localhost:8000/api/seen_it", {
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      setSeenIt(data);
    }
  };

  const fetchWatchLater = async () => {
    const response = await fetch("http://localhost:8000/api/watch_later", {
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
  }, []);

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
    let url = `http://localhost:8000/shows/similar?series_id=${tmdbId}`;
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
  }, [combined]);

  const flattenRecommended = (recommended) => {
    const flattened = recommended.flat();
    const shows = flattened.map((page) => page.results);
    return shows.flat();
  };

  const flattenedShows = flattenRecommended(recommended);
  const selectedTopPicks = flattenedShows.filter(
    (show) => show?.poster_path && show.original_language === "en"
  );

  const maxShows = Math.min(20, selectedTopPicks.length);
  const randIdx = Math.floor(
    Math.random() * (selectedTopPicks.length - maxShows + 1)
  );
  const topPicksCarousel = selectedTopPicks.slice(randIdx, randIdx + maxShows);

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
      {selectedShow && (
        <ShowModal show={selectedShow} isOpen={isOpen} onClose={closeModal} />
      )}
    </div>
  );

  return (
    <>{combined.length === 0 ? addItemsComponent() : <TopPixComponent />}</>
  );
}

export default TopPixShows;
