import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ProductImageView from "./ProductImageView";
import ProductDetailsView from "./ProductDetailsView";
import Breadcrumb from "react-bootstrap/Breadcrumb";

function ProductView({ productData, setProductData }) {
  return (
    <>
      <Row className="mb-4 px-1 px-lg-5">
        <Breadcrumb>
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
        <Col lg={6} className="px-5">
          <ProductImageView productImages={productData?.images} />
        </Col>
        <Col lg={6} className="ps-4 ms-lg-0">
          <ProductDetailsView
            productData={productData}
            setProductData={setProductData}
          />
        </Col>
      </Row>
    </>
  );
}

export default ProductView;
