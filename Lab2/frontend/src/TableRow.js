function CountryTableRow(props) {
  const {
    country,
    capital,
    continent,
    coastline,
    currency,
    domain,
    flag,
    row,
  } = props;
  return (
    <tr>
      <td id={`${row}-1`}>{country}</td>
      <td id={`${row}-2`}>{capital}</td>
      <td id={`${row}-3`}>{continent}</td>
      <td id={`${row}-4`}>{coastline}</td>
      <td id={`${row}-5`}>{currency}</td>
      <td id={`${row}-6`}>{domain}</td>
      <td id={`${row}-7`}>
        <img src={flag} width={100}></img>
      </td>
    </tr>
  );
}
export default CountryTableRow;
