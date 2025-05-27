// src/pages/NotFound.js
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './NotFound.css';

export default function NotFound() {
  return (
    <motion.div
      className="not-found-page text-center d-flex flex-column justify-content-center align-items-center"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="display-4 fw-bold mb-3">404 - Page Not Found</h1>
      <p className="lead mb-4">
        Oops! The page you're looking for doesn’t exist or has been moved.
      </p>
      <Button as={Link} to="/" variant="primary" size="lg">
        Return Home
      </Button>
    </motion.div>
  );
}
