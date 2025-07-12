"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/navebar"; // Adjust path if needed

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      setCartItems(JSON.parse(stored));
    }
  }, []);

  const clearCart = () => {
    localStorage.removeItem("cart");
    setCartItems([]);
    window.dispatchEvent(new Event("cartUpdated")); // notify navbar
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

        {cartItems.length === 0 ? (
          <p className="text-center mt-10 text-gray-600">Your cart is empty.</p>
        ) : (
          <>
            <ul className="space-y-4 mb-6">
              {cartItems.map((item, index) => (
                <li
                  key={index}
                  className="border p-4 rounded shadow flex items-center gap-4"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-contain"
                  />
                  <div className="flex-1">
                    <h2 className="font-semibold">{item.title}</h2>
                    <p className="text-gray-600">
                      Size: {item.selectedSize} | Color: {item.selectedColor}
                    </p>
                    <p>
                      Quantity: {item.quantity} x ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <p className="font-bold">
                    ${(item.quantity * item.price).toFixed(2)}
                  </p>
                </li>
              ))}
            </ul>

            <div className="flex justify-between items-center border-t pt-4">
              <p className="text-xl font-bold">
                Total: ${totalPrice.toFixed(2)}
              </p>
              <button
                onClick={clearCart}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              >
                Clear Cart
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
