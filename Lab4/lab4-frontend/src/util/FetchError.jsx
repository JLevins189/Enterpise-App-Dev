import Container from "react-bootstrap/Container";

function FetchError({ error, suggestion }) {
  return (
    <Container>
      <h1>{error || "Fetching Products Failed."}</h1>
      <p>{suggestion || "Please refresh"} </p>
    </Container>
  );
}

export default FetchError;
