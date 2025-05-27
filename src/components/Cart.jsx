import { useContext, useState } from 'react';
import { Button, Table, Form, Modal, Card } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './Cart.css';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [checkoutInfo, setCheckoutInfo] = useState({
    name: '',
    email: '',
    address: ''
  });

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity > 0) {
      updateQuantity(itemId, parseInt(newQuantity));
    }
  };

  const handleCheckout = () => {
    setShowCheckoutModal(true);
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    alert(`Order confirmed! Total: $${total.toFixed(2)}`);
    setShowCheckoutModal(false);
  };

  return (
    <motion.div
      className="cart-page container py-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h1 className="mb-4 text-center">🛒 Your Shopping Cart</h1>

      <AnimatePresence>
        {cartItems.length === 0 ? (
          <motion.div
            className="empty-cart"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Card className="text-center empty-cart-card">
              <Card.Body>
                <Card.Title>Your cart is empty</Card.Title>
                <Card.Text>Continue shopping to add items</Card.Text>
                <Button as={Link} to="/" variant="primary">
                  Continue Shopping
                </Button>
              </Card.Body>
            </Card>
          </motion.div>
        ) : (
          <>
            <Table striped bordered hover responsive className="cart-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <td>
                      <div className="d-flex align-items-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="cart-item-img"
                        />
                        {item.name}
                      </div>
                    </td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>
                      <Form.Control
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(item.id, e.target.value)
                        }
                        className="qty-input"
                      />
                    </td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </Button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </Table>

            <motion.div
              className="cart-summary"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="mt-4 p-3 shadow-sm summary-card">
                <Card.Body>
                  <h4 className="d-flex justify-content-between">
                    <span>Order Summary</span>
                    <span>${total.toFixed(2)}</span>
                  </h4>
                  <div className="d-grid gap-2 mt-3">
                    <Button variant="success" size="lg" onClick={handleCheckout}>
                      Proceed to Checkout
                    </Button>
                    <Button as={Link} to="/" variant="outline-primary">
                      Continue Shopping
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </motion.div>

            {/* Checkout Modal */}
            <Modal
              show={showCheckoutModal}
              onHide={() => setShowCheckoutModal(false)}
              centered
              className="checkout-modal"
            >
              <Modal.Header closeButton>
                <Modal.Title>Checkout</Modal.Title>
              </Modal.Header>
              <Form onSubmit={handleCheckoutSubmit}>
                <Modal.Body>
                  <h5 className="mb-3">Order Total: ${total.toFixed(2)}</h5>
                  <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      value={checkoutInfo.name}
                      onChange={(e) =>
                        setCheckoutInfo({ ...checkoutInfo, name: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      required
                      value={checkoutInfo.email}
                      onChange={(e) =>
                        setCheckoutInfo({ ...checkoutInfo, email: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Shipping Address</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      required
                      value={checkoutInfo.address}
                      onChange={(e) =>
                        setCheckoutInfo({
                          ...checkoutInfo,
                          address: e.target.value
                        })
                      }
                    />
                  </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => setShowCheckoutModal(false)}>
                    Cancel
                  </Button>
                  <Button variant="primary" type="submit">
                    Confirm Order
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
