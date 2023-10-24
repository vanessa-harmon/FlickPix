import React, { useEffect, useState } from "react";
import "./Randomizer.css";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";

function Randomizer() {
  const [random, setRandom] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const imgUrlPrefix = "https://image.tmdb.org/t/p/original/";

  const handleClick = async (event) => {
    const randomUrl = "http://localhost:8000/movies/random";
    const response = await fetch(randomUrl);
    if (response.ok) {
      const data = await response.json();
      if (data.poster_path !== null) {
        setRandom(data);
      } else {
        handleClick();
      }
    }
  };

  useEffect(() => {
    handleClick();
  }, []);

  const trailer_url = "https://www.youtube.com/embed/DhlaBO-SwVE";

  useEffect(() => {}, [random]);

  return (
    <>
      <div className="shuffle-container">
        <button onClick={onOpen} onClickCapture={handleClick}>
          <img
            src="shuffle.png"
            alt="Shuffle Button"
            className="shuffle-button"
          />
        </button>
      </div>
      <div className="modal-shuffle-container">
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent className="random-modal">
            <ModalHeader className="random-header">
              {random.name || random.title}
            </ModalHeader>
            <ModalCloseButton className="modal-close" />
            <ModalBody className="random-body">
              <img
                src={imgUrlPrefix + random.poster_path}
                alt={random.name || random.title}
                className="movie-image"
              />
              <p>{random.overview}</p>
              <p>Rating: {random.vote_average}</p>
            </ModalBody>

            <ModalFooter className="random-footer">
              <button onClick={onClose} className="random-close-btn">
                Close
              </button>
              <button onClick={onOpen} onClickCapture={handleClick}>
                <img
                  src="shuffle.png"
                  alt="Shuffle Button"
                  className="modal-shuffle-button"
                />
              </button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </>
  );
}

export default Randomizer;
