import { Component, useEffect, useState } from "react";
import Construct from "./Construct.js";
import ErrorNotification from "./ErrorNotification";
import "./App.css";
import Nav from "./Components/Navbar/Navbar.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import MainPage from "./Pages/MainPage.jsx";
//import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import MovieDetail from "./Pages/MovieDetail.jsx";
import ShowDetail from "./Pages/ShowDetail.jsx";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import MoviePage from "./Pages/MoviePage.jsx";
import ShowsPage from "./Pages/ShowsPage.jsx";

function App() {
  const [launchInfo, setLaunchInfo] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getData() {
      let url = `${process.env.REACT_APP_API_HOST}/api/launch-details`;
      console.log("fastapi url: ", url);
      let response = await fetch(url);
      console.log("------- hello? -------");
      let data = await response.json();

      if (response.ok) {
        console.log("got launch data!");
        setLaunchInfo(data.launch_details);
      } else {
        console.log("drat! something happened");
        setError(data.message);
      }
    }
    getData();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <AuthProvider baseUrl={"http://localhost:8000"}>
          <Nav />
          <Routes>
            {/* <ErrorNotification error={error} /> */}
            {/* <Route path="/" element={<MainPage />} /> */}
            {/* <Construct info={launchInfo} /> */}
            <Route path="movies/:id" element={<MovieDetail />} />
            <Route path="shows/:id" element={<ShowDetail />} />
            <Route path="/movies" element={<MoviePage />} />
            <Route path="/tv-shows" element={<ShowsPage />} />
            {/* <Construct info={launchInfo} /> */}
            <Route path="/movies/:id" element={<MovieDetail />} />
            <Route path="/tv-shows/:id" element={<ShowDetail />} />
          </Routes>
        </AuthProvider>
        {/* <Nav /> */}
        {/* <ErrorNotification error={error} /> */}
        {/* <Routes>
        </Routes> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
