import React from "react";
import { useState } from "react";
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
import './MovieModal.css'
import { NavLink } from "react-router-dom";
import { MdOutlineLibraryAddCheck, MdOutlineAddToQueue } from "react-icons/md";

function MovieModal({ movie, isOpen, onClose }) {
    const imgUrlPrefix = "https://image.tmdb.org/t/p/original/";

    const [seenIt, setSeenIt] = useState(false);
    const [added, setAdded] = useState(false);

    const handleSeenItClick = () => {
        setSeenIt(!seenIt);
    };

    const handleAddClick = () => {
        setAdded(!added); // Toggle the state
    };

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
                            <Button colorScheme='twitter' variant='outline' borderRadius="24px">More...</Button>
                        </NavLink>
                        <Button className="modal-button-close" borderRadius="24px" colorScheme='red' variant='outline' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </SimpleGrid>
                </ModalFooter>
            </ModalContent>
        </Modal >
    );
}

export default MovieModal;
