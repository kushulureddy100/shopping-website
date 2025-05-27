import { Card, Button, Row, Col } from 'react-bootstrap';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function Home() {
  return (
    <div className="p-4">
      <h1>Products</h1>
      <Row>
        {products.map(product => (
          <Col md={4} key={product.id} className="mb-4">
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
}