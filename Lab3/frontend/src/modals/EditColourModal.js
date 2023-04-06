import { useState } from "react";
import axiosInstance from "util/AxiosInstance";
import CustomModal from "./CustomModal";
import AddEditColourForm from "./AddEditColourForm";
import Alert from "react-bootstrap/Alert";

function EditColourModal({
  modalOpen,
  setModalOpen,
  colourData,
  setColourData,
  selectedColourId,
}) {
  const objectBeingUpdated = colourData?.find(
    (colour) => colour.colorId === selectedColourId
  );
  const [successAddingColour, setSuccessAddingColour] = useState(false);
  const [colourName, setColourName] = useState(objectBeingUpdated?.name);
  const [hexValue, setHexValue] = useState(objectBeingUpdated?.hexString);
  const [errorMessage, setErrorMessage] = useState({});

  const isButtonDisabled = () => {
    if (errorMessage?.colourName !== null || errorMessage?.hexValue !== null) {
      return true;
    }
    return false;
  };

  const handleEditColourRequest = async () => {
    if (selectedColourId === -1) {
      //Remove success alert
      setSuccessAddingColour((prev) => false);

      //Show error alert
      setErrorMessage((prev) => ({
        ...prev,
        requestError: "Invalid colour id",
      }));
      return;
    }
    try {
      const response = await axiosInstance.put(`/colours/${selectedColourId}`, {
        hexString: hexValue,
        name: colourName,
      });
      console.log(response);
      //success (created new)
      if (response?.status === 200) {
        //Edit in current list
        setColourData((prev) => {
          const index = colourData.findIndex(
            (colour) => colour?.colorId === response?.data?.colour?.colorId
          );
          const updatedArray = [...prev];
          updatedArray[index] = response?.data?.colour;
          return updatedArray;
        });
      }
      if (response?.status === 201) {
        //Add to current list
        setColourData((prev) => [...prev, response?.data]);
      }

      //Add success alert
      setSuccessAddingColour((prev) => true);
      //Clear error
      setErrorMessage((prev) => ({
        ...prev,
        requestError: null,
      }));
    } catch (err) {
      console.log(err);
      //Remove success alert
      setSuccessAddingColour((prev) => false);

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
      modalTitle={"Title"}
      modalBody={
        <>
          <AddEditColourForm
            colourName={{ colourName, setColourName }}
            hexValue={{ hexValue, setHexValue }}
            errorMessage={{ errorMessage, setErrorMessage }}
          />

          {/* error alert */}
          {errorMessage?.requestError ? (
            <Alert variant="danger" className="mt-3">
              {errorMessage?.requestError ||
                "An error occurred editing the colour"}
            </Alert>
          ) : null}

          {/* success alert */}
          {successAddingColour ? (
            <Alert variant="success" className="mt-3">
              Colour edited successfully
            </Alert>
          ) : null}
        </>
      }
      isButtonDisabled={isButtonDisabled()}
      saveHandler={handleEditColourRequest}
      saveButtonText={"Save Changes"}
      closable
    />
  );
}

export default EditColourModal;
