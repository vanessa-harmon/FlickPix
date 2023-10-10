import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsive } from "../CarouselData";
import { useEffect, useState } from "react";
import "../Movies/TrendingMoviesCarousel.css"
import MovieModal from "../Movies/Modal/MovieModal";
import { Box, Button, useDisclosure } from "@chakra-ui/react";


function WarShowCarousel() {
    const [warShow, setWarShow] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const genreId = 10768;

    const openModal = (movie) => {
        setSelectedMovie(movie);
        onOpen();
    };

    const closeModal = () => {
        setSelectedMovie(null);
        onClose();
    };

    const fetchWarShow = async () => {
        const response = await fetch(`http://localhost:8000/shows/genre?genre_id=${genreId}`);

        if (response.ok) {
            const data = await response.json();
            const filteredShows = data.results.filter((show) => show.poster_path !== null);
            const first12Shows = filteredShows.slice(0, 12);
            setWarShow(first12Shows);
        }
    }

    const imgUrlPrefix = "https://image.tmdb.org/t/p/original/"

    useEffect(() => {
        fetchWarShow();
    }, []);

    return (
        <div>
            <Carousel centerMode={true} infinite={true} responsive={responsive} containerClass="carousel-container">
                {warShow.map((show, id) => (
                    <div key={id} className='custom-carousel-item' onClick={() => openModal(show)}>
                        <img src={imgUrlPrefix + show.poster_path} alt={show.title} className='carousel-img' />
                    </div>
                ))}
            </Carousel>
            {selectedMovie && (
                <MovieModal movie={selectedMovie} isOpen={isOpen} onClose={closeModal} />
            )}
        </div>
    );
}

export default WarShowCarousel;