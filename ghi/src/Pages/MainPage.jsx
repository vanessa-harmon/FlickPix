import Slider from "../Components/Carousel/Carousels";
import "./MainPage.css";
import TrendingMoviesCarousel from "../Components/Carousel/Movies/TrendingMoviesCarousel";
import NewMoviesCarousel from "../Components/Carousel/Movies/NewMoviesCarousel";

function MainPage() {
  return (
    <>
      <div className="main-container">
        <h1>Top Pix for You</h1>
        <Slider className="slider" />
        <h1>New Releases</h1>
        <NewMoviesCarousel className="slider" />
        <h1>Trending</h1>
        <TrendingMoviesCarousel className="slider" />
        <h1>Action</h1>
        <Slider className="slider" />
        <h1>Comedy</h1>
        <Slider className="slider" />
      </div>
    </>
  );
}

export default MainPage;
