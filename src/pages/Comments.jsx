import { Card, Form, Button, ListGroup, Image } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { products } from '../data/products';
import { motion, AnimatePresence } from 'framer-motion';
import './Comments.css';

export default function Comments() {
  const { user } = useContext(AuthContext);
  const [comments, setComments] = useState([
    {
      id: 1,
      productId: 1,
      userId: 1,
      userName: 'John Doe',
      rating: 5,
      text: 'Great headphones! Excellent sound quality.',
      image: 'images/headphones.jpg',
      date: '2025-05-15'
    }
  ]);
  const [newComment, setNewComment] = useState({
    productId: '',
    rating: 5,
    text: '',
    image: null,
    imagePreview: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) return;

    const comment = {
      id: comments.length + 1,
      productId: parseInt(newComment.productId),
      userId: user.id,
      userName: user.name,
      rating: newComment.rating,
      text: newComment.text,
      image: newComment.imagePreview,
      date: new Date().toISOString().split('T')[0]
    };

    setComments([comment, ...comments]);
    setNewComment({
      productId: '',
      rating: 5,
      text: '',
      image: null,
      imagePreview: null
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setNewComment({
      ...newComment,
      image: file,
      imagePreview: URL.createObjectURL(file)
    });
  };

  return (
    <motion.div
      className="container py-4 comments-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h1 className="text-center mb-4">📝 Product Reviews</h1>

      {user && (
        <Card className="mb-5 shadow-sm">
          <Card.Body>
            <h3 className="mb-4">Add Your Review</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Product</Form.Label>
                <Form.Select
                  value={newComment.productId}
                  onChange={(e) =>
                    setNewComment({ ...newComment, productId: e.target.value })
                  }
                  required
                >
                  <option value="">Select a product</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Rating</Form.Label>
                <Form.Select
                  value={newComment.rating}
                  onChange={(e) =>
                    setNewComment({
                      ...newComment,
                      rating: parseInt(e.target.value)
                    })
                  }
                >
                  {[5, 4, 3, 2, 1].map((num) => (
                    <option key={num} value={num}>
                      {num} star{num > 1 && 's'}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Review</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={newComment.text}
                  onChange={(e) =>
                    setNewComment({ ...newComment, text: e.target.value })
                  }
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Upload Image (optional)</Form.Label>
                <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
                {newComment.imagePreview && (
                  <Image
                    src={newComment.imagePreview}
                    thumbnail
                    style={{ width: '120px', marginTop: '10px' }}
                  />
                )}
              </Form.Group>

              <Button type="submit" className="w-100 mt-2">
                Submit Review
              </Button>
            </Form>
          </Card.Body>
        </Card>
      )}

      <h2 className="mb-3">Recent Reviews</h2>

      <AnimatePresence>
        {comments.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-muted"
          >
            No reviews yet. Be the first to review!
          </motion.p>
        ) : (
          <ListGroup className="review-list">
            {comments.map((comment) => {
              const product = products.find((p) => p.id === comment.productId);
              return (
                <motion.div
                  key={comment.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <ListGroup.Item className="mb-3 rounded shadow-sm p-3">
                    <div className="d-flex">
                      {comment.image && (
                        <Image
                          src={comment.image}
                          thumbnail
                          className="me-3"
                          style={{ width: '100px' }}
                        />
                      )}
                      <div>
                        <h5>{product?.name || 'Unknown Product'}</h5>
                        <div className="text-warning fs-6 mb-1">
                          {'★'.repeat(comment.rating)}
                          {'☆'.repeat(5 - comment.rating)}
                        </div>
                        <p>{comment.text}</p>
                        <small className="text-muted">
                          Posted by <strong>{comment.userName}</strong> on{' '}
                          {comment.date}
                        </small>
                      </div>
                    </div>
                  </ListGroup.Item>
                </motion.div>
              );
            })}
          </ListGroup>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
