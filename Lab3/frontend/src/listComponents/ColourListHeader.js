import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function ColourListHeader({ setAddColourModalOpen }) {
  return (
    <Container fluid className="p-0 m-0 mb-4">
      <Row className="mt-4">
        <Col>
          <h1 className="table-cell">Colour List</h1>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Button variant="primary" onClick={() => setAddColourModalOpen(true)}>
            Add Colour
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default ColourListHeader;
