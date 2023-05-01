import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

function ProductListHeader({
  listHeading,
  createElementComponent,
  searchPlaceholder,
  searchValue,
  searchOnChange,
  chosenCategory,
  setChosenCategory,
}) {
  const allowedCategories = [
    "all",
    "smartphones",
    "laptops",
    "fragrances",
    "skincare",
    "groceries",
    "home-decoration",
  ];

  return (
    <Container fluid className="mb-4 mb-lg-3">
      <h1 className="mx-sm-1 mx-lg-5">{listHeading}</h1>
      <Row className="mt-4 g-0 mx-sm-1 mx-lg-5">
        <Col xs={12} md={2}>
          <div>{createElementComponent}</div>
        </Col>
        <Col xs={12} md={3}>
          <div>
            <Form.Group>
              <Form.Select
                id="chosenCategory"
                className="mx-md-5 mt-3 mt-md-0"
                value={chosenCategory}
                onChange={(e) => setChosenCategory(e.target.value)}
              >
                <option value="" selected disabled hidden>
                  Filter Category
                </option>

                {allowedCategories.map((category, i) => (
                  <option value={category} key={i}>
                    {category.charAt(0).toUpperCase() +
                      category?.substring(1, category?.length)}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </div>
        </Col>

        <Col
          xs={6}
          md={{ span: 5, offset: 2 }}
          lg={{ span: 4, offset: 3 }}
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
