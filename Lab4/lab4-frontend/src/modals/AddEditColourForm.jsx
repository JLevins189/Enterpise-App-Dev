import { useEffect, useRef } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Rating from "react-rating";

function AddEditColourForm(props) {
  const productTitleRef = useRef();
  const { productTitle, setProductTitle } = props?.productTitle;
  const { productDescription, setProductDescription } =
    props?.productDescription;
  const { productPrice, setProductPrice } = props?.productPrice;
  const { productDiscountPercentage, setProductDiscountPercentage } =
    props?.productDiscountPercentage;
  const { productRating, setProductRating } = props?.productRating;
  const { productStock, setProductStock } = props?.productStock;
  const { productBrand, setProductBrand } = props?.productBrand;
  const { productCategory, setProductCategory } = props?.productCategory;

  const { errorMessage, setErrorMessage } = props?.errorMessage;

  const allowedCategories = [
    "smartphones",
    "laptops",
    "fragrances",
    "skincare",
    "groceries",
    "home-decoration",
  ];

  useEffect(() => {
    //Focus the input
    productTitleRef.current?.focus();
  }, []);

  // useEffect(() => {
  //   if (colourName?.length < 3) {
  //     setErrorMessage((prev) => ({
  //       ...prev,
  //       colourName: "Colour Name must be at least 3 characters",
  //     }));
  //     return;
  //   }

  //   if (colourName?.length >= 25) {
  //     setErrorMessage((prev) => ({
  //       ...prev,
  //       colourName: "Colour Name must be 25 characters or less",
  //     }));
  //     return;
  //   }
  //   if (!colourNameRegex.test(colourName)) {
  //     setErrorMessage((prev) => ({
  //       ...prev,
  //       colourName:
  //         "Colour Name must not contain any special characters apart from - or _",
  //     }));
  //     return;
  //   }

  //   setErrorMessage((prev) => ({ ...prev, colourName: null }));
  // }, [colourName]);

  // useEffect(() => {
  //   if (hexValue?.length < 7 || hexValue?.length > 7) {
  //     setErrorMessage((prev) => ({
  //       ...prev,
  //       hexValue:
  //         "Hex Value must be 6 hex characters following the # character",
  //     }));
  //     return;
  //   }

  //   if (!hexValueRegex.test(hexValue)) {
  //     setErrorMessage((prev) => ({
  //       ...prev,
  //       hexValue:
  //         "Hex value must be in the format #123ABC, using hex characters only",
  //     }));
  //     return;
  //   }

  //   setErrorMessage((prev) => ({ ...prev, hexValue: null }));
  // }, [hexValue]);

  return (
    <Form>
      <Form.Group className="my-2">
        <Form.Label htmlFor="productTitle">Product Title:</Form.Label>
        <Form.Control
          ref={productTitleRef}
          type="text"
          id="productTitle"
          placeholder="e.g iPhone 14"
          autoComplete="off"
          isInvalid={errorMessage?.productTitle}
          onChange={(event) => setProductTitle(event.target.value)} //update state on change
          value={productTitle} //value = state value
          required
        />
        <Form.Control.Feedback type="invalid">
          {errorMessage.productTitle}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="my-2">
        <Form.Label htmlFor="productDescription">
          Product Description:
        </Form.Label>
        <textarea
          id="productDescription"
          className="form-control"
          autoComplete="off"
          placeholder="e.g This product features..."
          isInvalid={errorMessage?.productDescription}
          onChange={(event) => setProductDescription(event.target.value)} //update state on change
          value={productDescription} //value = state value
          required
        />
        <Form.Control.Feedback type="invalid">
          {errorMessage.productDescription}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="my-2">
        <Form.Label htmlFor="productPrice">Product Price ($):</Form.Label>
        <Form.Control
          type="number"
          step="0.01"
          id="productPrice"
          autoComplete="off"
          placeholder="e.g 59.99"
          isInvalid={errorMessage?.productPrice}
          onChange={(event) =>
            setProductPrice(parseFloat(event?.target?.value))
          } //update state on change
          value={productPrice} //value = state value
          required
        />
        <Form.Control.Feedback type="invalid">
          {errorMessage.productPrice}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="my-2">
        <Form.Label htmlFor="productDiscountPercentage">
          Product Discount (%):
        </Form.Label>
        <Row>
          <Col xs={11}>
            <Form.Control
              type="number"
              step="0.01"
              id="productDiscountPercentage"
              autoComplete="off"
              placeholder="e.g 10"
              isInvalid={errorMessage?.productDiscountPercentage}
              onChange={(event) =>
                setProductDiscountPercentage(parseFloat(event?.target?.value))
              } //update state on change
              value={productDiscountPercentage} //value = state value
              required
            />
          </Col>
          <Col xs={1}>
            <span>%</span>
          </Col>
        </Row>

        <Form.Control.Feedback type="invalid">
          {errorMessage.productPrice}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group>
        <Form.Label htmlFor="productRating">Product Rating (0-5):</Form.Label>
        <div className="text-center fs-5">
          <Rating
            initialRating={productRating}
            emptySymbol={<i className="bi bi-star"></i>}
            fullSymbol={<i className="bi bi-star-fill"></i>}
            fractions={10}
            onChange={(rating) => setProductRating(rating)}
          />
          <br />
          <span>{productRating}</span>
          <Form.Control.Feedback type="invalid">
            {errorMessage.productPrice}
          </Form.Control.Feedback>
        </div>
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label htmlFor="productStock">Product Stock:</Form.Label>
        <Form.Control
          type="number"
          step="1"
          placeholder="e.g 10"
          id="productStock"
          autoComplete="off"
          isInvalid={errorMessage?.productStock}
          onChange={(event) => setProductStock(parseInt(event?.target?.value))} //update state on change
          value={productStock} //value = state value
          required
        />
        <Form.Control.Feedback type="invalid">
          {errorMessage.productStock}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="my-2">
        <Form.Label htmlFor="productBrand">Product Brand:</Form.Label>
        <Form.Control
          type="text"
          id="productBrand"
          placeholder="e.g Apple"
          autoComplete="off"
          isInvalid={errorMessage?.productBrand}
          onChange={(event) => setProductBrand(event.target.value)} //update state on change
          value={productBrand} //value = state value
          required
        />
        <Form.Control.Feedback type="invalid">
          {errorMessage.productBrand}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="my-2">
        <Form.Label htmlFor="productCategory">Product Category:</Form.Label>
        <Form.Select
          id="productCategory"
          // size="lg"
          value={productCategory}
          onChange={(e) => setProductCategory(e.target.value)}
        >
          {allowedCategories.map((category, i) => (
            <option value={category} key={i}>
              {category.charAt(0).toUpperCase() +
                category?.substring(1, category?.length)}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
    </Form>
  );
}
export default AddEditColourForm;
