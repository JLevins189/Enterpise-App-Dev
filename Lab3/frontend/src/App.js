import Container from "react-bootstrap/Container";
import Navbar from "./Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Container fluid style={{ maxWidth: "1920px" }}></Container>
    </>
  );
}

export default App;
