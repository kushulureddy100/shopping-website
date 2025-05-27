import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import LoginModal from './LoginModal';

export default function Navigation() {
  const { user, logout } = useContext(AuthContext);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/cart">Cart</Nav.Link>
            <Nav.Link href="/account">Account</Nav.Link>
            <Nav.Link href="/comments">Comments</Nav.Link>
          </Nav>
          {user ? (
            <Button onClick={logout}>Logout ({user.name})</Button>
          ) : (
            <Button onClick={() => setShowLogin(true)}>Login</Button>
          )}
        </Container>
      </Navbar>
      <LoginModal show={showLogin} onHide={() => setShowLogin(false)} />
    </>
  );
}