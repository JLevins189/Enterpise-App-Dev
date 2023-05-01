import Row from "react-bootstrap/Row";
import ProductListElement from "./ProductListElement";

function ProductDataList({ productData, filteredProducts }) {
  return (
    <Row className="mx-1 mx-lg-5">
      {productData?.length < 1 ? (
        <h1>No Products Found</h1>
      ) : filteredProducts?.length < 1 ? (
        <h1>No Products Found</h1>
      ) : (
        filteredProducts.map((productElement) => (
          <ProductListElement
            productElement={productElement}
            key={productElement?._id}
          />
        ))
      )}
    </Row>
  );
}

export default ProductDataList;
