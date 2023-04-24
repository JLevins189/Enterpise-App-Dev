import { useState } from "react";

const { Row, Col, Button } = require("react-bootstrap");

function Explaination() {
  const [showText, setShowText] = useState(true);
  return (
    <Row>
      <Col>
        <h1>Important Note</h1>
        <Button
          variant={showText ? "danger" : "primary"}
          onClick={() => setShowText((prev) => !prev)}
          className="mb-3"
        >
          {showText ? "Close" : "Read More"}
        </Button>
        {showText && (
          <div>
            <p className="fs-4">
              As this design uses a table, some of the issues like wrong ID
              cannot happen. It also means a GET request by ID is not used
              although implemented in the backend as the get all does enough for
              this design to work. Add Colour is implemented below the Colour
              List Title and the rest of the functionality is contained within
              modal when pressing the buttons.
            </p>
            <p className="fs-4">
              Also note that the cache may be long (30s) so refreshing will
              temporarily lose changes until the cache has expired. Not
              refreshing is advised. New data or updated data will not be
              reflected until cache expiry.
            </p>
          </div>
        )}
      </Col>
    </Row>
  );
}

export default Explaination;
