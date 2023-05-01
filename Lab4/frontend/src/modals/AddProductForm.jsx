import { useEffect, useRef } from "react";
import Form from "react-bootstrap/Form";
import Rating from "react-rating";

function AddProductForm(props) {
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
  const { productImages, setProductImages } = props?.productImages;
  const { productCategory, setProductCategory } = props?.productCategory;

  const { errorMessage, setErrorMessage } = props?.errorMessage;

  const wordCharacterRegex = /^[\w\s-]+$/; //Word characters only
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

  useEffect(() => {
    if (!productTitle || productTitle.length < 4) {
      setErrorMessage((prev) => ({
        ...prev,
        productTitle: "Product Title must be at least 4 characters",
      }));
      return;
    }
    if (productTitle.length > 25) {
      setErrorMessage((prev) => ({
        ...prev,
        productTitle: "Product Title must be no more than 25 characters",
      }));
      return;
    }
    if (!wordCharacterRegex.test(productTitle)) {
      setErrorMessage((prev) => ({
        ...prev,
        productTitle: "Product Title must be at least 3 characters",
      }));
      return;
    }

    setErrorMessage((prev) => ({ ...prev, productTitle: null }));
  }, [productTitle]);

  useEffect(() => {
    if (!productDescription || productDescription?.split(" ")?.length < 5) {
      setErrorMessage((prev) => ({
        ...prev,
        productDescription: "Product Description must contain at least 5 words",
      }));
      return;
    }
    if (productDescription?.split(" ")?.length > 200) {
      setErrorMessage((prev) => ({
        ...prev,
        productDescription:
          "Product Description must contain no more than 200 words",
      }));
      return;
    }

    setErrorMessage((prev) => ({ ...prev, productDescription: null }));
  }, [productDescription]);

  useEffect(() => {
    if (typeof productPrice !== "number" || isNaN(productPrice)) {
      setErrorMessage((prev) => ({
        ...prev,
        productPrice: "Product Price must be a number",
      }));
      return;
    }
    if (productPrice < 0.01) {
      setErrorMessage((prev) => ({
        ...prev,
        productPrice: "Product Price must be at least 0.01",
      }));
      return;
    }

    setErrorMessage((prev) => ({ ...prev, productPrice: null }));
  }, [productPrice]);

  useEffect(() => {
    if (
      typeof productDiscountPercentage !== "number" ||
      isNaN(productDiscountPercentage)
    ) {
      setErrorMessage((prev) => ({
        ...prev,
        productDiscountPercentage: "Product Discount must be a number",
      }));
      return;
    }
    if (productDiscountPercentage < 0) {
      setErrorMessage((prev) => ({
        ...prev,
        productDiscountPercentage: "Product Discount must be at least 0",
      }));
      return;
    }
    if (productDiscountPercentage > 99) {
      setErrorMessage((prev) => ({
        ...prev,
        productDiscountPercentage: "Product Discount must less than 100",
      }));
      return;
    }

    setErrorMessage((prev) => ({ ...prev, productDiscountPercentage: null }));
  }, [productDiscountPercentage]);

  useEffect(() => {
    if (typeof productRating !== "number" || isNaN(productRating)) {
      setErrorMessage((prev) => ({
        ...prev,
        productRating: "Product Rating must be a number",
      }));
      return;
    }
    if (productRating < 0) {
      setErrorMessage((prev) => ({
        ...prev,
        productRating: "Product Rating must be at least 0",
      }));
      return;
    }
    if (productRating > 5) {
      setErrorMessage((prev) => ({
        ...prev,
        productRating: "Product Rating must not be greater than 5",
      }));
      return;
    }

    setErrorMessage((prev) => ({ ...prev, productRating: null }));
  }, [productRating]);

  useEffect(() => {
    if (typeof productStock !== "number" || isNaN(productStock)) {
      setErrorMessage((prev) => ({
        ...prev,
        productStock: "Product Stock must be a number",
      }));
      return;
    }
    if (productStock < 0) {
      setErrorMessage((prev) => ({
        ...prev,
        productStock: "Product Stock must be at least 0",
      }));
      return;
    }

    setErrorMessage((prev) => ({ ...prev, productStock: null }));
  }, [productStock]);

  useEffect(() => {
    if (!productBrand || productBrand?.trim().length < 4) {
      setErrorMessage((prev) => ({
        ...prev,
        productBrand: "Product Brand must be at least 4 letters",
      }));
      return;
    }
    if (productBrand?.trim().length > 25) {
      setErrorMessage((prev) => ({
        ...prev,
        productBrand: "Product Brand must be less than 26 letters",
      }));
      return;
    }
    if (!wordCharacterRegex.test(productBrand)) {
      setErrorMessage((prev) => ({
        ...prev,
        productBrand: "Product Brand must only contain standard characters",
      }));
      return;
    }

    setErrorMessage((prev) => ({ ...prev, productBrand: null }));
  }, [productBrand]);

  useEffect(() => {
    if (productImages?.length < 1) {
      setErrorMessage((prev) => ({
        ...prev,
        productImages: "Product Images must contain at least 1 image",
      }));
      return;
    }

    setErrorMessage((prev) => ({ ...prev, productImages: null }));
  }, [productImages]);

  useEffect(() => {
    if (!productCategory || !allowedCategories.includes(productCategory)) {
      setErrorMessage((prev) => ({
        ...prev,
        productCategory: "Invalid category",
      }));
      return;
    }

    setErrorMessage((prev) => ({ ...prev, productCategory: null }));
  }, [productCategory]);

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
          className={`form-control ${
            errorMessage?.productDescription !== null ? "is-invalid" : null
          }`}
          autoComplete="off"
          placeholder="e.g This product features..."
          isInvalid={errorMessage?.productDescription}
          onChange={(event) => {
            console.log(event.target.value, productDescription);
            setProductDescription(event.target.value);
          }} //update state on change
          value={productDescription} //value = state value
          required
        />
        <Form.Control.Feedback type="invalid">
          {errorMessage.productDescription}
        </Form.Control.Feedback>{" "}
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

        <Form.Control.Feedback type="invalid">
          {errorMessage.productDiscountPercentage}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="productRating">Product Rating (0-5):</Form.Label>
        <div className="text-center fs-5 text-primary">
          <Rating
            initialRating={productRating}
            emptySymbol={<i className="bi bi-star"></i>}
            fullSymbol={<i className="bi bi-star-fill"></i>}
            fractions={10}
            onChange={(rating) => setProductRating(rating)}
          />
          <br />
          <span className="is-invalid">{productRating}</span>
          <Form.Control.Feedback type="invalid">
            {errorMessage.productRating}
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
        <Form.Label>Product Images:</Form.Label>
        <Form.Control
          type="file"
          accept="image/*"
          isInvalid={errorMessage?.productImages}
          multiple
          onChange={(e) => setProductImages(Array.from(e.target.files))}
        />
        <Form.Control.Feedback type="invalid">
          {errorMessage.productImages}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="my-2">
        <Form.Label htmlFor="productCategory">Product Category:</Form.Label>
        <Form.Select
          id="productCategory"
          isInvalid={errorMessage?.productCategory}
          // size="lg"
          value={productCategory}
          onChange={(e) => setProductCategory(e.target.value)}
        >
          <option value="" selected disabled hidden>
            Choose here
          </option>

          {allowedCategories.map((category, i) => (
            <option value={category} key={i}>
              {category.charAt(0).toUpperCase() +
                category?.substring(1, category?.length)}
            </option>
          ))}
        </Form.Select>

        <Form.Control.Feedback type="invalid">
          {errorMessage.productCategory}
        </Form.Control.Feedback>
      </Form.Group>
    </Form>
  );
}
export default AddProductForm;
