import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsive } from "../CarouselData";
import { useEffect, useState } from "react";
import "../Movies/TrendingMoviesCarousel.css";
import ShowModal from "./Modal/ShowsModal";
import { useDisclosure } from "@chakra-ui/react";

function FamilyShowCarousel() {
  const [familyShow, setFamilyShow] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const genreId = 10751;
  const ACCOUNTS_API = process.env.REACT_APP_API_HOST;

  const openModal = (show) => {
    setSelectedShow(show);
    onOpen();
  };

  const closeModal = () => {
    setSelectedShow(null);
    onClose();
  };

  const fetchFamilyShow = async () => {
    const response = await fetch(
      `${ACCOUNTS_API}/shows/genre?genre_id=${genreId}`
    );

    if (response.ok) {
      const data = await response.json();
      const filteredShows = data.results.filter(
        (show) => show.poster_path !== null
      );
      const first12Shows = filteredShows.slice(0, 12);
      setFamilyShow(first12Shows);
    }
  };

  const imgUrlPrefix = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    fetchFamilyShow();
  }, []);

  return (
    <div>
      <Carousel
        centerMode={true}
        infinite={true}
        responsive={responsive}
        containerClass="carousel-container"
      >
        {familyShow.map((show, id) => (
          <div
            key={id}
            className="custom-carousel-item"
            onClick={() => openModal(show)}
          >
            <img
              src={imgUrlPrefix + show.poster_path}
              alt={show.title}
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
}

export default FamilyShowCarousel;
