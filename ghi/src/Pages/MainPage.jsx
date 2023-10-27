import "./MainPage.css";
import TrendingMoviesCarousel from "../Components/Carousel/Movies/TrendingMoviesCarousel";
import NewMoviesCarousel from "../Components/Carousel/Movies/NewMoviesCarousel";
import TrendingShowsCarousel from "../Components/Carousel/Shows/TrendingShows";
import NewShowsCarousel from "../Components/Carousel/Shows/NewShows";
import PopularCarousel from "../Components/Carousel/MainPageCarousel";

function MainPage() {
  return (
    <>
      <div className="main-container">
        <div className="centered-carousel">
          <PopularCarousel className="slider" />
        </div>
        <h1>New Movies</h1>
        <NewMoviesCarousel className="slider" />
        <h1>Trending Movies</h1>
        <TrendingMoviesCarousel className="slider" />
        <h1>Latest Shows</h1>
        <NewShowsCarousel className="slider" />
        <h1>Trending TV</h1>
        <TrendingShowsCarousel className="slider" />
      </div>
    </>
  );
}

export default MainPage;
