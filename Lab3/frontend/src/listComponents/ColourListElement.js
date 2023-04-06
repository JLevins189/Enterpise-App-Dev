import Button from "react-bootstrap/Button";

function ColourListElement({
  colourElement,
  setEditColourModalOpen,
  setDeleteColourModalOpen,
  setSelectedColourId,
  setBackgroundColor,
}) {
  // <th>ID</th>
  // <th>Colour</th>
  // <th>Name</th>
  // <th>Hex</th>
  // <th>RGB</th>
  // <th>HSL</th>
  // <th>Edit</th>
  // <th>Remove</th>
  // <th>Set As Background</th>
  const convertRgbDataToColumn = (input) => {
    return `rgb(${input?.r},${input?.g},${input?.b})`;
  };
  const convertHslDataToColumn = (input) => {
    return `hsl(${input?.h},${input?.s}%,${input?.l}%)`;
  };

  const handleEdit = () => {
    setSelectedColourId((prev) => colourElement?.colorId);
    setEditColourModalOpen(true);
  };

  const handleDelete = () => {
    setSelectedColourId((prev) => colourElement?.colorId);
    setDeleteColourModalOpen(true);
  };

  const handleSetAsBackground = () => {
    setBackgroundColor(colourElement?.hexString);
    document.cookie = JSON.stringify({
      backgroundColor: colourElement?.hexString,
    });
  };

  return (
    <tr>
      <td className="table-cell">{colourElement?.colorId}</td>
      <td
        className="no-contrast"
        style={{
          backgroundColor: colourElement?.hexString,
          height: "100%",
          minHeight: "20px",
          maxHeight: "250px",
          maxWidth: "250px",
        }}
      ></td>
      <td className="table-cell">{colourElement?.name}</td>
      <td className="table-cell">{colourElement?.hexString}</td>
      <td className="table-cell">
        {convertRgbDataToColumn(colourElement?.rgb)}
      </td>
      <td className="table-cell">
        {convertHslDataToColumn(colourElement?.hsl)}
      </td>
      <td>
        <Button onClick={handleEdit}>Edit Colour</Button>
      </td>
      <td>
        <Button onClick={handleDelete} variant="danger">
          Remove Colour
        </Button>
      </td>
      <td>
        <Button onClick={handleSetAsBackground} variant="warning">
          Set As Background
        </Button>
      </td>
    </tr>
  );
}

export default ColourListElement;
