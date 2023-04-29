import Form from "react-bootstrap/Form";

function DeleteModalBody({ product }) {
  return (
    <>
      {product && (
        <Form>
          <p>Are you sure you want to delete {product?.title}</p>
        </Form>
      )}
    </>
  );
}

export default DeleteModalBody;
