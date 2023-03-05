import Alert from "react-bootstrap/Alert";
function ErrorComponent() {
  return (
    <Alert className="fixed-bottom p-5" variant="danger">
      Error occurred while gathering data! Try refreshing...
    </Alert>
  );
}
export default ErrorComponent;
