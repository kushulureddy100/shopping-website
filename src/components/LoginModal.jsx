import { useContext, useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';

export default function LoginModal({ show, onHide }) {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ 
      name: 'User', 
      email: formData.email,
      id: Math.floor(Math.random() * 1000)
    });
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </Form.Group>
          <Button type="submit" className="w-100">
            Login
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}