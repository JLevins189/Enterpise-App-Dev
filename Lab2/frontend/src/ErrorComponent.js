import Alert from "react-bootstrap/Alert";
function ErrorComponent() {
  return (
    <Alert className="mt-5" variant="danger">
      Error occured while gathering data! Try refreshing...
    </Alert>
  );
}
export default ErrorComponent;
