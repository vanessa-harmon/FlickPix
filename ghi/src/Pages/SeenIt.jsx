import React, {useState, useEffect} from 'react'


function SeenIt() {

  const [seenlist, setSeenIt] = useState([]);

  const fetchData = async () => {
    const url = ``;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setSeenIt(data);
    }
  };

  return (
    <div className="row row-cols-1 row-cols-md-3 g-4">
      {seenlist.map((media) => (
      <div className="col">
        <div className="card h-100">
          <img
            src=''
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">Title{}</h5>
            <p className="card-text">{}</p>
          </div>
        </div>
      </div>
      ))}
    </div>
  );
}

export default SeenIt
