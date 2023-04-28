import Row from "react-bootstrap/Row";
import ProductListElement from "./ProductListElement";

function ProductDataList({ productData }) {
  return (
    <Row className="mx-1 mx-lg-5">
      {productData.map((productElement) => (
        <ProductListElement productElement={productElement} />
      ))}
    </Row>
  );
}

export default ProductDataList;
