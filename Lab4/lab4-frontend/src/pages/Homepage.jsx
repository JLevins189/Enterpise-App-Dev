import { useState, useEffect, useMemo } from "react";
import axiosInstance from "@util/AxiosInstance.jsx";
import Navbar from "../Navbar.jsx";
import ColourListHeader from "@listComponents/ColourListHeader.jsx";
import ColourDataList from "@listComponents/ColourDataList.jsx";
import LoadingSpinner from "@util/LoadingSpinner.jsx";
import FetchError from "@util/FetchError.jsx";
import AddColourModal from "@modals/AddColourModal.jsx";
import EditColourModal from "@modals/EditColourModal.jsx";
import DeleteColourModal from "@modals/DeleteColourModal.jsx";
// import Explaination from "@util/Explaination.jsx";
import Container from "react-bootstrap/Container";

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
  const [editColourModalOpen, setEditColourModalOpen] = useState(false);
  const [deleteColourModalOpen, setDeleteColourModalOpen] = useState(false);

  const [selectedColourId, setSelectedColourId] = useState(-1); //for edit/delete button
  const [rememberedRowIndex, setRememberedRowIndex] = useState(-1); //for cookie functionality
  const [backgroundColor, setBackgroundColor] = useState(
    cookies?.backgroundColour
  );
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
          backgroundColor,
        }}
      >
        {/* <Explaination /> */}
        {!fetchProductsRequestComplete ? (
          <LoadingSpinner />
        ) : fetchErrorOccurred ? (
          <FetchError />
        ) : (
          <>
            <ColourListHeader setAddColourModalOpen={setAddColourModalOpen} />
            <ColourDataList
              colourData={productData}
              setEditColourModalOpen={setEditColourModalOpen}
              setDeleteColourModalOpen={setDeleteColourModalOpen}
              setSelectedColourId={setSelectedColourId}
              setBackgroundColor={setBackgroundColor}
              rememberedRowIndex={rememberedRowIndex}
              setRememberedRowIndex={setRememberedRowIndex}
            />
            <AddColourModal
              modalOpen={addColourModalOpen}
              setModalOpen={setAddColourModalOpen}
              setColourData={setProductData}
            />
            {editColourModalOpen && selectedColourId !== -1 && (
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
            )}
          </>
        )}
      </Container>
    </>
  );
}

export default Homepage;