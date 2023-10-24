import Slider from "../Components/Carousel/Carousels";
import ActionAdventureShowCarousel from "../Components/Carousel/Shows/ActionAdventureShowCarousel";
import AnimationShowCarousel from "../Components/Carousel/Shows/AnimationShowCarousel";
import ComedyShowCarousel from "../Components/Carousel/Shows/ComedyShowCarousel";
import CrimeShowCarousel from "../Components/Carousel/Shows/CrimeShowCarousel";
import DocumentaryShowCarousel from "../Components/Carousel/Shows/DocumentaryShowCarousel";
import DramaShowCarousel from "../Components/Carousel/Shows/DramaShowCarousel";
import FamilyShowCarousel from "../Components/Carousel/Shows/FamilyShowCarousel";
import KidsShowCarousel from "../Components/Carousel/Shows/KidsShowCarousel";
import MysteryShowCarousel from "../Components/Carousel/Shows/MysteryShowCarousel";
import RealityShowCarousel from "../Components/Carousel/Shows/RealityShowCarousel";
import SciFiShowCarousel from "../Components/Carousel/Shows/SciFiShowCarousel";
import SoapOperaShowCarousel from "../Components/Carousel/Shows/SoapOperaShowCarousel";
import TalkShowCarousel from "../Components/Carousel/Shows/TalkShowCarousel";
import WarShowCarousel from "../Components/Carousel/Shows/WarPoliticsShowCarousel";
import WesternShowCarousel from "../Components/Carousel/Shows/WesternShowCarousel";
import NewShowsCarousel from "../Components/Carousel/Shows/NewShows";
import TrendingShowsCarousel from "../Components/Carousel/Shows/TrendingShows";
import "./MainPage.css"



function ShowsPage() {

    return (
        <>
            <div className="main-container">
                <h1>Top Pix for You</h1>
                <Slider className="slider" />
                <h1>New Shows</h1>
                <NewShowsCarousel className="slider" />
                <h1>Trending Shows</h1>
                <TrendingShowsCarousel className="slider" />
                <h1>Action/Adventure</h1>
                <ActionAdventureShowCarousel className="slider" />
                <h1>Animation</h1>
                <AnimationShowCarousel className="slider" />
                <h1>Comedy</h1>
                <ComedyShowCarousel className="slider" />
                <h1>Crime</h1>
                <CrimeShowCarousel className="slider" />
                <h1>Documentary</h1>
                <DocumentaryShowCarousel className="slider" />
                <h1>Drama</h1>
                <DramaShowCarousel className="slider" />
                <h1>Family</h1>
                <FamilyShowCarousel className="slider" />
                <h1>Kid's</h1>
                <KidsShowCarousel className="slider" />
                <h1>Mystery</h1>
                <MysteryShowCarousel className="slider" />
                <h1>Reality</h1>
                <RealityShowCarousel className="slider" />
                <h1>Sci-Fi</h1>
                <SciFiShowCarousel className="slider" />
                <h1>Soap Opera's</h1>
                <SoapOperaShowCarousel className="slider" />
                <h1>Talk Show</h1>
                <TalkShowCarousel className="slider" />
                <h1>War</h1>
                <WarShowCarousel className="slider" />
                <h1>Western</h1>
                <WesternShowCarousel className="slider" />
            </div>

        </>
    )
}

export default ShowsPage;
