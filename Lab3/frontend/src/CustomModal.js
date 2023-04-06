import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function CustomModal({
  modalOpen,
  setModalOpen,
  modalTitle,
  modalBody,
  size,
  isButtonDisabled,
  buttonVariant,
  saveHandler,
  saveButtonText,
  closable,
}) {
  const handleClose = () => setModalOpen(false);

  return (
    <>
      <Modal
        size={size || "md"}
        backdrop={closable}
        show={modalOpen}
        onHide={handleClose}
      >
        <Modal.Header closeButton={closable}>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>

        <Modal.Body>{modalBody}</Modal.Body>
        <Modal.Footer>
          {closable ? (
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          ) : null}
          <Button
            variant={buttonVariant || "outline-primary"}
            disabled={isButtonDisabled}
            onClick={saveHandler}
          >
            {saveButtonText ? saveButtonText : "Save Changes"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CustomModal;
