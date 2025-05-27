import { useContext, useState } from 'react';
import { Button, Table, Form, Modal, Card } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

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
    // In a real app, you would process payment here
    alert(`Order confirmed! Total: $${total.toFixed(2)}`);
    setShowCheckoutModal(false);
  };

  return (
    <div className="cart-page">
      <h1 className="mb-4">Your Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <Card>
            <Card.Body className="text-center">
              <Card.Title>Your cart is empty</Card.Title>
              <Card.Text>
                Continue shopping to add items to your cart
              </Card.Text>
              <Button as={Link} to="/" variant="primary">
                Continue Shopping
              </Button>
            </Card.Body>
          </Card>
        </div>
      ) : (
        <>
          <Table striped bordered hover responsive>
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
                <tr key={item.id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: '50px', marginRight: '15px' }}
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
                      style={{ width: '70px' }}
                    />
                  </td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <Button
                      variant="outline-danger"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="cart-summary">
            <Card className="mt-4">
              <Card.Body>
                <h4 className="d-flex justify-content-between">
                  <span>Order Summary</span>
                  <span>${total.toFixed(2)}</span>
                </h4>
                <div className="d-grid gap-2 mt-3">
                  <Button
                    variant="success"
                    size="lg"
                    onClick={handleCheckout}
                  >
                    Proceed to Checkout
                  </Button>
                  <Button as={Link} to="/" variant="outline-primary">
                    Continue Shopping
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </div>

          {/* Checkout Modal */}
          <Modal
            show={showCheckoutModal}
            onHide={() => setShowCheckoutModal(false)}
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
                <Button
                  variant="secondary"
                  onClick={() => setShowCheckoutModal(false)}
                >
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
    </div>
  );
}