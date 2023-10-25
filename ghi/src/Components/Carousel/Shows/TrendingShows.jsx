import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsive } from "../CarouselData";
import { useEffect, useState } from "react";
import "../Movies/TrendingMoviesCarousel.css"
import ShowModal from "./Modal/ShowsModal";
import { Box, Button, useDisclosure } from "@chakra-ui/react";


function TrendingShowsCarousel() {
    const [trendingShows, setTrendingShows] = useState([]);
    const [selectedShow, setSelectedShow] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const openModal = (show) => {
        setSelectedShow(show);
        onOpen();
    };

    const closeModal = () => {
        setSelectedShow(null);
        onClose();
    };

    const fetchTrendingShows = async () => {
        const response = await fetch('http://localhost:8000/shows/trending');

        if (response.ok) {
            const data = await response.json();
            const filteredShows = data.results.filter((show) => show.poster_path !== null);
            const first12Shows = filteredShows.slice(0, 12);
            setTrendingShows(first12Shows);
        }
    }

    const imgUrlPrefix = "https://image.tmdb.org/t/p/original/"

    useEffect(() => {
        fetchTrendingShows();
    }, []);

    return (
        <div>
            <Carousel centerMode={true} infinite={true} responsive={responsive} containerClass="carousel-container">
                {trendingShows.map((show, id) => (
                    <div key={id} className='custom-carousel-item' onClick={() => openModal(show)}>
                        <img src={imgUrlPrefix + show.poster_path} alt={show.title} className='carousel-img' />
                    </div>
                ))}
            </Carousel>
            {selectedShow && (
                <ShowModal show={selectedShow} isOpen={isOpen} onClose={closeModal} />
            )}
        </div>
    );
}

export default TrendingShowsCarousel;