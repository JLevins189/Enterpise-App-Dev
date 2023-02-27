function CountryTableRow(props) {
  const { country, continent, coastline, currency, domain, flag } = props;
  return (
    <tr>
      <td>{country}</td>
      <td>{continent}</td>
      <td>{coastline}</td>
      <td>{currency}</td>
      <td>{domain}</td>
      <td>
        <img src={flag} width={100}></img>
      </td>
    </tr>
  );
}
export default CountryTableRow;
