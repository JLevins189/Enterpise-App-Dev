import { useState, useEffect } from "react";
import axiosInstance from "./AxiosInstance";
import Container from "react-bootstrap/Container";
import Navbar from "./Navbar";
import ColourListHeader from "./ColourListHeader";
import ColourDataList from "./ColourDataList";
import LoadingSpinner from "./LoadingSpinner";
import FetchError from "./FetchError";

function App() {
  const [fetchColoursRequestComplete, setFetchColoursRequestComplete] =
    useState(false);
  const [fetchErrorOccured, setFetchErrorOccured] = useState(false);
  const [addColourModalOpen, setAddColourModalOpen] = useState(true);
  const [editColourModalOpen, setEditColourModalOpen] = useState(false);
  const [deleteColourModalOpen, setDeleteColourModalOpen] = useState(true);
  const [selectedColour, setSelectedColour] = useState(-1); //for edit/delete button
  const [colourData, setColourData] = useState([]);

  useEffect(() => {
    const getColourData = async () => {
      try {
        const response = await axiosInstance.get("/colours");
        console.log(response?.data[1]);
        setColourData(response?.data);
      } catch (err) {
        console.log(err);
        setFetchErrorOccured(true);
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
        ) : fetchErrorOccured ? (
          <FetchError />
        ) : (
          <>
            <ColourListHeader setAddColourModalOpen={setAddColourModalOpen} />
            <ColourDataList colourData={colourData} />
          </>
        )}
      </Container>
    </>
  );
}

export default App;
