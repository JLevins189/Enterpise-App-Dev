import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";

function LoadingSpinner() {
  return (
    <Container className="d-flex justify-content-center my-5 py-5">
      <Spinner animation="grow" variant="primary" className="table-cell" />
    </Container>
  );
}

export default LoadingSpinner;
