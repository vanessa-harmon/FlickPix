import React from "react";

const TrailerPlayer = ({ trailerUrl }) => {
  return (
    <div style={{ position: "relative", width: "100%", paddingTop: "56.25%" }}>
      <iframe
        title="Trailer"
        width="100%"
        height="100%"
        src={trailerUrl}
        frameBorder="0"
        allowFullScreen
        style={{ position: "absolute", top: "0", left: "0" }}
      />
    </div>
  );
};

export default TrailerPlayer;
