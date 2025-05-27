import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { motion } from "framer-motion";
import "./Reviews.css";

export default function Reviews() {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (text.trim()) {
      setReviews([...reviews, { text, user: user?.name || "Anonymous" }]);
      setText("");
    }
  };

  return (
    <motion.div
      className="reviews-page"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Product Reviews</h2>

      <div className="review-form">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your review..."
          rows={4}
        />
        <button onClick={handleAdd}>Add Review</button>
      </div>

      <div className="review-list">
        {reviews.map((r, i) => (
          <motion.div
            key={i}
            className="review-item"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <strong>{r.user}</strong>: {r.text}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
