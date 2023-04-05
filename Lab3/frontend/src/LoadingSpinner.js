import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";

function LoadingSpinner() {
  return (
    <Container className="d-flex justify-content-center my-5">
      <Spinner animation="grow" variant="primary" />
    </Container>
  );
}

export default LoadingSpinner;
