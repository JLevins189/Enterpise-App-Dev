import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import Button from "react-bootstrap/Button";

function ProductListHeader({     
  listHeading,
  createElementComponent,
  searchPlaceholder,
  searchValue,
  searchOnChange 
}) {
  return (
    <Container>
      <h1>{listHeading}</h1>
      <Row >
        <Col xs={12} lg={6}>
          <div>{createElementComponent}</div>
        </Col>

        <Col xs={6} md={8} lg={6} >
          <div >
            <input
              type="text"
              className="py-2"
              autoComplete="off"
              placeholder={searchPlaceholder}
              onChange={(e) => searchOnChange(e.target.value)}
              value={searchValue}
              required
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductListHeader;