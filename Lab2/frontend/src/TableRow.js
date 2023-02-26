function TableRow({ dataObject }) {
  return (
    <tr>
      {Object.values(dataObject).map((value) => (
        <td>{value}</td>
      ))}
    </tr>
  );
}
export default TableRow;
