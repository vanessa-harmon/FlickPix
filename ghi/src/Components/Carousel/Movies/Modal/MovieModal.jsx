import React from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
} from "@chakra-ui/react";
import './MovieModal.css'

function MovieModal({ movie, isOpen, onClose }) {
    const imgUrlPrefix = "https://image.tmdb.org/t/p/original/";

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
                    <Button className="modal-button-close" colorScheme="whiteAlpha" mr={3} onClick={onClose}>
                        Close
                    </Button>
                    <Button colorScheme="whiteAlpha" >More...</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default MovieModal;
