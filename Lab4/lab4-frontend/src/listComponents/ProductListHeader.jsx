import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Form } from "react-bootstrap";
// import Button from "react-bootstrap/Button";

function ProductListHeader({
  listHeading,
  createElementComponent,
  searchPlaceholder,
  searchValue,
  searchOnChange,
}) {
  return (
    <Container fluid className="mb-4 mb-lg-3">
      <h1 className="mx-sm-1 mx-lg-5">{listHeading}</h1>
      <Row className="mt-4 g-0 mx-sm-1 mx-lg-5">
        <Col xs={12} md={6}>
          <div>{createElementComponent}</div>
        </Col>

        <Col
          xs={6}
          md={{ span: 5, offset: 1 }}
          lg={{ span: 4, offset: 2 }}
          className="mt-4 mt-md-0"
        >
          <Form.Control
            type="text"
            className="py-2"
            autoComplete="off"
            placeholder={searchPlaceholder}
            onChange={(e) => searchOnChange(e.target.value)}
            value={searchValue}
            required
          />
        </Col>
      </Row>
    </Container>
  );
}

export default ProductListHeader;
