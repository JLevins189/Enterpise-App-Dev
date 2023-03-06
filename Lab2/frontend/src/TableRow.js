function CountryTableRow(props) {
  const { country, continent, coastline, currency, domain, flag, row } = props;
  return (
    <tr>
      <td id={`${row}-1`}>{country}</td>
      <td id={`${row}-2`}>{continent}</td>
      <td id={`${row}-3`}>{coastline}</td>
      <td id={`${row}-4`}>{currency}</td>
      <td id={`${row}-5`}>{domain}</td>
      <td id={`${row}-6`}>
        <img src={flag} width={100}></img>
      </td>
    </tr>
  );
}
export default CountryTableRow;
