import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="text-center py-5">
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Button as={Link} to="/" variant="primary">
        Return Home
      </Button>
    </div>
  );
}