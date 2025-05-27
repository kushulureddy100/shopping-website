// src/components/Navigation.js
import { useContext, useState } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import LoginModal from './LoginModal';
import { motion } from 'framer-motion';
import './Navigation.css';

export default function Navigation() {
  const { user, logout } = useContext(AuthContext);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <Navbar bg="light" expand="lg" className="shadow-sm custom-navbar">
          <Container>
            <Navbar.Brand as={Link} to="/" className="brand-text">🛍️ ShopEase</Navbar.Brand>
            <Navbar.Toggle aria-controls="main-navbar" />
            <Navbar.Collapse id="main-navbar">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/" className="nav-link-custom">Home</Nav.Link>
                <Nav.Link as={Link} to="/cart" className="nav-link-custom">Cart</Nav.Link>
                <Nav.Link as={Link} to="/account" className="nav-link-custom">Account</Nav.Link>
                <Nav.Link as={Link} to="/comments" className="nav-link-custom">Comments</Nav.Link>
              </Nav>
              {user ? (
                <Button variant="outline-danger" className="login-btn" onClick={logout}>
                  Logout ({user.name})
                </Button>
              ) : (
                <Button variant="outline-primary" className="login-btn" onClick={() => setShowLogin(true)}>
                  Login
                </Button>
              )}
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </motion.div>

      {/* Login Modal */}
      <LoginModal show={showLogin} onHide={() => setShowLogin(false)} />
    </>
  );
}
