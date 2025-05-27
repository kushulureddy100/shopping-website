// src/pages/Account.js
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import './Account.css';

export default function Account() {
  const { user, login, logout } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: ''
  });
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ name: formData.name || 'User', email: formData.email });
    setMessage({
      text: isLogin ? 'Login successful!' : 'Account created!',
      variant: 'success'
    });
  };

  return (
    <motion.div
      className="account-page d-flex justify-content-center align-items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="form-card"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Card style={{ width: '100%' }} className="p-4 shadow">
          <h2 className="text-center mb-3">
            {isLogin ? 'Login' : 'Create Account'}
          </h2>

          {message && <Alert variant={message.variant}>{message.text}</Alert>}

          <AnimatePresence>
            {user ? (
              <motion.div
                key="user-info"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p>Welcome, <strong>{user.name}</strong>!</p>
                <p>Email: {user.email}</p>
                <Button onClick={logout} className="w-100 mt-2">
                  Logout
                </Button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {!isLogin && (
                  <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                )}
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                {!isLogin && (
                  <Form.Group className="mb-3">
                    <Form.Label>Shipping Address</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </Form.Group>
                )}
                <Button type="submit" className="w-100 mb-3 btn-submit">
                  {isLogin ? 'Login' : 'Create Account'}
                </Button>
                <Button
                  variant="link"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setMessage(null);
                  }}
                  className="w-100 toggle-link"
                >
                  {isLogin
                    ? 'Need an account? Register'
                    : 'Already have an account? Login'}
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </Card>
      </motion.div>
    </motion.div>
  );
}
