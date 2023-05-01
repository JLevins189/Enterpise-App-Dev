import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Container className="d-flex mt-5 pt-5 justify-content-center">
      <Col className="mx-auto text-center">
        <Row className="pb-5 mb-4">
          <h2 className="d-inline-block">
            Sorry, the page or file you are looking for does not exist.
          </h2>
        </Row>
        <Row>
          <Container>
            <Button
              variant="primary"
              className="px-5 me-5"
              onClick={() => navigate("/")}
            >
              Go Home
            </Button>
            <Button
              className="px-5"
              onClick={() => navigate(-1)}
              variant={"primary"}
            >
              Go Back
            </Button>{" "}
          </Container>
        </Row>
      </Col>
    </Container>
  );
}

export default NotFoundPage;
