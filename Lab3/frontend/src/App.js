import { useState, useEffect, useMemo } from "react";
import axiosInstance from "util/AxiosInstance";
import Navbar from "./Navbar";
import ColourListHeader from "listComponents/ColourListHeader";
import ColourDataList from "listComponents/ColourDataList";
import LoadingSpinner from "util/LoadingSpinner";
import FetchError from "util/FetchError";
import AddColourModal from "modals/AddColourModal";
import EditColourModal from "modals/EditColourModal";
import DeleteColourModal from "modals/DeleteColourModal";
import Container from "react-bootstrap/Container";

function App() {
  const cookies = useMemo(() => {
    const cookiesArr = document.cookie.split("; ");

    const cookieJson = {};
    cookiesArr.forEach((cookie) => {
      const [cookieName, cookieValue] = cookie.split("=");
      cookieJson[cookieName.trim()] = cookieValue.trim();
    });
    return cookieJson;
  }, []);

  const [fetchColoursRequestComplete, setFetchColoursRequestComplete] =
    useState(false);
  const [fetchErrorOccurred, setFetchErrorOccurred] = useState(false);

  const [addColourModalOpen, setAddColourModalOpen] = useState(false);
  const [editColourModalOpen, setEditColourModalOpen] = useState(false);
  const [deleteColourModalOpen, setDeleteColourModalOpen] = useState(false);

  const [selectedColourId, setSelectedColourId] = useState(-1); //for edit/delete button
  const [backgroundColor, setBackgroundColor] = useState(
    cookies?.backgroundColour || "purple"
  );
  const [colourData, setColourData] = useState([]);

  useEffect(() => {
    const getColourData = async () => {
      try {
        const response = await axiosInstance.get("/colours");
        setColourData(response?.data);
      } catch (err) {
        console.log(err);
        setFetchErrorOccurred(true);
      } finally {
        setFetchColoursRequestComplete(true);
      }
    };
    getColourData();
  }, []);

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
        {!fetchColoursRequestComplete ? (
          <LoadingSpinner />
        ) : fetchErrorOccurred ? (
          <FetchError />
        ) : (
          <>
            <ColourListHeader setAddColourModalOpen={setAddColourModalOpen} />
            <ColourDataList
              colourData={colourData}
              setEditColourModalOpen={setEditColourModalOpen}
              setDeleteColourModalOpen={setDeleteColourModalOpen}
              setSelectedColourId={setSelectedColourId}
              setBackgroundColor={setBackgroundColor}
            />
            <AddColourModal
              modalOpen={addColourModalOpen}
              setModalOpen={setAddColourModalOpen}
              setColourData={setColourData}
            />
            {editColourModalOpen && selectedColourId !== -1 && (
              <EditColourModal
                modalOpen={editColourModalOpen}
                setModalOpen={setEditColourModalOpen}
                colourData={colourData}
                setColourData={setColourData}
                selectedColourId={selectedColourId}
              />
            )}
            {deleteColourModalOpen && (
              <DeleteColourModal
                modalOpen={deleteColourModalOpen}
                setModalOpen={setDeleteColourModalOpen}
                colourData={colourData}
                setColourData={setColourData}
                selectedColourId={selectedColourId}
              />
            )}
          </>
        )}
      </Container>
    </>
  );
}

export default App;
