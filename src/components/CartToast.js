// src/components/CartToast.js
import { Toast, ToastContainer } from 'react-bootstrap';

export default function CartToast({ show, onClose }) {
  return (
    <ToastContainer position="top-end" className="p-3">
      <Toast show={show} onClose={onClose} bg="success" delay={2000} autohide>
        <Toast.Header>
          <strong className="me-auto">Cart</strong>
        </Toast.Header>
        <Toast.Body className="text-white">✅ Item added to cart!</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}
