import DeleteProductModal from "modals/DeleteProductModal";
import EditProductModal from "modals/EditColourModal";
import { useState } from "react";
import { Button } from "react-bootstrap";
import Rating from "react-rating";

function ProductDetailsView({ productData, setProductData }) {
  const [editProductModalOpen, setEditProductModalOpen] = useState(false);
  const [deleteProductModalOpen, setDeleteProductModalOpen] = useState(false);
  return (
    <div>
      <div className="mb-4">
        <h1>{`${productData?.brand} ${productData?.title}`}</h1>
      </div>
      <div className="mb-4">
        <p>{`${productData?.description}`}</p>
      </div>
      <div className="mb-4">
        <h1 className="d-inline-block">{`$${productData?.price}`}</h1>
        {productData?.discountPercentage > 0 && (
          <>
            <span className="ms-4"></span>
            <h1 className="d-inline-block text-danger fs-2">{`-${productData?.discountPercentage}%`}</h1>
          </>
        )}
      </div>
      <div className="mb-4 fs-3 text-warning">
        <Rating
          initialRating={productData?.rating}
          readonly
          emptySymbol={<i className="bi bi-star"></i>}
          fullSymbol={<i className="bi bi-star-fill"></i>}
          fractions={10}
        />
        <span className="ms-3">{productData?.rating}/5</span>
      </div>
      <div className="mb-3">
        <h3 className="d-inline-block">Availability: </h3>
        <span className="ms-3"></span>
        {productData?.stock > 0 ? (
          <p className="d-inline-block text-success fs-4">In Stock</p>
        ) : (
          <p className="d-inline-block text-danger fs-4">
            Not currently available
          </p>
        )}
      </div>
      <div className="d-inline-block me-4">
        <Button onClick={() => setEditProductModalOpen((prev) => true)}>
          Edit Product
        </Button>
      </div>
      <div className="d-inline-block">
        <Button
          variant="danger"
          onClick={() => setDeleteProductModalOpen((prev) => true)}
        >
          Delete Product
        </Button>
      </div>
      <div className="mb-4"></div>
      <EditProductModal
        modalOpen={editProductModalOpen}
        setModalOpen={setEditProductModalOpen}
        product={productData}
        setProductData={setProductData}
      />
      <DeleteProductModal
        modalOpen={deleteProductModalOpen}
        setModalOpen={setDeleteProductModalOpen}
        product={productData}
      />
    </div>
  );
}

export default ProductDetailsView;
