import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Navbar() {
  return (
    <nav>
      <Container fluid className="p-0 m-0 bg-dark">
        <Row>
          <Col>
            <h1 className="text-white px-lg-5 px-3">Colour DB</h1>
          </Col>
        </Row>
      </Container>
    </nav>
  );
}

export default Navbar;
