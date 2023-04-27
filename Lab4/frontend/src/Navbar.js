import BootstrapNavbar from "react-bootstrap/Navbar";

function Navbar() {
  return (
    <BootstrapNavbar sticky="top" bg="light" variant="light" id="navbar">
      <BootstrapNavbar.Brand className="fs-2 ps-3 ps-lg-5">
        Colour DB
      </BootstrapNavbar.Brand>
    </BootstrapNavbar>
  );
}

export default Navbar;
