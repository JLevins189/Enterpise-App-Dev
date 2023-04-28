import { useState } from "react";
import axiosInstance from "@util/AxiosInstance";
import CustomModal from "./CustomModal";
import Alert from "react-bootstrap/Alert";
import DeleteModalBody from "./DeleteModalBody";

function DeleteColourModal({
  modalOpen,
  setModalOpen,
  colourData,
  setColourData,
  selectedColourId,
}) {
  console.log(selectedColourId);
  const objectBeingDeleted = colourData?.find(
    (colour) => colour.colorId === selectedColourId
  );
  const [successDeletingColour, setSuccessDeletingColour] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});

  const handleDeleteColourRequest = async () => {
    if (selectedColourId === -1) {
      //Remove success alert
      setSuccessDeletingColour((prev) => false);

      //Show error alert
      setErrorMessage((prev) => ({
        ...prev,
        requestError: "Invalid colour id",
      }));
      return;
    }
    try {
      const response = await axiosInstance.delete(
        `/colours/${selectedColourId}`
      );
      console.log(response);
      //success (deleted)
      if (response?.status === 200) {
        //Delete From in current list
        setColourData((prev) =>
          prev.filter((colour) => colour?.colorId !== selectedColourId)
        );
      }

      //Add success alert
      setSuccessDeletingColour((prev) => true);
      //Clear error
      setErrorMessage((prev) => ({
        ...prev,
        requestError: null,
      }));
    } catch (err) {
      console.log(err);
      //Remove success alert
      setSuccessDeletingColour((prev) => false);

      //Show error alert
      setErrorMessage((prev) => ({
        ...prev,
        requestError: err?.response?.data?.error,
      }));
    }
  };

  return (
    <CustomModal
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
      modalTitle={`Delete ${objectBeingDeleted?.name || "Colour"}`}
      modalBody={
        <>
          <DeleteModalBody
            colour={objectBeingDeleted?.hexString}
            colourName={objectBeingDeleted?.name}
          />

          {/* error alert */}
          {errorMessage?.requestError ? (
            <Alert variant="danger" className="mt-3">
              {errorMessage?.requestError ||
                "An error occurred deleting the colour"}
            </Alert>
          ) : null}

          {/* success alert */}
          {successDeletingColour ? (
            <Alert variant="success" className="mt-3">
              Colour deleted successfully
            </Alert>
          ) : null}
        </>
      }
      saveHandler={handleDeleteColourRequest}
      saveButtonText={"Delete Colour"}
      buttonVariant="danger"
      closable
    />
  );
}

export default DeleteColourModal;
