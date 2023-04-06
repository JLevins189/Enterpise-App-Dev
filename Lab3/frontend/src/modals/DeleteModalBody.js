import Form from "react-bootstrap/Form";

function DeleteModalBody({ colour, colourName }) {
  return (
    <>
      {colour && (
        <Form>
          <h4>Are you sure you want to delete {colourName}</h4>
          <div style={{ backgroundColor: colour, height: 50 }}></div>
        </Form>
      )}
    </>
  );
}

export default DeleteModalBody;
