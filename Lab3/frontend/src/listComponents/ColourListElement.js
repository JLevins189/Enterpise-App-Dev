import Button from "react-bootstrap/Button";

function ColourListElement({
  colourElement,
  setEditColourModalOpen,
  setSelectedColourId,
}) {
  // <th>ID</th>
  // <th>Colour</th>
  // <th>Name</th>
  // <th>Hex</th>
  // <th>RGB</th>
  // <th>HSL</th>
  // <th>Edit</th>
  // <th>Remove</th>
  const convertRgbDataToColumn = (input) => {
    return `rgb(${input?.r},${input?.g},${input?.b})`;
  };
  const convertHslDataToColumn = (input) => {
    return `hsl(${input?.h},${input?.s}%,${input?.l}%)`;
  };

  const handleEdit = () => {
    setSelectedColourId(colourElement?.colorId);
    setEditColourModalOpen(true);
  };

  const handleDelete = () => {};

  return (
    <tr>
      <td>{colourElement?.colorId}</td>
      <td
        style={{
          backgroundColor: colourElement?.hexString,
          height: "100%",
          minHeight: "20px",
          maxHeight: "250px",
          maxWidth: "250px",
        }}
      ></td>
      <td>{colourElement?.name}</td>
      <td>{colourElement?.hexString}</td>
      <td>{convertRgbDataToColumn(colourElement?.rgb)}</td>
      <td>{convertHslDataToColumn(colourElement?.hsl)}</td>
      <td>
        <div className="d-flex justify-content-center">
          <Button onClick={handleEdit}>Edit Colour</Button>
        </div>
      </td>
      <td>
        <div className="d-flex justify-content-center">
          <Button variant="danger">Remove Colour</Button>
        </div>
      </td>
    </tr>
  );
}

export default ColourListElement;