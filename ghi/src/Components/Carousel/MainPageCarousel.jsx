import React, { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import MovieOrShowModal from "./Movies/Modal/MainModal";
import { useDisclosure } from "@chakra-ui/react";
import "./MainPageCarousel.css";

function PopularCarousel() {
  const [popularItems, setPopularItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const ACCOUNTS_API = process.env.REACT_APP_API_HOST;

  const openModal = (item) => {
    setSelectedItem(item);
    onOpen();
  };

  const closeModal = () => {
    setSelectedItem(null);
    onClose();
  };

  const imgUrlPrefix = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    const fetchPopular = async () => {
      const response = await fetch(`${ACCOUNTS_API}/popular/all`);

      if (response.ok) {
        const data = await response.json();
        const first5 = data.results.slice(0, 5);
        setPopularItems(first5);
      }
    };
    fetchPopular();
  }, [ACCOUNTS_API]);

  return (
    <div className="carousel-container1">
      {popularItems && (
        <Carousel className="carousel-box">
          {popularItems.map((item, id) => (
            <Carousel.Item key={id} onClick={() => openModal(item)}>
              <img
                className="poster-img"
                src={imgUrlPrefix + item.backdrop_path}
                alt={item.title || item.name}
                style={{ width: "100%", height: "auto" }}
              />
              <Carousel.Caption>
                <p className="carousel-text">{item.title || item.name}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
      {selectedItem && (
        <MovieOrShowModal
          item={selectedItem}
          isOpen={isOpen}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default PopularCarousel;
