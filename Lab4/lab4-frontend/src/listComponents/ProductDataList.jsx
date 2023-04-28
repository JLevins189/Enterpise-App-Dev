import Row from "react-bootstrap/Row";
import ProductListElement from "./ProductListElement";
function ProductDataList({
  productData,
  setEditColourModalOpen,
  setDeleteColourModalOpen,
  setSelectedColourId,
  setBackgroundColor,
  rememberedRowIndex,
  setRememberedRowIndex,
}) {
  return (
    <Row className="mx-sm-1 mx-lg-5">
      {productData.map((productElement) => (
        <ProductListElement productElement={productElement} />
        // <ColourListElement
        //   colourElement={productElement}
        //   key={productElement?.colorId}
        //   setEditColourModalOpen={setEditColourModalOpen}
        //   setDeleteColourModalOpen={setDeleteColourModalOpen}
        //   setSelectedColourId={setSelectedColourId}
        //   setBackgroundColor={setBackgroundColor}
        //   rememberedRowIndex={rememberedRowIndex}
        //   setRememberedRowIndex={setRememberedRowIndex}
        // />
      ))}
    </Row>
  );
}

export default ProductDataList;
