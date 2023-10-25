import React, { useState } from "react";
import ReactPlayer from "react-player";

const Video = () => {
  const [play, setPlay] = useState(false);
  const handleMouseEnter = () => {
    setPlay(true);
  };
  const handleMouseLeave = () => {
    setPlay(false);
  };
  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <ReactPlayer
        width="100%"
        playing={play}
        pip
        controls="false"
        config={{ file: { forceHLS: true } }}
        url="YOUTUBE URL"
      />
    </div>
  );
};

export default Video;
