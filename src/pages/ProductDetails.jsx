// src/pages/ProductDetails.js
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Card, Container } from 'react-bootstrap';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import './ProductDetails.css';

export default function ProductDetails() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <Container className="py-5 text-center">
        <h3>Product not found</h3>
      </Container>
    );
  }

  return (
    <motion.div
      className="product-details-page py-5"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Container>
        <Card className="shadow-sm rounded">
          <div className="row g-0">
            <div className="col-md-6 p-4 text-center">
              <Card.Img
                src={product.image}
                alt={product.name}
                className="img-fluid product-img"
              />
            </div>
            <div className="col-md-6 p-4">
              <Card.Body>
                <h2 className="mb-3">{product.name}</h2>
                <h4 className="text-primary mb-3">${product.price.toFixed(2)}</h4>
                <p className="mb-4">{product.description}</p>

                <div className="mb-3 d-flex align-items-center gap-3">
                  <label className="form-label fw-semibold m-0">Quantity:</label>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.max(1, parseInt(e.target.value)))
                    }
                    className="form-control quantity-input"
                  />
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => addToCart(product, quantity)}
                >
                  Add to Cart
                </Button>
              </Card.Body>
            </div>
          </div>
        </Card>
      </Container>
    </motion.div>
  );
}
