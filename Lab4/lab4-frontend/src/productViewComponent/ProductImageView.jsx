import Carousel from "react-bootstrap/Carousel";

function ProductImageView({ productImages }) {
  console.log(productImages);
  return (
    <Carousel fade>
      {productImages
        ?.filter((imageUrl) => !imageUrl.includes("thumbnail"))
        ?.map((imageUrl, i) => (
          <Carousel.Item>
            <img className="d-block w-100 " src={imageUrl} key={i} />
          </Carousel.Item>
        ))}
    </Carousel>
  );
}

export default ProductImageView;
