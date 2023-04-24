import ColourListElement from "./ColourListElement";
import Table from "react-bootstrap/Table";

function ColourDataList({
  colourData,
  setEditColourModalOpen,
  setDeleteColourModalOpen,
  setSelectedColourId,
  setBackgroundColor,
  rememberedRowIndex,
  setRememberedRowIndex,
}) {
  return (
    <div className="table-responsive">
      <Table responsive bordered>
        <thead>
          <tr>
            <th className="table-cell">Selected</th>
            <th className="table-cell">ID</th>
            <th className="table-cell">Colour</th>
            <th className="table-cell">Name</th>
            <th className="table-cell">Hex</th>
            <th className="table-cell">RGB</th>
            <th className="table-cell">HSL</th>
            <th className="table-cell">Edit</th>
            <th className="table-cell">Remove</th>
            <th className="table-cell">Set As Background</th>
          </tr>
        </thead>
        <tbody>
          {colourData.map((colourElement) => (
            <ColourListElement
              colourElement={colourElement}
              key={colourElement?.colorId}
              setEditColourModalOpen={setEditColourModalOpen}
              setDeleteColourModalOpen={setDeleteColourModalOpen}
              setSelectedColourId={setSelectedColourId}
              setBackgroundColor={setBackgroundColor}
              rememberedRowIndex={rememberedRowIndex}
              setRememberedRowIndex={setRememberedRowIndex}
            />
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ColourDataList;
