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
import ExplainProgramComponent from "ExplainProgramComponent";

function App() {
  const [requestComplete, setRequestComplete] = useState(false);
  const [requestStarted, setRequestStarted] = useState(false);
  const [errorOccurred, setErrorOccurred] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [showAllCountries, setShowAllCountries] = useState(false);
  const [timeToGetData, setTimeToGetData] = useState(0);
  const [countryData, setCountryData] = useState([]);

  const folderName = "country-objects";
  //Templated Msg to be displayed after fetching table data
  const message = (time) =>
    `Folder: "${folderName}" has been read, the table has been created and has taken ${time} seconds.`;
  const smallTableNumberOfItems = 20;

  const toggleShowTable = () => {
    setShowTable((prev) => !prev);
    /* Only allow one request in case connection slow */
    setRequestStarted((prev) => {
      if (prev === false) {
        const currentTime = new Date();
        setTimeout(() => {
          !requestComplete && getData();
          const timeToRead = (new Date() - currentTime) / 1000; //1000 = ms-> sec
          setTimeToGetData(timeToRead);
        }, 1); //TODO change back to 5000
      }
      return true;
    });
  };

  const toggleShowAllCountries = () => {
    setShowAllCountries((prev) => !prev);
  };

  //Network requests for country data
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

  /*
   * This function takes all the country objects and merges them into one single array of objects
   * @param - country objects
   * It uses array mapping starting with the first array of objects,
   * for each entry it finds the corresponding object in the other arrays by matching the country key using the find() method,
   * It then combines these into singular objects and stores them in the state array of country data
   */
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
    <Container className="mt-2">
      <Row>
        <Col>
          <ExplainProgramComponent />
        </Col>
      </Row>
      <Row>
        <Col>
          <Button className="mt-4 mb-4 px-5 py-2" onClick={toggleShowTable}>
            {!showTable ? "Show Table" : "Hide Table"}
          </Button>
        </Col>
      </Row>
      {showTable ? (
        !requestComplete ? (
          <LoadingComponent />
        ) : !errorOccurred ? (
          // Data Fetched, No Errors, Button to show clicked
          <>
            <Row>
              <Col>
                <p>{message(timeToGetData)}</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button
                  className="mt-4 mb-4 px-5 py-2"
                  onClick={toggleShowAllCountries}
                >
                  {!showAllCountries
                    ? "Show All Countries"
                    : "Show only 20 countries"}
                </Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <Table responsive="xs" striped bordered>
                  <thead className="bg-info">
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
                    {countryData.map((country, index) => {
                      //Break after 20 countries if thats all thats requested
                      if (
                        !showAllCountries &&
                        index > smallTableNumberOfItems
                      ) {
                        return;
                      }
                      return (
                        <TableRow
                          country={country.country}
                          continent={country.continent}
                          coastline={country.costline}
                          currency={country.currency_name}
                          domain={country.tld}
                          flag={country.flag_base64}
                          key={country.country}
                        />
                      );
                    })}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </>
        ) : (
          <ErrorComponent />
        )
      ) : null}
    </Container>
  );
}

export default App;
