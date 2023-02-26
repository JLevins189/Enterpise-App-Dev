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
  const [errorOccurred, setErrorOccurred] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [countryData, setCountryData] = useState([]);

  const toggleShowTable = () => {
    setShowTable((prev) => setShowTable(!prev));
    !requestComplete && getData();
  };

  const getData = async () => {
    try {
      const [
        capitalCities,
        coastlines,
        continents,
        currencies,
        domains,
        flags,
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
        capitalCities,
        coastlines,
        continents,
        currencies,
        domains,
        flags,
      });
    } catch (err) {
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
    console.log(capitalCities);
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
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                  </tr>
                </thead>
                <tbody>{/* <TableRow /> */}</tbody>
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
