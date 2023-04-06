import BootstrapNavbar from "react-bootstrap/Navbar";

function Navbar() {
  return (
    <BootstrapNavbar sticky="top" bg="light" variant="light">
      <BootstrapNavbar.Brand className="fs-2 ps-3 ps-lg-5">
        Colour DB
      </BootstrapNavbar.Brand>
    </BootstrapNavbar>
  );
}

export default Navbar;
