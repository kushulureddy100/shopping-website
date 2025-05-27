// src/pages/Home.js
import { Row, Col } from 'react-bootstrap';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion';
import './Home.css';

export default function Home() {
  return (
    <motion.div
      className="home-page container py-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="mb-4 text-center">🛍️ Our Products</h1>
      <Row>
        {products.map((product, index) => (
          <Col
            key={product.id}
            xs={12}
            sm={6}
            md={4}
            className="mb-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          </Col>
        ))}
      </Row>
    </motion.div>
  );
}
