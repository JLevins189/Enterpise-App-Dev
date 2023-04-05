import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function CustomModal(props) {
  const { modalOpen, setModalOpen } = props.modalOpenState;
  const isButtonDisabled = props?.buttonDisabled;
  const buttonVariant = props?.buttonVariant;
  const saveHandler = props.saveHandler;
  const saveButtonText = props.saveButtonText;
  const closable = props?.closable ?? true;
  const handleClose = () => setModalOpen(false);

  return (
    <>
      <Modal
        size={props?.size || "md"}
        backdrop={closable}
        show={modalOpen}
        onHide={handleClose}
      >
        <Modal.Header closeButton={closable}>
          <Modal.Title>{props.modalTitle}</Modal.Title>
        </Modal.Header>

        <Modal.Body>{props.modalBody}</Modal.Body>
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
