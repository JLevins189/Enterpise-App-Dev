import { useState, useEffect, useMemo } from "react";
import axiosInstance from "util/AxiosInstance.jsx";
import ProductListHeader from "listComponents/ProductListHeader.jsx";
import ProductDataList from "listComponents/ProductDataList.jsx";
import LoadingSpinner from "util/LoadingSpinner.jsx";
import FetchError from "util/FetchError.jsx";
import AddProductModal from "modals/AddProductModal.jsx";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

//TODO search, add pics
function Homepage() {
  const [fetchProductsRequestComplete, setFetchProductsRequestComplete] =
    useState(false);
  const [fetchErrorOccurred, setFetchErrorOccurred] = useState(false);

  const [addProductModalOpen, setAddProductModalOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    const getAllProductData = async () => {
      try {
        const response = await axiosInstance.get("/products");
        setProductData(response?.data);
      } catch (err) {
        console.log(err);
        setFetchErrorOccurred(true);
      } finally {
        setFetchProductsRequestComplete(true);
      }
    };
    getAllProductData();
  }, []);

  return (
    <Container
      fluid
      className="mt-4"
      style={{
        maxWidth: "1920px",
      }}
    >
      {/* <Explaination /> */}
      {!fetchProductsRequestComplete ? (
        <LoadingSpinner />
      ) : fetchErrorOccurred ? (
        <FetchError />
      ) : (
        <>
          <ProductListHeader
            listHeading={`All Products ${
              productData?.length ? `(${productData?.length})` : null
            }`}
            createElementComponent={
              <Button onClick={() => setAddProductModalOpen(true)}>
                Add New Product
              </Button>
            }
            searchPlaceholder={"Product Name/Brand"}
            searchValue={searchQuery}
            searchOnChange={setSearchQuery}
          />
          <ProductDataList productData={productData} />
          <AddProductModal
            modalOpen={addProductModalOpen}
            setModalOpen={setAddProductModalOpen}
            setProductData={setProductData}
          />
        </>
      )}
    </Container>
  );
}

export default Homepage;
