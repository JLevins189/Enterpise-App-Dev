import { useState } from "react";
import CustomModal from "./CustomModal";
import AddProductForm from "./AddProductForm";
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
  const [productCategory, setProductCategory] = useState(null);
  const [productImages, setProductImages] = useState([]);

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
      errorMessage?.productImages !== null ||
      errorMessage?.productCategory !== null
    ) {
      console.log(errorMessage, productCategory);
      return true;
    }
    return false;
  };

  const getFormData = (object) => {
    const formData = new FormData();
    console.log(object);
    Object.keys(object).forEach((key) => formData.append(key, object[key]));
    productImages.forEach((image, index) => {
      formData.append("images", image, `image_${index}`);
    });
    return formData;
  };

  const handleAddProductRequest = async () => {
    try {
      const response = await axiosInstance.post(
        "/products",
        getFormData({
          productTitle,
          productDescription,
          productPrice,
          productDiscountPercentage,
          productRating,
          productStock,
          productBrand,
          productCategory,
        }),
        {
          headers: { "Content-Type": "multipart/form-data" }, // Set the appropriate content type for file uploads
        }
      );

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
          <AddProductForm
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
            productImages={{ productImages, setProductImages }}
            productCategory={{ productCategory, setProductCategory }}
            errorMessage={{ errorMessage, setErrorMessage }}
          />

          {/* error alert */}
          {errorMessage?.requestError ? (
            <Alert variant="danger" className="mt-3">
              {errorMessage?.requestError ||
                "An error occurred adding the product"}
            </Alert>
          ) : null}

          {/* success alert */}
          {successAddingProduct ? (
            <Alert variant="success" className="mt-3">
              Product added successfully
            </Alert>
          ) : null}
        </>
      }
      isButtonDisabled={isButtonDisabled()}
      saveHandler={handleAddProductRequest}
      saveButtonText={"Save Product"}
      closable
    />
  );
}

export default AddProductModal;
