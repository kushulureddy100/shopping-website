import { Card, Form, Button, ListGroup, Image } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { products } from '../data/products';

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
      image: 'https://via.placeholder.com/150',
      date: '2023-05-15'
    }
  ]);
  const [newComment, setNewComment] = useState({
    productId: '',
    rating: 5,
    text: '',
    image: null
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
      image: newComment.image,
      date: new Date().toISOString().split('T')[0]
    };
    
    setComments([...comments, comment]);
    setNewComment({
      productId: '',
      rating: 5,
      text: '',
      image: null
    });
  };

  return (
    <div className="container">
      <h1>Product Reviews</h1>
      
      {user && (
        <Card className="mb-4">
          <Card.Body>
            <h3>Add Your Review</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Product</Form.Label>
                <Form.Select
                  value={newComment.productId}
                  onChange={(e) => setNewComment({...newComment, productId: e.target.value})}
                  required
                >
                  <option value="">Select a product</option>
                  {products.map(product => (
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
                  onChange={(e) => setNewComment({...newComment, rating: parseInt(e.target.value)})}
                >
                  {[5, 4, 3, 2, 1].map(num => (
                    <option key={num} value={num}>{num} stars</option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Review</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={newComment.text}
                  onChange={(e) => setNewComment({...newComment, text: e.target.value})}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Upload Image (Optional)</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={(e) => setNewComment({...newComment, image: e.target.files[0]})}
                />
              </Form.Group>
              <Button type="submit">Submit Review</Button>
            </Form>
          </Card.Body>
        </Card>
      )}

      <h2>Recent Reviews</h2>
      {comments.length === 0 ? (
        <p>No reviews yet. Be the first to review!</p>
      ) : (
        <ListGroup>
          {comments.map(comment => {
            const product = products.find(p => p.id === comment.productId);
            return (
              <ListGroup.Item key={comment.id}>
                <div className="d-flex">
                  {comment.image && (
                    <Image
                      src={comment.image}
                      thumbnail
                      style={{ width: '100px', marginRight: '20px' }}
                    />
                  )}
                  <div>
                    <h5>{product?.name || 'Unknown Product'}</h5>
                    <div>
                      {'★'.repeat(comment.rating)}{'☆'.repeat(5 - comment.rating)}
                    </div>
                    <p>{comment.text}</p>
                    <small className="text-muted">
                      Posted by {comment.userName} on {comment.date}
                    </small>
                  </div>
                </div>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      )}
    </div>
  );
}