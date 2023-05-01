import { useState, useEffect, useMemo } from "react";
import axiosInstance from "util/AxiosInstance.jsx";
import ProductListHeader from "listComponents/ProductListHeader.jsx";
import ProductDataList from "listComponents/ProductDataList.jsx";
import LoadingSpinner from "util/LoadingSpinner.jsx";
import FetchError from "util/FetchError.jsx";
import AddProductModal from "modals/AddProductModal.jsx";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

function Homepage() {
  const [fetchProductsRequestComplete, setFetchProductsRequestComplete] =
    useState(false);
  const [fetchErrorOccurred, setFetchErrorOccurred] = useState(false);

  const [addProductModalOpen, setAddProductModalOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [chosenCategory, setChosenCategory] = useState("");
  const [productData, setProductData] = useState([]);

  const filteredProducts = useMemo(() => {
    if (productData?.length < 1) {
      return [];
    }
    //Apply category filter if "all" not chosen
    const filteredByCategory =
      chosenCategory === "all" || !chosenCategory
        ? productData
        : productData?.filter(
            (product) => product?.category === chosenCategory
          );
    return filteredByCategory?.filter((product) => {
      return (
        //Search query
        product?.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product?.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product?.title + " " + product?.brand)
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        (product?.brand + " " + product?.title)
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    });
  }, [searchQuery, chosenCategory, productData]);

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
            chosenCategory={chosenCategory}
            setChosenCategory={setChosenCategory}
          />
          <ProductDataList
            productData={productData}
            filteredProducts={filteredProducts}
          />
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
