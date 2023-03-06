import Spinner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/Row";

function LoadingComponent() {
  return (
    <Row style={{ height: "20vh" }}>
      <Spinner className="mt-2 mx-auto" />
    </Row>
  );
}

export default LoadingComponent;
