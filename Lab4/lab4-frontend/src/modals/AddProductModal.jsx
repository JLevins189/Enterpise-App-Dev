import { useState } from "react";
import CustomModal from "./CustomModal";
import AddProductColourForm from "./AddEditProductForm";
import axiosInstance from "util/AxiosInstance";
import Alert from "react-bootstrap/Alert";

function AddProductModal({ modalOpen, setModalOpen, setProductData }) {
  const [successAddingProduct, setSuccessAddingProduct] = useState(false);

  const [productTitle, setProductTitle] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState(0.0);
  const [productDiscountPercentage, setProductDiscountPercentage] =
    useState(0.0);
  const [productRating, setProductRating] = useState(0.0);
  const [productStock, setProductStock] = useState(0);
  const [productBrand, setProductBrand] = useState("");
  const [productCategory, setProductCategory] = useState("");

  const [errorMessage, setErrorMessage] = useState({});

  const isButtonDisabled = () => {
    if (
      errorMessage?.productTitle !== null ||
      errorMessage?.productDescription !== null ||
      errorMessage?.productPrice !== null ||
      errorMessage?.productDiscountPercentage !== null ||
      errorMessage?.productRating !== null ||
      errorMessage?.productStock !== null ||
      errorMessage?.productBrand !== null ||
      errorMessage?.productCategory !== null
    ) {
      console.log("disabled", errorMessage);
      return true;
    }
    return false;
  };

  const handleAddColourRequest = async () => {
    try {
      const response = await axiosInstance.post("/products", {
        productTitle,
        productDescription,
        productPrice,
        productDiscountPercentage,
        productRating,
        productStock,
        productBrand,
        productCategory,
      });

      //success
      if (response?.status === 201) {
        //Add to current list
        setProductData((prev) => [...prev, response?.data]);
        //Add success alert
        setSuccessAddingProduct((prev) => true);
        //Clear error
        setErrorMessage((prev) => ({
          ...prev,
          requestError: null,
        }));
      }
    } catch (err) {
      console.log(err);
      //Remove success alert
      setSuccessAddingProduct((prev) => false);

      //Show error alert
      setErrorMessage((prev) => ({
        ...prev,
        requestError: err?.response?.data?.error,
      }));
    }
  };

  return (
    <CustomModal
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
      modalTitle={"Add Product"}
      size="lg"
      modalBody={
        <>
          <AddProductColourForm
            productTitle={{ productTitle, setProductTitle }}
            productDescription={{ productDescription, setProductDescription }}
            productPrice={{ productPrice, setProductPrice }}
            productDiscountPercentage={{
              productDiscountPercentage,
              setProductDiscountPercentage,
            }}
            productRating={{ productRating, setProductRating }}
            productStock={{ productStock, setProductStock }}
            productBrand={{ productBrand, setProductBrand }}
            productCategory={{ productCategory, setProductCategory }}
            errorMessage={{ errorMessage, setErrorMessage }}
          />

          {/* error alert */}
          {errorMessage?.requestError ? (
            <Alert variant="danger" className="mt-3">
              {errorMessage?.requestError ||
                "An error occurred adding the colour"}
            </Alert>
          ) : null}

          {/* success alert */}
          {successAddingProduct ? (
            <Alert variant="success" className="mt-3">
              Colour added successfully
            </Alert>
          ) : null}
        </>
      }
      isButtonDisabled={isButtonDisabled()}
      saveHandler={handleAddColourRequest}
      saveButtonText={"Save Colour"}
      closable
    />
  );
}

export default AddProductModal;
