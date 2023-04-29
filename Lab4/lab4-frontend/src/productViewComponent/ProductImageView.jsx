import { useState } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import CarouselImage from "./CarouselImage";
import ThumbnailImage from "./ThumbnailImage";

function ProductImageView({ productImages }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  //Owl Carousel Settings
  const options = {
    loop: true,
    center: true,
    items: 1,
    margin: 0,
    autoplay: false,
    dots: false,
    autoplayTimeout: 8500,
    smartSpeed: 450,
    nav: false,
  };

  return (
    <>
      <div className="mb-4">
        <OwlCarousel
          className="owl-carousel owl-theme main-carousel"
          startPosition={selectedImageIndex}
          {...options}
        >
          {productImages.map((imageUrl, i) => {
            return <CarouselImage imgUrl={imageUrl} key={i} />;
          })}
        </OwlCarousel>
      </div>
      <div className="horizontal-thumbnails d-flex justify-content-center">
        <OwlCarousel
          items={4}
          margin={10}
          className="owl-carousel owl-theme"
          dots={false}
          nav
        >
          {productImages.map((imageUrl, i) => {
            return (
              <ThumbnailImage
                imgUrl={imageUrl}
                index={i}
                key={i}
                setSelectedImageIndex={setSelectedImageIndex}
              />
            );
          })}
        </OwlCarousel>
      </div>
    </>
  );
}

export default ProductImageView;
