import { useState, useEffect, useMemo } from "react";
import axiosInstance from "util/AxiosInstance.jsx";
import Navbar from "../Navbar.jsx";
import ProductListHeader from "listComponents/ProductListHeader.jsx";
import ProductDataList from "listComponents/ProductDataList.jsx";
import LoadingSpinner from "util/LoadingSpinner.jsx";
import FetchError from "util/FetchError.jsx";
import AddProductModal from "modals/AddProductModal.jsx";
import EditColourModal from "modals/EditColourModal.jsx";
import DeleteColourModal from "modals/DeleteColourModal.jsx";
// import Explaination from "util/Explaination.jsx";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";

//TODO CORS
function Homepage() {
  const cookies = useMemo(() => {
    const cookiesArr = document?.cookie?.split("; ");

    const cookieJson = {};
    cookiesArr?.forEach((cookie) => {
      const [cookieName, cookieValue] = cookie?.split("=");
      cookieJson[cookieName?.trim()] = cookieValue?.trim();
    });
    return cookieJson;
  }, []);

  const [fetchProductsRequestComplete, setFetchProductsRequestComplete] =
    useState(false);
  const [fetchErrorOccurred, setFetchErrorOccurred] = useState(false);

  const [addColourModalOpen, setAddColourModalOpen] = useState(false);
  //   const [editColourModalOpen, setEditColourModalOpen] = useState(false);
  //   const [deleteColourModalOpen, setDeleteColourModalOpen] = useState(false);

  //   const [selectedColourId, setSelectedColourId] = useState(-1); //for edit/delete button
  //   const [rememberedRowIndex, setRememberedRowIndex] = useState(-1); //for cookie functionality

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

  useEffect(() => {
    console.log(cookies);
    const lastUsedIndex = cookies?.rememberedRowIndex;

    if (!lastUsedIndex) {
      return;
    }

    setRememberedRowIndex(parseInt(lastUsedIndex));
    const rowRef = document.getElementById(`index-${lastUsedIndex}`);

    if (rowRef) {
      rowRef.scrollIntoView({ block: "center" });
    }
  }, [fetchProductsRequestComplete]);

  return (
    <>
      <Navbar />
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
                <Button onClick={() => setAddColourModalOpen(true)}>
                  Add New Product
                </Button>
              }
              searchPlaceholder={"Product Name/Brand"}
              searchValue={searchQuery}
              searchOnChange={setSearchQuery}
            />
            <ProductDataList productData={productData} />
            <AddProductModal
              modalOpen={addColourModalOpen}
              setModalOpen={setAddColourModalOpen}
              setProductData={setProductData}
            />
            {/* {editColourModalOpen && selectedColourId !== -1 && (
              <EditColourModal
                modalOpen={editColourModalOpen}
                setModalOpen={setEditColourModalOpen}
                colourData={productData}
                setColourData={setProductData}
                selectedColourId={selectedColourId}
              />
            )}
            {deleteColourModalOpen && (
              <DeleteColourModal
                modalOpen={deleteColourModalOpen}
                setModalOpen={setDeleteColourModalOpen}
                colourData={productData}
                setColourData={setProductData}
                selectedColourId={selectedColourId}
              />
            )} */}
          </>
        )}
      </Container>
    </>
  );
}

export default Homepage;
