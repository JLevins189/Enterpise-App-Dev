import { useState, useEffect } from "react";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function EarthImage() {
  const [showImage, setShowImage] = useState(true);

  return (
    <Row className="justify-content-md-center my-4">
      <Col xs={12}>
        <Button className="mb-2" onClick={() => setShowImage((prev) => !prev)}>
          {showImage ? "Hide Earth Image" : "Show Earth Image"}
        </Button>
      </Col>
      {showImage && (
        <Col className="animate__animated animate__fadeInUp" xs={"auto"}>
          <Image fluid src="earth.jpg" />
          <br />
          <p className="text-center">The Earth. Home to our countries</p>
        </Col>
      )}
    </Row>
  );
}

export default EarthImage;
