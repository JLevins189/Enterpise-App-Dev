import Spinner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/Row";

function LoadingComponent() {
  return (
    <Row>
      <Spinner className="mt-2 mx-auto" />
    </Row>
  );
}

export default LoadingComponent;
