import React, { useEffect, useState } from 'react'


function WatchLater() {
  const [watchLater, setWatchLater] = useState([]);

  const fetchData = async () => {
    const url = `http://localhost:8000/api/watch_later`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setWatchLater(data);
    }
  };

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div>
      <div>
        <h1>Watch Later</h1>
      </div>

      {watchLater.length === 0 ? (
        <div>
          <h1>There is currently nothing saved to your watch later list.</h1>
        </div>
      ) : (

        watchLater.map((media) => (
          <div className="row row-cols-1 row-cols-md-3 g-4">
            <div className="col">
              <div className="card h-100">
                <img
                  src="http://placekitten.com/220"
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">Title</h5>
                  <p className="card-text">{}</p>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default WatchLater
