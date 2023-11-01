import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./WatchLater.css";
import { Accordion } from "@chakra-ui/react";

function WatchLater() {
  const [watchLater, setWatchLater] = useState([]);
  const imgUrlPrefix = "https://image.tmdb.org/t/p/original/";
  const [isLoading, setIsLoading] = useState(true);

  const ACCOUNTS_API = process.env.REACT_APP_API_HOST;

  const handleDeleteClick = async (tmdbId) => {
    console.log("CLICKED DELETE ON: ", tmdbId);
    const url = `${ACCOUNTS_API}/api/watch_later?tmdb_id=${tmdbId}`;
    const fetchConfig = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    };

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      console.log("Item was deleted from Watch Later");
      fetchData();
    } else {
      console.error("Failed to delete item");
    }
  };

  const fetchData = async () => {
    const response = await fetch(`${ACCOUNTS_API}/api/watch_later`, {
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      setWatchLater(data);
    }
  };

  useEffect(() => {
    fetchData().finally(() => {
      setIsLoading(false);
    });
  }, [ACCOUNTS_API]);

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : !watchLater.items || watchLater.items.length === 0 ? (
        <div>
          <h1>There is currently nothing saved to your watch later list.</h1>
        </div>
      ) : (
        <Row xs={1} md={5} className="g-4">
          {watchLater.items.map((media) => (
            <Col key={media.title}>
              <Card className="watchlater-card" style={{ width: "18rem" }}>
                <Card.Img
                  className="watchlater-img"
                  variant="top"
                  src={imgUrlPrefix + media.poster_img}
                />
                <Card.Body className="watchlater-card-body">
                  <Card.Title>{media.title}</Card.Title>
                  <Card.Text>{media.synopsis}</Card.Text>
                  <button
                    className="remove-watchlater-btn"
                    onClick={() => handleDeleteClick(media.tmdb_id)}
                  >
                    Remove
                  </button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default WatchLater;
