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
import TrailerPlayer from "../../../Trailer/Trailer";
import { MdOutlineLibraryAddCheck, MdOutlineAddToQueue } from "react-icons/md";

function MovieOrShowModal({ item, isOpen, onClose }) {
  const imgUrlPrefix = "https://image.tmdb.org/t/p/original/";
  const [credits, setCredits] = useState({ cast: [] });
  const [seenIt, setSeenIt] = useState(false);
  const [added, setAdded] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState("");

  const ACCOUNTS_API = process.env.REACT_APP_API_HOST;

  const type = item.media_type;
  console.log("Type:", type);

  const filteredActors =
    credits && credits.cast
      ? credits.cast.filter((actor) => actor.known_for_department === "Acting")
      : [];

  let actors = "";
  for (let actor of filteredActors.slice(0, 15)) {
    actors = actors + actor["name"] + ", ";
  }

  // const fetchTrailers = async (item_type, item_id) => {
  //   try {
  //     const response = await fetch(
  //       `${ACCOUNTS_API}/trailer/videos/${item_type}/${item_id}`
  //     );
  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log("API Response:", data);

  //       const trailerKey = data.videos[0].key;
  //       console.log("Video Key:", trailerKey);

  //       if (trailerKey) {
  //         const trailerUrl = `https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1`;
  //         return trailerUrl;
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Failed to fetch trailer:", error);
  //   }
  //   return null;
  // };

  // const fetchCreditsData = async () => {
  //   const creditsUrl =
  //     type === "movie"
  //       ? `${ACCOUNTS_API}/movies/credits?movie_id=${item.id}`
  //       : `${ACCOUNTS_API}/shows/credits?series_id=${item.id}`;
  //   const response = await fetch(creditsUrl);
  //   if (response.ok) {
  //     const data = await response.json();
  //     setCredits(data);
  //   }
  // };

  const handleSeenItClick = async () => {
    if (seenIt) {
      await deleteFromSeenIt();
    } else {
      await addToSeenIt();
    }
    setSeenIt(!seenIt);
  };

  const addToSeenIt = async () => {
    const url = `${ACCOUNTS_API}/api/seen_it`;
    const data = {
      title: item.title,
      tmdb_id: item.id,
      synopsis: item.overview,
      actors: actors,
      backdrop_img: item.backdrop_path,
      poster_img: item.poster_path,
      account_id: 0,
    };
    console.log("SEEN IT: ", data);
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    };

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      alert("Added to 'Seen It'!");
    } else {
      throw new Error("Request failed");
    }
  };

  const deleteFromSeenIt = async () => {
    const url = `${ACCOUNTS_API}/api/seen_it?title=${encodeURIComponent(
      item.title
    )}`;
    const fetchConfig = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    };

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      alert("Removed from 'Seen It'!");
      setSeenIt(!seenIt);
    } else {
      throw new Error("Request failed");
    }
  };

  const handleAddClick = async (event) => {
    setAdded(!added);

    event.preventDefault();
    const data = {
      title: item.title,
      tmdb_id: item.id,
      synopsis: item.overview,
      actors: actors,
      backdrop_img: item.backdrop_path,
      poster_img: item.poster_path,
      account_id: 0,
    };
    console.log("data:", data);

    const url = `${ACCOUNTS_API}/api/watch_later`;
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
    const fetchTrailers = async (item_type, item_id) => {
      try {
        const response = await fetch(
          `${ACCOUNTS_API}/trailer/videos/${item_type}/${item_id}`
        );
        if (response.ok) {
          const data = await response.json();
          console.log("API Response:", data);

          const trailerKey = data.videos[0].key;
          console.log("Video Key:", trailerKey);

          if (trailerKey) {
            const trailerUrl = `https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1`;
            return trailerUrl;
          }
        }
      } catch (error) {
        console.error("Failed to fetch trailer:", error);
      }
      return null;
    };
    async function fetchTrailerUrl() {
      const url = await fetchTrailers(item.media_type, item.id);
      if (url) {
        setTrailerUrl(url);
      }
    }
    fetchTrailerUrl();
  }, [item.media_type, item.id, ACCOUNTS_API]);
  // [item.media_type, item.id]

  useEffect(() => {
    const fetchCreditsData = async () => {
      const creditsUrl =
        type === "movie"
          ? `${ACCOUNTS_API}/movies/credits?movie_id=${item.id}`
          : `${ACCOUNTS_API}/shows/credits?series_id=${item.id}`;
      const response = await fetch(creditsUrl);
      if (response.ok) {
        const data = await response.json();
        setCredits(data);
      }
    };
    fetchCreditsData();
  }, [ACCOUNTS_API]);

  console.log("Type:", type);
  console.log("Item ID:", item.id);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader className="modal-header">
          {item.title || item.name}
        </ModalHeader>
        <ModalCloseButton className="close-button" />
        <ModalBody className="modal-content">
          <img
            src={imgUrlPrefix + item.poster_path}
            alt={item.title}
            className="modal-img"
          />
          <p>{item.overview}</p>
          <p>Rating: {item.vote_average}</p>
          <TrailerPlayer trailerUrl={trailerUrl} />
        </ModalBody>
        <ModalFooter className="modal-footer">
          <SimpleGrid gap={2} p={4} columns={4}>
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
            <NavLink
              to={
                type === "movie"
                  ? `/movies/${item.id}`
                  : type === "tv"
                  ? `/tv-shows/${item.id}`
                  : "/"
              }
            >
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

export default MovieOrShowModal;
