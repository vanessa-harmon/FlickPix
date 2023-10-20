import React from 'react';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import './SearchCard.css';

function SearchCard({ title, imageUrl, rating, id, mediaType }) {
    const navigate = useNavigate();

    const handleCardClick = () => {
        let route;

        if (mediaType === 'movie') {
            route = `/movies/${id}`;
        } else if (mediaType === 'tv') {
            route = `/tv-shows/${id}`;
        }

        if (route) {
            navigate(route);
        }
    };



    return (
        <Card className='search-card' onClick={handleCardClick}>
            <Card.Img variant="top" src={imageUrl} alt={`Image`} className='search-img' />
            <Card.Body className="d-flex flex-column">
                <Card.Title>{title}</Card.Title>
                <div className="mt-auto">
                    <Card.Text className="white-text">Rating: {rating}</Card.Text>
                </div>
            </Card.Body>
        </Card>
    );
}

export default SearchCard;
