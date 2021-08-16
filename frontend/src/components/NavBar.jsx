import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Bogotashop</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/graphics">Graphics</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
