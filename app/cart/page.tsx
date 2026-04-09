'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

type CartItem = {
  uniqueId: string;
  id: number;
  name: string;
  image?: string;
  price: number;
  quantity: number;
  measure: string;
  subtotal: number;
};

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const savedCart = JSON.parse(localStorage.getItem("cart") || "[]") as Partial<CartItem>[];

      const cartWithIds: CartItem[] = savedCart.map((item) => ({
        uniqueId: item.uniqueId || uuidv4(),
        id: item.id ?? 0,
        name: item.name ?? "Unknown",
        image: item.image || "/default-product.png",
        price: item.price ?? 0,
        quantity: item.quantity ?? 1,
        measure: item.measure ?? "Box",
        subtotal: (item.price ?? 0) * (item.quantity ?? 1),
      }));

      setCartItems(cartWithIds);
      localStorage.setItem("cart", JSON.stringify(cartWithIds));
    } catch (error) {
      console.error("Error loading cart:", error);
    }
  }, []);

  const updateCart = (newCart: CartItem[]) => {
    setCartItems(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const handleQuantityChange = (uniqueId: string, newQuantity: number) => {
    const newCart = cartItems.map((item) =>
      item.uniqueId === uniqueId
        ? {
            ...item,
            quantity: Math.max(1, newQuantity),
            subtotal: item.price * Math.max(1, newQuantity),
          }
        : item
    );
    updateCart(newCart);
  };

  const handleMeasureChange = (uniqueId: string, newMeasure: string) => {
    const newCart = cartItems.map((item) =>
      item.uniqueId === uniqueId
        ? {
            ...item,
            measure: newMeasure,
            subtotal: item.price * item.quantity,
          }
        : item
    );
    updateCart(newCart);
  };

  const handleRemove = (uniqueId: string) => {
    const newCart = cartItems.filter((item) => item.uniqueId !== uniqueId);
    updateCart(newCart);
  };

  const total = cartItems.reduce((sum, item) => sum + item.subtotal, 0);

  if (cartItems.length === 0) {
    return (
      <p className="text-center mt-10 text-gray-800 text-lg">
        Your cart is empty.
      </p>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-6">
      <h2 className="text-4xl font-bold text-gray-900 mb-10 text-center">
        My Cart
      </h2>

      <div className="flex flex-col lg:flex-row justify-center items-start gap-10 max-w-7xl mx-auto">
        
        <div className="flex flex-col space-y-6 flex-1">
          {cartItems.map((product) => (
            <div
              key={product.uniqueId}
              className="rounded-2xl bg-white shadow-md hover:shadow-lg transition w-full p-5 flex items-center gap-6"
            >
              <Image
                src={product.image || "/default-product.png"}
                alt={product.name}
                width={150}
                height={150}
                className="object-cover rounded-lg"
              />

              <div className="flex flex-col flex-1 justify-between">
                <h3 className="text-xl font-semibold text-gray-900">
                  {product.name}
                </h3>

                <div className="flex items-center gap-4 mt-3">
                  
                  <div className="flex items-center gap-4 border border-gray-300 px-3 py-1 rounded-lg shadow-sm bg-white text-black">
                    <button
                      onClick={() =>
                        handleQuantityChange(product.uniqueId, product.quantity + 1)
                      }
                      className="text-xl font-bold text-black"
                    >
                      +
                    </button>

                    <span className="text-base font-medium text-black">
                      {product.quantity}
                    </span>

                    <button
                      onClick={() =>
                        handleQuantityChange(product.uniqueId, product.quantity - 1)
                      }
                      className="text-xl font-bold text-black"
                    >
                      -
                    </button>
                  </div>

                  <select
                    value={product.measure}
                    onChange={(e) =>
                      handleMeasureChange(product.uniqueId, e.target.value)
                    }
                    className="bg-white border border-gray-300 text-black py-2 px-3 rounded-lg"
                  >
                    <option>Sack</option>
                    <option>Box</option>
                    <option>Quintal</option>
                    <option>Dozen</option>
                  </select>

                  <button
                    onClick={() => handleRemove(product.uniqueId)}
                    className="bg-[#FF6E08] text-white px-4 py-2 rounded-lg"
                  >
                    Remove
                  </button>
                </div>

                <div className="flex justify-between mt-4">
                  <div>
                    <span className="text-sm text-gray-700">Price</span>
                    <p className="text-lg font-bold text-gray-900">
                      ${product.price}
                    </p>
                  </div>

                  <div>
                    <span className="text-sm text-gray-700">Subtotal</span>
                    <p className="text-lg font-bold text-gray-900">
                      ${product.subtotal}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full max-w-sm p-6 bg-white rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            Order Summary
          </h2>

          <div className="mb-6 space-y-4">
            {cartItems.map((item) => (
              <div key={item.uniqueId} className="flex justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {item.name}
                  </h4>
                  <p className="text-gray-700 text-sm">
                    {item.quantity} {item.measure}
                  </p>
                </div>

                <span className="font-semibold text-gray-900">
                  ${item.subtotal}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-between font-bold text-lg text-black mt-4 border-t pt-3">
            <span>Total</span>
            <span>${total}</span>
          </div>

          <Link href="/Checkout">
            <button className="w-full mt-8 bg-[#FF6E08] hover:bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg">
              Proceed to Payment
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}