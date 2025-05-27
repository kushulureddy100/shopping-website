import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { motion } from "framer-motion";
import "./Account.css";

export default function Account() {
  const { user, login } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [address, setAddress] = useState(user?.address || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ name, address }); // Save user info
  };

  return (
    <motion.div
      className="account-page"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Account Information</h2>
      <form className="account-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
          required
        />
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Shipping Address"
          required
        />
        <button type="submit">Save</button>
      </form>
    </motion.div>
  );
}
