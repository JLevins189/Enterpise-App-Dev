import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "util/AxiosInstance.jsx";
import LoadingSpinner from "util/LoadingSpinner.jsx";
import FetchError from "util/FetchError.jsx";
import Container from "react-bootstrap/Container";
import ProductView from "productViewComponent/ProductView";

function ProductViewPage() {
  const { productId } = useParams();
  const [fetchProductRequestComplete, setFetchProductRequestComplete] =
    useState(false);
  const [fetchErrorOccurred, setFetchErrorOccurred] = useState(false);
  const [productData, setProductData] = useState({});

  useEffect(() => {
    const getSpecificProductData = async () => {
      try {
        const response = await axiosInstance.get(`/products/${productId}`);
        setProductData(response?.data);
        console.log(response?.data);
      } catch (err) {
        console.log(err);
        setFetchErrorOccurred(true);
      } finally {
        setFetchProductRequestComplete(true);
      }
    };
    getSpecificProductData();
  }, []);

  return (
    <>
      <Container
        fluid
        className="mt-4"
        style={{
          maxWidth: "1920px",
        }}
      >
        {!fetchProductRequestComplete ? (
          <LoadingSpinner />
        ) : fetchErrorOccurred ? (
          <FetchError
            error="An error occured fetching this product"
            suggestion="It may not exist or is temporarily unavailable"
          />
        ) : (
          <ProductView
            productData={productData}
            setProductData={setProductData}
          />
        )}
      </Container>
    </>
  );
}

export default ProductViewPage;
