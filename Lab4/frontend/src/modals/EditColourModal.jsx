import { useState } from "react";
import axiosInstance from "util/AxiosInstance";
import CustomModal from "./CustomModal";
import Alert from "react-bootstrap/Alert";
import { useParams } from "react-router-dom";
import EditProductForm from "./EditProductForm";

function EditProductModal({
  modalOpen,
  setModalOpen,
  product,
  setProductData,
}) {
  const { productId } = useParams();
  const [successEditingProduct, setSuccessEditingProduct] = useState(false);

  const [productTitle, setProductTitle] = useState(product?.title);
  const [productDescription, setProductDescription] = useState(
    product?.description
  );
  const [productPrice, setProductPrice] = useState(product?.price);
  const [productDiscountPercentage, setProductDiscountPercentage] = useState(
    product?.discountPercentage
  );
  const [productRating, setProductRating] = useState(product?.rating);
  const [productStock, setProductStock] = useState(product?.stock);
  const [productBrand, setProductBrand] = useState(product?.brand);
  const [productCategory, setProductCategory] = useState(product?.category);

  const [errorMessage, setErrorMessage] = useState({});

  const isButtonDisabled = () => {
    if (
      errorMessage?.productTitle !== null ||
      errorMessage?.productDescription !== null ||
      errorMessage?.productPrice !== null ||
      errorMessage?.productDiscountPercentage !== null ||
      errorMessage?.productRating !== null ||
      errorMessage?.productStock !== null
    ) {
      return true;
    }
    return false;
  };

  const handleEditProductRequest = async () => {
    setSuccessEditingProduct((prev) => false);

    try {
      const response = await axiosInstance.put(`/products/${productId}`, {
        productTitle,
        productDescription,
        productPrice,
        productDiscountPercentage,
        productRating,
        productStock,
      });

      setErrorMessage((prev) => ({
        ...prev,
        requestError: null,
      }));
      setProductData(response?.data);

      //Add success alert
      setSuccessEditingProduct((prev) => true);
      //Clear error
    } catch (err) {
      console.log(err);
      //Remove success alert
      setSuccessEditingProduct((prev) => false);

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
      size="lg"
      modalTitle={"Edit Product"}
      modalBody={
        <>
          <EditProductForm
            productTitle={{ productTitle, setProductTitle }}
            productDescription={{ productDescription, setProductDescription }}
            productPrice={{ productPrice, setProductPrice }}
            productDiscountPercentage={{
              productDiscountPercentage,
              setProductDiscountPercentage,
            }}
            productRating={{ productRating, setProductRating }}
            productStock={{ productStock, setProductStock }}
            productBrand={{ productBrand }}
            productCategory={{ productCategory }}
            errorMessage={{ errorMessage, setErrorMessage }}
          />

          {/* error alert */}
          {errorMessage?.requestError ? (
            <Alert variant="danger" className="mt-3">
              {errorMessage?.requestError ||
                "An error occurred editing the product"}
            </Alert>
          ) : null}

          {/* success alert */}
          {successEditingProduct ? (
            <Alert variant="success" className="mt-3">
              Product edited successfully
            </Alert>
          ) : null}
        </>
      }
      isButtonDisabled={isButtonDisabled()}
      saveHandler={handleEditProductRequest}
      saveButtonText={"Save Changes"}
      closable
    />
  );
}

export default EditProductModal;
