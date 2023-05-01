import Row from "react-bootstrap/Row";
import ProductListElement from "./ProductListElement";
import { useState } from "react";
import { Pagination } from "react-bootstrap";

function ProductDataList({ productData, filteredProducts }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  // Calculate total number of pages
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // const handlePageChange = (page) => {
  //   setCurrentPage(page);
  // };

  const getPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProducts?.slice(startIndex, endIndex);
  };
  return (
    <>
      <Row className="mx-1 mx-lg-5">
        {productData?.length < 1 ? (
          <h1>No Products Found</h1>
        ) : filteredProducts?.length < 1 ? (
          <h1>No Products Found</h1>
        ) : (
          getPageItems().map((productElement) => (
            <ProductListElement
              productElement={productElement}
              key={productElement?._id}
            />
          ))
        )}
        <Pagination>
          <Pagination.First onClick={() => setCurrentPage(1)} />
          <Pagination.Prev
            onClick={() => {
              currentPage > 1 && setCurrentPage((prev) => prev - 1);
            }}
          />
          {Array.from({ length: totalPages }).map((_, index) => (
            <Pagination.Item
              key={index}
              active={currentPage === index + 1}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}{" "}
          <Pagination.Next
            onClick={() => {
              currentPage < totalPages && setCurrentPage((prev) => prev + 1);
            }}
          />
          <Pagination.Last
            onClick={() => {
              currentPage < totalPages && setCurrentPage((prev) => totalPages);
            }}
          />
        </Pagination>
      </Row>
    </>
  );
}

export default ProductDataList;
