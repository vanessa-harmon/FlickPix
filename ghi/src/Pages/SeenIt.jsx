import React, {useState, useEffect} from 'react'


function SeenIt() {
  const [seenList, setSeenIt] = useState([]);

  const fetchData = async () => {
    const url = `http://localhost:8000/api/seen_it`;
    const response = await fetch(url, {
      credentials: "include",
      });
    if (response.ok) {
      const data = await response.json();
      setSeenIt(data);
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
        <h1>Seen It</h1>
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : !seenList.items || seenList.items.length === 0 ? (
        <div>
          <h1>There is currently nothing saved to your seen it list.</h1>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {seenList.items.map((media) => (
            <div className="col" key={media.id}>
              <div className="card h-100">
                <img
                  src={imgUrlPrefix + media.poster_img}
                  className="card-img-top"
                  alt={media.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{media.title}</h5>
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

export default SeenIt
