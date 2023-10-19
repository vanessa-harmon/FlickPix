import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  IconButton,
  SimpleGrid,
} from "@chakra-ui/react";
import "./MovieModal.css";
import { NavLink } from "react-router-dom";
import { MdOutlineLibraryAddCheck, MdOutlineAddToQueue } from "react-icons/md";


function MovieModal({ movie, isOpen, onClose }) {
    const imgUrlPrefix = "https://image.tmdb.org/t/p/original/";
    const [credits, setCredits] = useState({ cast: [] });
    const [seenIt, setSeenIt] = useState(false);
    const [added, setAdded] = useState(false);

    const filteredActors = credits.cast.filter(
        (actor) => actor.known_for_department === "Acting"
    );

    let actors = "";
    for (let actor of filteredActors.slice(0, 15)) {
        actors = actors + actor["name"] + ", ";
    }

    const fetchCreditsData = async () => {
        const creditsUrl = `http://localhost:8000/movies/credits?movie_id=${movie.id}`;
        const response = await fetch(creditsUrl);
        if (response.ok) {
        const data = await response.json();
        setCredits(data);
        }
    };

    const handleSeenItClick = () => {
        setSeenIt(!seenIt);

         fetch("/api/seen_it", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify({ seenItPost}),
        })
            .then(response => {
                if (response.ok) {
                    alert("Added to 'Seen It'!");
                } else {
                    throw new Error("Request failed");
                }
            })
            .catch(error => {
                console.error("An error occurred:", error);
            });
    };

    const handleAddClick = async (event) => {
        setAdded(!added);

        event.preventDefault();
        const data = {
        title: movie.title,
        synopsis: movie.overview,
        actors: actors,
        backdrop_img: movie.backdrop_path,
        poster_img: movie.poster_path,
        account_id: 0,
        };
        console.log("data:", data);

        const url = "http://localhost:8000/api/watch_later";
        const fetchConfig = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        };

        const response = await fetch(url, fetchConfig);
        if (response.ok) {
        console.log("Item added to watch later list!");
        } else {
        console.error("Failed to add item to watch later list.");
        }
    };

    useEffect(() => {
        fetchCreditsData();
    }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader className="modal-header">{movie.title}</ModalHeader>
        <ModalCloseButton className="close-button" />
        <ModalBody className="modal-content">
          <img
            src={imgUrlPrefix + movie.poster_path}
            alt={movie.title}
            className="modal-img"
          />
          <p>{movie.overview}</p>
          <p>Rating: {movie.vote_average}</p>
        </ModalBody>
        <ModalFooter className="modal-footer">
          <SimpleGrid gap={4} p={4} columns={4}>
            <IconButton
              icon={<MdOutlineLibraryAddCheck />}
              colorScheme={seenIt ? "green" : "green"}
              variant="outline"
              aria-label="Seen It"
              onClick={handleSeenItClick}
              isActive={seenIt}
              isRound={true}
            />
            <IconButton
              icon={<MdOutlineAddToQueue />}
              colorScheme={added ? "yellow" : "yellow"}
              variant="outline"
              aria-label="Add"
              onClick={handleAddClick}
              isActive={added}
              isRound={true}
            />
            <NavLink to={`/movies/${movie.id}`}>
              <Button
                colorScheme="twitter"
                variant="outline"
                borderRadius="24px"
              >
                More...
              </Button>
            </NavLink>
            <Button
              className="modal-button-close"
              borderRadius="24px"
              colorScheme="red"
              variant="outline"
              mr={3}
              onClick={onClose}
            >
              Close
            </Button>
          </SimpleGrid>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default MovieModal;
