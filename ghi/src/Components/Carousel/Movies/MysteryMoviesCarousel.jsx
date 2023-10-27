import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsive } from "../CarouselData";
import { useEffect, useState } from "react";
import './TrendingMoviesCarousel.css'
import MovieModal from "./Modal/MovieModal";
import { useDisclosure } from "@chakra-ui/react";


function MysteryMoviesCarousel() {
    const [mysteryMovies, setMysteryMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const genreId = 9648;

    const openModal = (movie) => {
        setSelectedMovie(movie);
        onOpen();
    };

    const closeModal = () => {
        setSelectedMovie(null);
        onClose();
    };

    const fetchMysteryMovies = async () => {
        const response = await fetch(`http://localhost:8000/movies/genre?genre_id=${genreId}`);

        if (response.ok) {
            const data = await response.json();
            const first12Movies = data.results.slice(0, 12);
            setMysteryMovies(first12Movies);
        }
    }

    const imgUrlPrefix = "https://image.tmdb.org/t/p/original/"

    useEffect(() => {
        fetchMysteryMovies();
    });

    return (
        <div>
            <Carousel centerMode={true} infinite={true} responsive={responsive} containerClass="carousel-container">
                {mysteryMovies.map((movie, id) => (
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

export default MysteryMoviesCarousel;
