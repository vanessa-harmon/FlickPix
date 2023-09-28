import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsive } from "../CarouselData";
import { useEffect, useState } from "react";
import './TrendingMoviesCarousel.css'
import MovieModal from "./Modal/MovieModal";
import { Box, Button, useDisclosure } from "@chakra-ui/react";


function FamilyMoviesCarousel() {
    const [familyMovies, setFamilyMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const genreId = 10751;

    const openModal = (movie) => {
        setSelectedMovie(movie);
        onOpen();
    };

    const closeModal = () => {
        setSelectedMovie(null);
        onClose();
    };

    const fetchFamilyMovies = async () => {
        const response = await fetch(`http://localhost:8000/movies/genre?genre_id=${genreId}`);

        if (response.ok) {
            const data = await response.json();
            const first12Movies = data.results.slice(0, 12);
            setFamilyMovies(first12Movies);
        }
    }

    const imgUrlPrefix = "https://image.tmdb.org/t/p/original/"

    useEffect(() => {
        fetchFamilyMovies();
    }, []);

    return (
        <div>
            <Carousel centerMode={true} infinite={true} responsive={responsive} containerClass="carousel-container">
                {familyMovies.map((movie, id) => (
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

export default FamilyMoviesCarousel;
