import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

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
    if (isLogin) {
      login({ name: formData.name, email: formData.email });
      setMessage({ text: 'Login successful!', variant: 'success' });
    } else {
      login({ name: formData.name, email: formData.email });
      setMessage({ text: 'Account created!', variant: 'success' });
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <Card style={{ width: '400px' }} className="p-4">
        <h2>{isLogin ? 'Login' : 'Create Account'}</h2>
        {message && (
          <Alert variant={message.variant}>{message.text}</Alert>
        )}
        {user ? (
          <div>
            <p>Welcome, {user.name}!</p>
            <p>Email: {user.email}</p>
            <Button onClick={logout}>Logout</Button>
          </div>
        ) : (
          <Form onSubmit={handleSubmit}>
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
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={3}
                />
              </Form.Group>
            )}
            <Button type="submit" className="w-100 mb-3">
              {isLogin ? 'Login' : 'Create Account'}
            </Button>
            <Button
              variant="link"
              onClick={() => setIsLogin(!isLogin)}
              className="w-100"
            >
              {isLogin
                ? 'Need an account? Register'
                : 'Already have an account? Login'}
            </Button>
          </Form>
        )}
      </Card>
    </div>
  );
}