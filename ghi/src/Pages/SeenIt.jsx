import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./WatchLater.css";

function SeenIt() {
  const [seenIt, setSeenIt] = useState([]);
  const imgUrlPrefix = "https://image.tmdb.org/t/p/original/";
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const response = await fetch("http://localhost:8000/api/seen_it", {
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
  }, []);

  return (
    <div className="content-container">
      {isLoading ? (
        <div>Loading...</div>
      ) : !seenIt.items || seenIt.items.length === 0 ? (
        <div>
          <h1>There is currently nothing saved to your watch later list.</h1>
        </div>
      ) : (
        <Row xs={1} md={6} className="g-4">
          {seenIt.items.map((media) => (
            <Col key={media.title}>
              <Card className="watchlater-card" style={{ width: "18rem" }}>
                <Card.Img variant="top" src={imgUrlPrefix + media.poster_img} />
                <Card.Body>
                  <Card.Title>{media.title}</Card.Title>
                  <Card.Text>{media.synopsis}</Card.Text>
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
