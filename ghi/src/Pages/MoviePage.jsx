import Slider from "../Components/Carousel/Carousels";
import "./MainPage.css";
import TrendingMoviesCarousel from "../Components/Carousel/Movies/TrendingMoviesCarousel";
import NewMoviesCarousel from "../Components/Carousel/Movies/NewMoviesCarousel";
import ActionMoviesCarousel from "../Components/Carousel/Movies/ActionMoviesCarousel";
import AdventureMoviesCarousel from "../Components/Carousel/Movies/AdventureMoviesCarousel";
import AnimeMoviesCarousel from "../Components/Carousel/Movies/AnimeMoviesCarousel";
import ComedyMoviesCarousel from "../Components/Carousel/Movies/ComedyMoviesCarousel";
import CrimeMoviesCarousel from "../Components/Carousel/Movies/CrimeMoviesCarousel";
import DocumentaryMoviesCarousel from "../Components/Carousel/Movies/DocumentaryMoviesCarousel";
import DramaMoviesCarousel from "../Components/Carousel/Movies/DramaMoviesCarousel";
import FamilyMoviesCarousel from "../Components/Carousel/Movies/FamilyMoviesCarousel";
import FantasyMoviesCarousel from "../Components/Carousel/Movies/FantasyMoviesCarousel";
import HorrorMoviesCarousel from "../Components/Carousel/Movies/HorrorMoviesCarousel";
import MysteryMoviesCarousel from "../Components/Carousel/Movies/MysteryMoviesCarousel";
import RomanceMoviesCarousel from "../Components/Carousel/Movies/RomanceMoviesCarousel";
import ScienceFictionMoviesCarousel from "../Components/Carousel/Movies/ScienceFictionMoviesCarousel";
import ThrillerMoviesCarousel from "../Components/Carousel/Movies/ThrillerMoviesCarousel";
import WarMoviesCarousel from "../Components/Carousel/Movies/WarMoviesCarousel";

function MoviePage() {
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
        <ActionMoviesCarousel className="slider" />
        <h1>Adventure</h1>
        <AdventureMoviesCarousel className="slider" />
        <h1>Animation</h1>
        <AnimeMoviesCarousel className="slider" />
        <h1>Comedy</h1>
        <ComedyMoviesCarousel className="slider" />
        <h1>Crime</h1>
        <CrimeMoviesCarousel className="slider" />
        <h1>Documentary</h1>
        <DocumentaryMoviesCarousel className="slider" />
        <h1>Drama</h1>
        <DramaMoviesCarousel className="slider" />
        <h1>Family</h1>
        <FamilyMoviesCarousel className="slider" />
        <h1>Fantasy</h1>
        <FantasyMoviesCarousel className="slider" />
        <h1>Horror</h1>
        <HorrorMoviesCarousel className="slider" />
        <h1>Mystery</h1>
        <MysteryMoviesCarousel className="slider" />
        <h1>Romance</h1>
        <RomanceMoviesCarousel className="slider" />
        <h1>Science Fiction</h1>
        <ScienceFictionMoviesCarousel className="slider" />
        <h1>Thriller</h1>
        <ThrillerMoviesCarousel className="slider" />
        <h1>War</h1>
        <WarMoviesCarousel className="slider" />
      </div>
    </>
  );
}

export default MoviePage;
