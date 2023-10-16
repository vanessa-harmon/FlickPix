import React, { useEffect, useState } from 'react'


function WatchLater() {
//   fetch data
  const [watchlist, setWatchList] = useState([]);

  const fetchData = async () => {
    const url = ``;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setWatchList(data);
    }
  };


  return (
    <div className="row row-cols-1 row-cols-md-3 g-4">
      {watchlist.map((media) => (
      <div className="col">
        <div className="card h-100">
          <img
            src="http://placekitten.com/220"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">Title{/* {media.name} */}</h5>
            <p className="card-text">{}</p>
          </div>
        </div>
      </div>
      ))}
    </div>
  );
}

export default WatchLater
