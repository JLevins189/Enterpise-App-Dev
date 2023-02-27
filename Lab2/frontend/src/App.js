import { useState } from "react";
import {
  getCapitalCitiesRequest,
  getCoastlineRequest,
  getContinentRequest,
  getCurrencyNameRequest,
  getDomainRequest,
  getFlagRequest,
} from "api/apiCalls";
import ErrorComponent from "./ErrorComponent";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import TableRow from "TableRow";
import LoadingComponent from "LoadingComponent";

function App() {
  const [requestComplete, setRequestComplete] = useState(false);
  const [requestStarted, setRequestStarted] = useState(false);
  const [errorOccurred, setErrorOccurred] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [countryData, setCountryData] = useState([]);

  const toggleShowTable = () => {
    setShowTable((prev) => !prev);
    /* Only allow one request if connection slow */
    setRequestStarted((prev) => {
      if (prev === false) {
        !requestComplete && getData();
      }
      return true;
    });
  };

  const getData = async () => {
    try {
      const [
        capitalCitiesResponse,
        coastlinesResponse,
        continentsResponse,
        currenciesResponse,
        domainsResponse,
        flagsResponse,
      ] = await Promise.all([
        getCapitalCitiesRequest(),
        getCoastlineRequest(),
        getContinentRequest(),
        getCurrencyNameRequest(),
        getDomainRequest(),
        getFlagRequest(),
      ]);

      //Combine Arrays of objects into one master array
      combineCountryData({
        capitalCities: capitalCitiesResponse.data,
        coastlines: coastlinesResponse.data,
        continents: continentsResponse.data,
        currencies: currenciesResponse.data,
        domains: domainsResponse.data,
        flags: flagsResponse.data,
      });
    } catch (err) {
      console.error(err);
      setErrorOccurred(true);
    } finally {
      setRequestComplete(true);
    }
  };

  const combineCountryData = ({
    capitalCities,
    coastlines,
    continents,
    currencies,
    domains,
    flags,
  }) => {
    setCountryData(
      capitalCities.map((countryObj) => {
        const matchingCoastline = coastlines.find(
          (coastline) => coastline.country === countryObj.country
        );
        const matchingContinent = continents.find(
          (continent) => continent.country === countryObj.country
        );
        const matchingCurrency = currencies.find(
          (currency) => currency.country === countryObj.country
        );
        const matchingDomain = domains.find(
          (domain) => domain.country === countryObj.country
        );
        const matchingFlag = flags.find(
          (flag) => flag.country === countryObj.country
        );
        console.log({
          ...countryObj,
          ...matchingCoastline,
          ...matchingContinent,
          ...matchingCurrency,
          ...matchingDomain,
          ...matchingFlag,
        });
        return {
          ...countryObj,
          ...matchingCoastline,
          ...matchingContinent,
          ...matchingCurrency,
          ...matchingDomain,
          ...matchingFlag,
        };
      })
    );
  };

  return (
    <Container>
      <Row>
        <Col>
          <Button className="mt-4 px-5 py-2" onClick={toggleShowTable}>
            Show Table
          </Button>
        </Col>
      </Row>
      {showTable ? (
        !requestComplete ? (
          <LoadingComponent />
        ) : !errorOccurred ? (
          <Row>
            <Col>
              <Table>
                <thead>
                  <tr>
                    <th>Country</th>
                    <th>Continent</th>
                    <th>Coastline Length</th>
                    <th>Currency Name</th>
                    <th>Internet Domain</th>
                    <th>Flag</th>
                  </tr>
                </thead>
                <tbody>
                  {countryData.map((country) => (
                    <TableRow
                      country={country.country}
                      continent={country.continent}
                      coastline={country.costline}
                      currency={country.currency_name}
                      domain={country.tld}
                      flag={country.flag_base64}
                    />
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        ) : (
          <ErrorComponent />
        )
      ) : null}
    </Container>
  );
}

export default App;
