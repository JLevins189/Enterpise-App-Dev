import { Col, Row } from "react-bootstrap";
import ProductImageView from "./ProductImageView";
import ProductDetailsView from "./ProductDetailsView";
import Breadcrumb from "react-bootstrap/Breadcrumb";

function ProductView({ productData }) {
  return (
    <>
      <Row className="mb-4">
        <Breadcrumb className="">
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>{`${
            productData?.category.charAt(0).toUpperCase() +
            productData?.category?.substring(1, productData?.category?.length)
          }`}</Breadcrumb.Item>
          <Breadcrumb.Item
            active
          >{`${productData?.brand} ${productData?.title}`}</Breadcrumb.Item>
        </Breadcrumb>
      </Row>
      <Row>
        <Col lg={6}>
          <ProductImageView productImages={productData?.images} />
        </Col>
        <Col lg={6}>
          <ProductDetailsView productData={productData} />
        </Col>
      </Row>
    </>
  );
}

export default ProductView;
