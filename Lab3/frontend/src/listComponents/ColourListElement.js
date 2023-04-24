import { Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";

function ColourListElement({
  colourElement,
  setEditColourModalOpen,
  setDeleteColourModalOpen,
  setSelectedColourId,
  setBackgroundColor,
  rememberedRowIndex,
  setRememberedRowIndex,
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
    rememberColourIndexCookie();
    setSelectedColourId((prev) => colourElement?.colorId);
    setEditColourModalOpen(true);
  };

  const handleDelete = () => {
    rememberColourIndexCookie();
    setSelectedColourId((prev) => colourElement?.colorId);
    setDeleteColourModalOpen(true);
  };

  const handleSetAsBackground = () => {
    rememberColourIndexCookie();
    setBackgroundColor(colourElement?.hexString);
    const cookieExpiry = "max-age=" + 60 * 60 * 24 * 7 * 52; // 52 weeks (1yr)
    document.cookie =
      `backgroundColour=${colourElement?.hexString};` +
      cookieExpiry +
      ";path=/;";
  };

  //Call this for all buttons and scroll to this colour on refresh
  const rememberColourIndexCookie = () => {
    setRememberedRowIndex(colourElement?.colorId);
    const cookieExpiry = "max-age=" + 60 * 60 * 24 * 7 * 52; // 52 weeks (1yr)
    document.cookie =
      `rememberedRowIndex=${colourElement?.colorId};` +
      cookieExpiry +
      ";path=/;";
  };

  return (
    <tr
      id={`index-${colourElement?.colorId}`}
      className={
        rememberedRowIndex === colourElement?.colorId ? "selectedRow" : null
      }
    >
      <td className="table-cell no-contrast">
        {rememberedRowIndex === colourElement?.colorId ? (
          <Col
            xs={12}
            className="selected-indicator"
            style={{ backgroundColor: "white", height: 50 }}
          >
            <i className="bi bi-check2-square"></i>
          </Col>
        ) : null}
      </td>

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
