import { useState, useMemo } from "react";
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
import Form from "react-bootstrap/Form";
import TableRow from "TableRow";
import LoadingComponent from "LoadingComponent";
import ExplainProgramComponent from "ExplainProgramComponent";
import EarthImage from "EarthImage";

function App() {
  const [clickedCellId, setClickedCellId] = useState(null);
  const [requestComplete, setRequestComplete] = useState(false);
  const [requestStarted, setRequestStarted] = useState(false);
  const [errorOccurred, setErrorOccurred] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [showAllCountries, setShowAllCountries] = useState(false);
  const [timeToGetData, setTimeToGetData] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [countryData, setCountryData] = useState([]);

  const folderName = "country-objects";
  //Templated Msg to be displayed after fetching table data
  const message = (time) =>
    `Folder: "${folderName}" has been read, the table has been created and has taken ${time} seconds.`;
  const smallTableNumberOfItems = 20;

  //UseMemo preventing unnecessary rerenders -> filter countrydata by search query
  const filteredCountries = useMemo(() => {
    return countryData.filter((country) => {
      return (
        country?.country?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
        country?.city?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
        country?.continent
          ?.toLowerCase()
          ?.includes(searchQuery.toLowerCase()) ||
        country?.currency_name
          ?.toLowerCase()
          ?.includes(searchQuery.toLowerCase()) ||
        country?.tld?.toLowerCase()?.includes(searchQuery.toLowerCase())
      );
    });
  }, [countryData, searchQuery]);

  //If first show of table -> retrieve data for table and time the length
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
        }, 5000);
      }
      return true;
    });
  };

  const toggleShowAllCountries = () => {
    setShowAllCountries((prev) => !prev);
  };

  //Remove selection from prev selected and assign to new
  const handleCellClick = (e) => {
    const prevSelectedElement = document.getElementById(clickedCellId);
    if (prevSelectedElement) {
      prevSelectedElement.classList.remove("selected");
    }
    e.target.classList.add("selected");
    setClickedCellId(e.target.id);
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

      //Combine Arrays of objects into one master array of bbjects
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
      // If no corresponding object in other object (|| Operator) or if value if nullish (?? Operator) set to unknown
      capitalCities.map((countryObj) => {
        if (!countryObj.city) {
          countryObj.city = "Unknown";
        }

        const matchingCoastline = coastlines.find(
          (coastline) => coastline.country === countryObj.country
        ) || { country: countryObj.country, costline: "Unknown" };
        matchingCoastline.costline = matchingCoastline.costline ?? "Unknown";

        const matchingContinent = continents.find(
          (continent) => continent.country === countryObj.country
        ) || { country: countryObj.country, continent: "Unknown" };
        matchingContinent.continent = matchingContinent.continent ?? "Unknown";

        const matchingCurrency = currencies.find(
          (currency) => currency.country === countryObj.country
        ) || { country: countryObj.country, currency_name: "Unknown" };
        matchingCurrency.currency_name =
          matchingCurrency.currency_name ?? "Unknown";

        const matchingDomain = domains.find(
          (domain) => domain.country === countryObj.country
        ) || { country: countryObj.country, tld: "Unknown" };
        matchingDomain.tld = matchingDomain.tld ?? "Unknown";

        const matchingFlag = flags.find(
          (flag) => flag.country === countryObj.country
        ); //Allow no flag (blank)

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
          {/* Technology Explanation etc. */}
          <ExplainProgramComponent />
        </Col>
      </Row>
      {/* Toggable Image plus animations */}
      <EarthImage />

      {/* Table components */}
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
              <Col className="mb-3" xs={{ span: 3, offset: 9 }}>
                <Form>
                  <Form.Control
                    type="text"
                    placeholder="Search Countries"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  ></Form.Control>
                </Form>
              </Col>
              <Col>
                <Table
                  className="animate__animated animate__backInRight"
                  responsive="xs"
                  striped
                  bordered
                >
                  <thead className="bg-info">
                    <tr>
                      <th>Country</th>
                      <th>Capital</th>
                      <th>Continent</th>
                      <th>Coastline Length</th>
                      <th>Currency Name</th>
                      <th>Internet Domain</th>
                      <th>Flag</th>
                    </tr>
                  </thead>
                  <tbody onClick={handleCellClick}>
                    {/* Filtered Array due to search query -> Empty search = No filtering */}
                    {filteredCountries.map((country, index) => {
                      //Break after 20 countries if thats all thats requested else continue
                      if (
                        !showAllCountries &&
                        index >= smallTableNumberOfItems
                      ) {
                        return;
                      }
                      return (
                        <TableRow
                          country={country.country}
                          capital={country.city}
                          continent={country.continent}
                          coastline={country.costline}
                          currency={country.currency_name}
                          domain={country.tld}
                          flag={country.flag_base64}
                          row={index}
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
          // If error occurs
          <ErrorComponent />
        )
      ) : (
        //Whitespace where table will show until requested
        <div style={{ height: "20vh" }}></div>
      )}
    </Container>
  );
}

export default App;
