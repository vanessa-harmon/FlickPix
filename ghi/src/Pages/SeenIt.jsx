import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./SeenIt.css";

function SeenIt() {
  const [seenIt, setSeenIt] = useState([]);
  const imgUrlPrefix = "https://image.tmdb.org/t/p/original/";
  const [isLoading, setIsLoading] = useState(true);

  const ACCOUNTS_API = process.env.REACT_APP_API_HOST;

  const handleDeleteClick = async (tmdbId) => {
    console.log("CLICKED DELETE ON: ", tmdbId);
    const url = `${ACCOUNTS_API}/api/seen_it?tmdb_id=${tmdbId}`;
    const fetchConfig = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    };

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      console.log("Item was deleted from Seen It");
      fetchData();
    } else {
      console.error("Failed to delete item");
    }
  };

  const fetchData = async () => {
    const response = await fetch(`${ACCOUNTS_API}/api/seen_it`, {
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      setSeenIt(data);
    }
  };

  useEffect(() => {
    fetchData().finally(() => {
      setIsLoading(false);
    });
  }, [ACCOUNTS_API]);

  return (
    <div className="content-container">
      {isLoading ? (
        <div>Loading...</div>
      ) : !seenIt.items || seenIt.items.length === 0 ? (
        <div>
          <h1>There is currently nothing saved to your seen it list.</h1>
        </div>
      ) : (
        <Row xs={1} md={5} className="g-4">
          {seenIt.items.map((media) => (
            <Col key={media.title}>
              <Card className="seenit-card" style={{ width: "18rem" }}>
                <Card.Img variant="top" src={imgUrlPrefix + media.poster_img} />
                <Card.Body className="seenit-card-body">
                  <Card.Title>{media.title}</Card.Title>
                  <Card.Text>{media.synopsis}</Card.Text>
                  <button
                    className="remove-seenit-btn"
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

export default SeenIt;
