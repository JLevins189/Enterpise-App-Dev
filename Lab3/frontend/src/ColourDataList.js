import ColourListElement from "./ColourListElement";
import Table from "react-bootstrap/Table";

function ColourDataList({ colourData }) {
  return (
    <Table responsive striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Colour</th>
          <th>Name</th>
          <th>Hex</th>
          <th>RGB</th>
          <th>HSL</th>
          <th>Edit</th>
          <th>Remove</th>
        </tr>
      </thead>
      <tbody>
        {colourData.map((colourElement) => (
          <ColourListElement
            colourElement={colourElement}
            key={colourElement?.colorId}
          />
        ))}
      </tbody>
    </Table>
  );
}

export default ColourDataList;