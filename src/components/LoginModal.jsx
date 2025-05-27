// src/components/LoginModal.js
import { useContext, useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import './LoginModal.css';

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
    <AnimatePresence>
      {show && (
        <Modal show={show} onHide={onHide} centered className="login-modal" backdrop="static" keyboard={false}>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <Modal.Header closeButton className="border-0">
              <Modal.Title className="w-100 text-center">🔐 Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmit} className="login-form">
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    placeholder="Enter your email"
                  />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    placeholder="Enter your password"
                  />
                </Form.Group>
                <Button type="submit" className="w-100 custom-login-btn">
                  Login
                </Button>
              </Form>
            </Modal.Body>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
}
