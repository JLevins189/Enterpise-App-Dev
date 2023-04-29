import { useState } from "react";
import axiosInstance from "util/AxiosInstance";
import CustomModal from "./CustomModal";
import Alert from "react-bootstrap/Alert";
import DeleteModalBody from "./DeleteModalBody";
import { useNavigate, useParams } from "react-router-dom";

function DeleteProductModal({ modalOpen, setModalOpen, product }) {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [successDeletingProduct, setSuccessDeletingProduct] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});

  const handleDeleteProductRequest = async () => {
    setSuccessDeletingProduct((prev) => false);

    try {
      const response = await axiosInstance.delete(`/products/${productId}`);
      //success (deleted) - Add success alert
      setSuccessDeletingProduct((prev) => true);
      //Clear error
      setErrorMessage((prev) => ({
        ...prev,
        requestError: null,
      }));
      setTimeout(() => {
        navigate("/");
      }, 200);
    } catch (err) {
      console.log(err);
      //Remove success alert
      setSuccessDeletingProduct((prev) => false);

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
      modalTitle={`Delete ${
        product?.title && product?.brand
          ? `${product?.brand} ${product?.title}`
          : "Product"
      }`}
      modalBody={
        <>
          <DeleteModalBody product={product} />

          {/* error alert */}
          {errorMessage?.requestError ? (
            <Alert variant="danger" className="mt-3">
              {errorMessage?.requestError ||
                "An error occurred deleting the product"}
            </Alert>
          ) : null}

          {/* success alert */}
          {successDeletingProduct ? (
            <Alert variant="success" className="mt-3">
              Product deleted successfully
            </Alert>
          ) : null}
        </>
      }
      saveHandler={handleDeleteProductRequest}
      saveButtonText={"Delete Product"}
      buttonVariant="danger"
      closable
    />
  );
}

export default DeleteProductModal;
