// src/components/ProductCard.js
import { useState } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import CartToast from './CartToast';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setShowToast(true);
    setQuantity(1);
  };

  return (
    <>
      <motion.div
        className="product-motion-wrapper"
        whileHover={{ scale: 1.03 }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="h-100 product-card shadow-sm">
          <Link to={`/product/${product.id}`} className="text-decoration-none">
            <Card.Img
              variant="top"
              src={product.image}
              alt={product.name}
              className="p-3 img-fluid product-img"
            />
          </Link>

          <Card.Body className="d-flex flex-column">
            <Link to={`/product/${product.id}`} className="text-decoration-none text-dark">
              <Card.Title className="fs-6">{product.name}</Card.Title>
            </Link>

            <div className="mt-auto">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="fw-bold">${product.price.toFixed(2)}</span>
                {product.stock > 0 ? (
                  <Badge bg="success">In Stock</Badge>
                ) : (
                  <Badge bg="danger">Out of Stock</Badge>
                )}
              </div>

              <div className="d-flex align-items-center gap-2 mb-3">
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, Math.min(10, parseInt(e.target.value)) || 1))
                  }
                  className="form-control form-control-sm"
                  style={{ width: '60px' }}
                />
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleAddToCart}
                  disabled={product.stock <= 0}
                  className="flex-grow-1"
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </Card.Body>
        </Card>
      </motion.div>

      {/* Toast Component */}
      <CartToast show={showToast} onClose={() => setShowToast(false)} />
    </>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    stock: PropTypes.number,
    description: PropTypes.string
  }).isRequired
};
