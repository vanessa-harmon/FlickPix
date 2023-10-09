import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsive } from "../CarouselData";
import { useEffect, useState } from "react";
import './TrendingMoviesCarousel.css'
import MovieModal from "./Modal/MovieModal";
import { Box, Button, useDisclosure } from "@chakra-ui/react";


function RomanceMoviesCarousel() {
    const [romanceMovies, setRomanceMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const genreId = 10749;

    const openModal = (movie) => {
        setSelectedMovie(movie);
        onOpen();
    };

    const closeModal = () => {
        setSelectedMovie(null);
        onClose();
    };

    const fetchRomanceMovies = async () => {
        const response = await fetch(`http://localhost:8000/movies/genre?genre_id=${genreId}`);

        if (response.ok) {
            const data = await response.json();
            const first12Movies = data.results.slice(0, 12);
            setRomanceMovies(first12Movies);
        }
    }

    const imgUrlPrefix = "https://image.tmdb.org/t/p/original/"

    useEffect(() => {
        fetchRomanceMovies();
    }, []);

    return (
        <div>
            <Carousel centerMode={true} infinite={true} responsive={responsive} containerClass="carousel-container">
                {romanceMovies.map((movie, id) => (
                    <div key={id} className='custom-carousel-item' onClick={() => openModal(movie)}>
                        <img src={imgUrlPrefix + movie.poster_path} alt={movie.title} className='carousel-img' />
                    </div>
                ))}
            </Carousel>
            {selectedMovie && (
                <MovieModal movie={selectedMovie} isOpen={isOpen} onClose={closeModal} />
            )}
        </div>
    );
}

export default RomanceMoviesCarousel;
