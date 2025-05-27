// src/pages/CartPage.js
import { Table, Button, Form, Card } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './CartPage.css';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  return (
    <motion.div
      className="cart-page container py-4"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h1 className="mb-4 text-center">🛒 Shopping Cart</h1>

      <AnimatePresence>
        {cartItems.length === 0 ? (
          <motion.div
            className="text-center empty-cart"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Card className="p-4 shadow-sm">
              <Card.Body>
                <Card.Title>Your cart is empty</Card.Title>
                <Card.Text>Looks like you haven't added anything yet.</Card.Text>
                <Button as={Link} to="/" variant="primary">
                  Continue Shopping
                </Button>
              </Card.Body>
            </Card>
          </motion.div>
        ) : (
          <>
            <Table striped bordered hover responsive className="cart-table">
              <thead className="table-light">
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <td>{item.name}</td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>
                      <Form.Control
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.id, parseInt(e.target.value))
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

            <div className="text-end mt-4">
              <h4>Total: <strong>${cartTotal.toFixed(2)}</strong></h4>
              <Button variant="success" size="lg" className="mt-3">
                Proceed to Checkout
              </Button>
            </div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
