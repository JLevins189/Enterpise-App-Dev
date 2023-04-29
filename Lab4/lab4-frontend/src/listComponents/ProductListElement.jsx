import { Link } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Rating from "react-rating";
function ProductListElement({ productElement }) {
  const calculateDiscountedPrice = (originalPrice, discountPercentage) => {
    return originalPrice - originalPrice * (discountPercentage / 100);
  };

  return (
    <Col md={6} xl={4} className="mb-5" style={{ height: "32rem" }}>
      <Card className="d-flex" style={{ height: "30rem" }}>
        <div className="d-flex position-relative">
          <Card.Img
            variant="top"
            src={productElement?.thumbnail}
            className="product-thumbnail"
          />
          <Badge
            bg="danger"
            className="sale-div position-absolute top-0 p-3 m-2 fs-6"
          >
            ~{Math.round(productElement?.discountPercentage)}% off
          </Badge>
        </div>
        <Card.Body>
          <div style={{ height: "6rem" }}>
            <Card.Title>
              <Link to={`/${productElement?._id}`}>
                {`${productElement?.brand} ${productElement?.title}`}
              </Link>
            </Card.Title>
            <Card.Text>
              <div className="product-desc ">{productElement?.description}</div>
            </Card.Text>
          </div>
          <Card.Text className="text-center fs-4 mt-4">
            <Rating
              initialRating={productElement?.rating}
              readonly
              emptySymbol={<i className="bi bi-star"></i>}
              fullSymbol={<i className="bi bi-star-fill"></i>}
              fractions={10}
            />
            <p class="item-price mt-3">
              <strike className="text-danger">
                ${productElement?.price?.toFixed(2)}
              </strike>
              <span className="ms-2"></span>
              <b>
                $
                {calculateDiscountedPrice(
                  productElement?.price?.toFixed(2),
                  productElement?.discountPercentage?.toFixed(2)
                )?.toFixed(2)}
              </b>
            </p>
            {productElement?.stock < 10 && (
              <p className="text-danger fs-5">Low Stock</p>
            )}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default ProductListElement;
