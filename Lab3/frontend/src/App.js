import { useState, useEffect } from "react";
import axiosInstance from "util/AxiosInstance";
import Navbar from "./Navbar";
import ColourListHeader from "listComponents/ColourListHeader";
import ColourDataList from "listComponents/ColourDataList";
import LoadingSpinner from "util/LoadingSpinner";
import FetchError from "util/FetchError";
import AddColourModal from "modals/AddColourModal";
import EditColourModal from "modals/EditColourModal";
import Container from "react-bootstrap/Container";

function App() {
  const [fetchColoursRequestComplete, setFetchColoursRequestComplete] =
    useState(false);
  const [fetchErrorOccurred, setFetchErrorOccurred] = useState(false);

  const [addColourModalOpen, setAddColourModalOpen] = useState(false);
  const [editColourModalOpen, setEditColourModalOpen] = useState(false);
  const [deleteColourModalOpen, setDeleteColourModalOpen] = useState(true);

  const [selectedColourId, setSelectedColourId] = useState(-1); //for edit/delete button
  const [colourData, setColourData] = useState([]);

  useEffect(() => {
    const getColourData = async () => {
      try {
        const response = await axiosInstance.get("/colours");
        console.log(response?.data[1]);
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
      <Container fluid className="mt-4" style={{ maxWidth: "1920px" }}>
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
              setSelectedColourId={setSelectedColourId}
            />
            <AddColourModal
              modalOpen={addColourModalOpen}
              setModalOpen={setAddColourModalOpen}
              setColourData={setColourData}
            />
            {editColourModalOpen && (
              <EditColourModal
                modalOpen={editColourModalOpen}
                setModalOpen={setEditColourModalOpen}
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
