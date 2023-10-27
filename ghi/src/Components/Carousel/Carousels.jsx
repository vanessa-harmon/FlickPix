import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsive } from "./CarouselData";

function CarouselSlider() {
  return (
    <Carousel
      centerMode={true}
      infinite={true}
      responsive={responsive}
      containerClass="carousel-container"
    >
      <div className="item custom-carousel-item">
        <img
          className="carousel-img"
          src="http://placekitten.com/210"
          alt="cat"
        />
      </div>
      <div className="item custom-carousel-item">
        <img
          className="carousel-img"
          src="http://placekitten.com/220"
          alt="cat"
        />
      </div>
      <div className="item custom-carousel-item">
        <img
          className="carousel-img"
          src="http://placekitten.com/230"
          alt="cat"
        />
      </div>
      <div className="item custom-carousel-item">
        <img
          className="carousel-img"
          src="http://placekitten.com/240"
          alt="cat"
        />
      </div>
      <div className="item custom-carousel-item">
        <img
          className="carousel-img"
          src="http://placekitten.com/250"
          alt="cat"
        />
      </div>
      <div className="item custom-carousel-item">
        <img
          className="carousel-img"
          src="http://placekitten.com/260"
          alt="cat"
        />
      </div>
      <div className="item custom-carousel-item">
        <img
          className="carousel-img"
          src="http://placekitten.com/270"
          alt="cat"
        />
      </div>
      <div className="item custom-carousel-item">
        <img
          className="carousel-img"
          src="http://placekitten.com/280"
          alt="cat"
        />
      </div>
      <div className="item custom-carousel-item">
        <img
          className="carousel-img"
          src="http://placekitten.com/290"
          alt="cat"
        />
      </div>
      <div className="item custom-carousel-item">
        <img
          className="carousel-img"
          src="http://placekitten.com/300"
          alt="cat"
        />
      </div>
    </Carousel>
  );
}

export default CarouselSlider;
