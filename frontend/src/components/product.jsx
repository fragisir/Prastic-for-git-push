"use client";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Link from "next/link";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddToCart = (product) => {
    // Read cart from localStorage or create empty array
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

    // Check if product already in cart (simplified: by product id only)
    const itemIndex = existingCart.findIndex((item) => item.id === product.id);

    if (itemIndex !== -1) {
      existingCart[itemIndex].quantity += 1; // increment quantity
    } else {
      existingCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    toast.success("Product added to cart!");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error)
    return (
      <p className="text-red-600 text-center font-semibold mt-4">
        Error: {error}
      </p>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-6">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border p-4 rounded-lg shadow hover:shadow-lg transition duration-200 bg-white cursor-pointer flex flex-col"
          >
            <Link href={`/products/${product.id}`}>
              <>
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-contain mb-4"
                />
                <h2 className="text-lg font-semibold mb-2 line-clamp-2">
                  {product.title}
                </h2>
                <p className="text-green-600 font-bold">${product.price}</p>
                <p className="text-sm text-gray-500 capitalize">
                  {product.category}
                </p>
              </>
            </Link>
            <button
              onClick={() => handleAddToCart(product)}
              className="mt-auto bg-green-600 hover:bg-green-700 text-white py-2 rounded-md font-semibold transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
