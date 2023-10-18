import React, { useEffect, useState } from "react";
import "./Randomizer.css";

function Randomizer() {
  const [random, setRandom] = useState([]);
  const fetchRandom = async () => {
    const randomUrl = "http://localhost:8000/movies/random";
    const response = await fetch(randomUrl);
    if (response.ok) {
      const data = await response.json();
      setRandom(data);
    }
  };

  useEffect(() => {
    fetchRandom();
  }, []);
  return (
    <div className="shuffle-container">
      <button>
        <img
          src="shuffle.png"
          alt="Shuffle Button"
          className="shuffle-button"
        />
      </button>
    </div>
  );
}

export default Randomizer;
