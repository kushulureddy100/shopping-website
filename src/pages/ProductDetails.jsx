import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Card, Container } from 'react-bootstrap';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

export default function ProductDetails() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const product = products.find(p => p.id === parseInt(id));

  if (!product) return <div>Product not found</div>;

  return (
    <Container className="py-5">
      <Card>
        <div className="row g-0">
          <div className="col-md-6">
            <Card.Img 
              src={product.image} 
              alt={product.name}
              className="img-fluid"
            />
          </div>
          <div className="col-md-6">
            <Card.Body>
              <h2>{product.name}</h2>
              <p className="text-muted">${product.price.toFixed(2)}</p>
              <p>{product.description}</p>
              
              <div className="mb-3">
                <label>Quantity:</label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, e.target.value))}
                  className="form-control w-25"
                />
              </div>
              
              <Button 
                variant="primary"
                onClick={() => addToCart(product, quantity)}
              >
                Add to Cart
              </Button>
            </Card.Body>
          </div>
        </div>
      </Card>
    </Container>
  );
}