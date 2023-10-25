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
import "./ShowModal.css";
import { NavLink } from "react-router-dom";
import { MdOutlineLibraryAddCheck, MdOutlineAddToQueue } from "react-icons/md";

function ShowModal({ show, isOpen, onClose }) {
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
    const creditsUrl = `http://localhost:8000/shows/credits?series_id=${show.id}`;
    const response = await fetch(creditsUrl);
    if (response.ok) {
      const data = await response.json();
      setCredits(data);
    }
  };

  //Seen It
  const handleSeenItClick = async () => {
    if (seenIt) {await deleteFromSeenIt();}
      else {await addToSeenIt();}
    setSeenIt(!seenIt);
  };

  const addToSeenIt = async () => {
    const url = "http://localhost:8000/api/seen_it";
    const data = {
      title: show.original_name,
      tmdb_id: show.id,
      synopsis: show.overview,
      actors: actors,
      backdrop_img: show.backdrop_path,
      poster_img: show.poster_path,
      account_id: 0,
    };
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
    const url = `http://localhost:8000/api/seen_it?title=${encodeURIComponent(show.original_name)}`;
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
    }   else {throw new Error("Request failed");}
  };


  //Watch Later
  const handleAddClick = async (event) => {
    setAdded(!added);

    event.preventDefault();
    const data = {
      title: show.original_name,
      tmdb_id: show.id,
      synopsis: show.overview,
      actors: actors,
      backdrop_img: show.backdrop_path,
      poster_img: show.poster_path,
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
        <ModalHeader className="modal-header">{show.name}</ModalHeader>
        <ModalCloseButton className="close-button" />
        <ModalBody className="modal-content">
          <img
            src={imgUrlPrefix + show.poster_path}
            alt={show.name}
            className="modal-img"
          />
          <p>{show.overview}</p>
          <p>Rating: {show.vote_average}</p>
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
            <NavLink to={`/tv-shows/${show.id}`}>
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

export default ShowModal;
