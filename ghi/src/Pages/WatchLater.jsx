import React, { useEffect, useState } from 'react'


function WatchLater() {
  const [watchLater, setWatchLater] = useState([]);

  const fetchData = async () => {
    const response = await fetch("http://localhost:8000/api/watch_later", {
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      setWatchLater(data);
    }
  };

  const imgUrlPrefix = "https://image.tmdb.org/t/p/original/";
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData().finally(() => {
      setIsLoading(false);
    });
  }, []);

  return (
    <div>
      <div>
        <h1>Watch Later</h1>
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : !watchLater.items || watchLater.items.length === 0 ? (
        <div>
          <h1>There is currently nothing saved to your watch later list.</h1>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {watchLater.items.map((media) => (
            <div className="col" key={media.id}>
              <div className="card h-100">
                <img
                  src={imgUrlPrefix + media.poster_img}
                  className="card-img-top"
                  alt={media.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{media.title}</h5>
                  {/* <p>Starring: {media.actors}</p> */}
                  <p className="card-text">{media.synopsis}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WatchLater
