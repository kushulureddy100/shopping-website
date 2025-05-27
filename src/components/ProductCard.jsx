import { Card, Button, Badge } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function ProductCard({ product }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setQuantity(1); // Reset quantity after adding
  };

  return (
    <Card className="h-100 product-card shadow-sm">
      <Link to={`/product/${product.id}`} className="text-decoration-none">
        <Card.Img 
          variant="top" 
          src={product.image} 
          alt={product.name}
          className="p-3 img-fluid"
          style={{ height: '200px', objectFit: 'contain' }}
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
              onChange={(e) => setQuantity(Math.max(1, Math.min(10, e.target.value)))}
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