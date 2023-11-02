import { useState, useCallback } from "react";
import "./App.css";
import Nav from "./Components/Navbar/Navbar.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import MovieDetail from "./Pages/MovieDetail.jsx";
import ShowDetail from "./Pages/ShowDetail.jsx";
import MoviePage from "./Pages/MoviePage.jsx";
import ShowsPage from "./Pages/ShowsPage.jsx";
import SearchResultsPage from "./Pages/SearchResults.jsx";
import SeenIt from "./Pages/SeenIt.jsx";
import WatchLater from "./Pages/WatchLater.jsx";
import MainPage from "./Pages/MainPage.jsx";

function App() {
  const [launchInfo, setLaunchInfo] = useState([]);
  const [error, setError] = useState(null);

  async function getData() {
    let url = `${process.env.REACT_APP_API_HOST}/api/launch-details`;
    console.log("fastapi url: ", url);
    let response = await fetch(url);
    console.log("------- hello? -------");
    let data = await response.json();

    if (response.ok) {
      setLaunchInfo(data.launch_details);
      console.log("got launch data!", launchInfo);
    } else {
      setError(data.message);
      console.log("drat! something happened", error);
    }
  }
  useCallback(() => {
    getData();
    // eslint-disable-next-line
  }, [error, launchInfo]);

  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, "");
  const ACCOUNTS_API = process.env.REACT_APP_API_HOST;

  return (
    <div>
      <BrowserRouter basename={basename}>
        <AuthProvider baseUrl={ACCOUNTS_API}>
          <Nav />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/movies" element={<MoviePage />} />
            <Route path="/tv-shows" element={<ShowsPage />} />
            <Route path="/search-results" element={<SearchResultsPage />} />
            <Route path="/movies/:id" element={<MovieDetail />} />
            <Route path="/tv-shows/:id" element={<ShowDetail />} />
            <Route path="/seen-it" element={<SeenIt />} />
            <Route path="/watch-later" element={<WatchLater />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
