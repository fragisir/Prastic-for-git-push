"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@/components/navebar";
import toast, { Toaster } from "react-hot-toast";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  const sizes = ["S", "M", "L", "XL"];
  const colors = ["Red", "Blue", "Black", "Green"];

  useEffect(() => {
    if (!id) return;
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select size and color");
      return;
    }

    const cartItem = {
      ...product,
      selectedSize,
      selectedColor,
      quantity,
    };

    // Save to localStorage
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    existingCart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(existingCart));

    // Reset
    setSelectedSize("");
    setSelectedColor("");
    setQuantity(1);

    toast.success("Added to cart!");
  };

  if (!product)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );

  return (
    <>
      <Navbar />
      <Toaster position="top-right" />
      <div className="max-w-5xl mx-auto p-6 bg-white rounded shadow mt-6">
        <h1 className="text-3xl font-bold mb-4 text-center">{product.title}</h1>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Image */}
          <div className="flex justify-center">
            <img
              src={product.image}
              alt={product.title}
              className="w-72 h-72 object-contain rounded"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col gap-4 flex-1">
            <p className="text-gray-600 text-lg">{product.description}</p>
            <p className="text-2xl text-green-600 font-bold">
              ${product.price}
            </p>
            <p className="text-sm text-gray-500">
              Category: <span className="capitalize">{product.category}</span>
            </p>
            <p className="text-sm text-yellow-600">
              Rating: {product.rating?.rate} ⭐ ({product.rating?.count}{" "}
              reviews)
            </p>

            {/* Size Selector */}
            <div>
              <label className="font-medium">Size:</label>
              <div className="flex gap-2 mt-1">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1 border rounded ${
                      selectedSize === size
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selector */}
            <div>
              <label className="font-medium">Color:</label>
              <div className="flex gap-2 mt-1">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-3 py-1 border rounded ${
                      selectedColor === color
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-2">
              <label className="font-medium">Quantity:</label>
              <input
                type="number"
                value={quantity}
                min={1}
                max={10}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="border p-1 w-16 rounded text-center"
              />
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={!selectedSize || !selectedColor}
              className={`mt-4 px-4 py-2 rounded font-semibold text-white ${
                selectedSize && selectedColor
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
