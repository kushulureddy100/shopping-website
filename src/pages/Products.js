// src/pages/Products.js
import React from "react";
import products from "../data/products";
import ProductCard from "../components/ProductCard";
import { motion } from "framer-motion";
import "./Products.css";

export default function Products() {
  return (
    <div className="products-page">
      <h2 className="products-title">Our Top Picks</h2>
      <motion.div
        className="product-list"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        {products.map((product) => (
          <motion.div
            key={product.id}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
