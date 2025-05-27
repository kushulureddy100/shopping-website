import React from "react";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";
import "./CartPage.css";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p className="empty-msg">Your cart is empty.</p>
      ) : (
        <motion.div
          className="cart-items"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {cart.map((item) => (
            <motion.div
              key={item.id}
              className="cart-item"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="cart-details">
                <strong>{item.name}</strong> - ${item.price.toFixed(2)} ×
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                />
              </div>
              <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
            </motion.div>
          ))}
          <h3 className="cart-total">Total: ${total.toFixed(2)}</h3>
        </motion.div>
      )}
    </div>
  );
}
