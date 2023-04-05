import Container from "react-bootstrap/Container";
import TitleHeader from "./Navbar";
function App() {
  return (
    <>
      <TitleHeader />
      <Container fluid style={{ maxWidth: "1920px" }}></Container>
    </>
  );
}

export default App;
