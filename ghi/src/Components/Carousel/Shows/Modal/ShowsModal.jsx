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
import './ShowModal.css'
import { NavLink } from "react-router-dom";

function ShowModal({ show, isOpen, onClose }) {
    const imgUrlPrefix = "https://image.tmdb.org/t/p/original/";

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
                    <Button className="modal-button-close" colorScheme="whiteAlpha" mr={3} onClick={onClose}>
                        Close
                    </Button>
                    <NavLink to={`/shows/${show.id}`}>
                        <Button colorScheme="whiteAlpha" >More...</Button>
                    </NavLink>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default ShowModal;
