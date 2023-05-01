function CarouselImage({ imgUrl }) {
  return (
    <div className="item">
      <img className="carousel-image" src={imgUrl} />
    </div>
  );
}

export default CarouselImage;
