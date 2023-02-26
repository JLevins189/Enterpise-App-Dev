import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import TableRow from "TableRow";
import { useState } from "react";

function App() {
  const [showTable, setShowTable] = useState(false);
  const [countryData, setCountryData] = useState([]);

  const toggleShowTable = () => setShowTable((prev) => setShowTable(!prev));

  return (
    <Container>
      <Row>
        <Col>
          <Button onClick={toggleShowTable}>Click me</Button>
        </Col>
      </Row>
      {showTable ? (
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
              <tbody>
                <TableRow />
              </tbody>
            </Table>
          </Col>
        </Row>
      ) : null}
    </Container>
  );
}

export default App;
