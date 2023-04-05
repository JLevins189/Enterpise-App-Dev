import { Container } from "react-bootstrap";

function FetchError() {
  return (
    <Container>
      <h1>Fetching Colours Failed.</h1>
      <p>Please refresh </p>
    </Container>
  );
}

export default FetchError;
