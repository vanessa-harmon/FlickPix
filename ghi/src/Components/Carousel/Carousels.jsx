import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsive } from "./CarouselData";


function Slider() {

    return (
        <Carousel centerMode={true} infinite={true} responsive={responsive} containerClass="carousel-container">

            <div className="item custom-carousel-item"><img className="carousel-img" src="http://placekitten.com/210" /></div>
            <div className="item custom-carousel-item"><img className="carousel-img" src="http://placekitten.com/220" /></div>
            <div className="item custom-carousel-item"><img className="carousel-img" src="http://placekitten.com/230" /></div>
            <div className="item custom-carousel-item"><img className="carousel-img" src="http://placekitten.com/240" /></div>
            <div className="item custom-carousel-item"><img className="carousel-img" src="http://placekitten.com/250" /></div>
            <div className="item custom-carousel-item"><img className="carousel-img" src="http://placekitten.com/260" /></div>
            <div className="item custom-carousel-item"><img className="carousel-img" src="http://placekitten.com/270" /></div>
            <div className="item custom-carousel-item"><img className="carousel-img" src="http://placekitten.com/280" /></div>
            <div className="item custom-carousel-item"><img className="carousel-img" src="http://placekitten.com/290" /></div>
            <div className="item custom-carousel-item"><img className="carousel-img" src="http://placekitten.com/300" /></div>

        </Carousel>
    );
}

export default Slider;
