"use client";

import { useUser } from "@clerk/nextjs";
import React, { useState, useEffect } from "react";
import {
  FaCheck,
  FaCreditCard,
  FaUniversity,
  FaCheckCircle,
} from "react-icons/fa";

type CartItem = {
  name: string;
  quantity: number;
  measure: string;
  subtotal: number;
};

export default function CheckoutPage() {
  const { user } = useUser();

  const [step, setStep] = useState(1);
  const [isMounted, setIsMounted] = useState(false);

  const [shipping, setShipping] = useState({
    fullName: "",
    lastName: "",
    address: "",
    city: "",
    country: "",
  });

  const [payment, setPayment] = useState({
    type: "card",
    cardNumber: "",
    name: "",
    cvv: "",
    bank: "",
    account: "",
  });

  const [cart, setCart] = useState<CartItem[]>([]);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const saved = localStorage.getItem("cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  const total = cart.reduce((sum, i) => sum + i.subtotal, 0);

  if (!isMounted) return null;

  const handleConfirm = async () => {
    if (!user) {
      alert("Debes iniciar sesión");
      return;
    }

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        body: JSON.stringify({
          userId: user.id,
          items: cart,
          total,
          status: "Pending",
        }),
      });

      if (res.ok) {
        setConfirmed(true);
        localStorage.removeItem("cart"); 
        setCart([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto space-y-10">

        <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        
        <div className="flex justify-between">
          {["Shipping", "Payment", "Review"].map((s, i) => {
            const current = i + 1;

            return (
              <div key={i} className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center
                  ${
                    step > current
                      ? "bg-green-600 text-white"
                      : step === current
                      ? "bg-green-100 border-2 border-green-600"
                      : "bg-gray-300"
                  }`}
                >
                  {step > current ? <FaCheck /> : current}
                </div>
                <span>{s}</span>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-10">

  
          <div className="lg:col-span-2 bg-white p-8 rounded-xl shadow space-y-6">

            {step === 1 && (
              <>
                <h2 className="font-bold">Shipping</h2>

                {Object.keys(shipping).map((field) => (
                  <input
                    key={field}
                    placeholder={field}
                    value={(shipping as any)[field]}
                    onChange={(e) =>
                      setShipping({ ...shipping, [field]: e.target.value })
                    }
                    className="w-full p-3 border rounded-lg"
                  />
                ))}

                <button onClick={() => setStep(2)} className="btn">
                  Continue
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <h2 className="font-bold">Payment</h2>

                <button onClick={() => setStep(3)} className="btn">
                  Continue
                </button>
              </>
            )}

            {step === 3 && (
              <>
                <h2 className="font-bold">Review</h2>

                <button onClick={handleConfirm} className="btn">
                  Confirm Order
                </button>
              </>
            )}

            {confirmed && (
              <div className="text-center">
                <FaCheckCircle className="text-green-600 text-4xl mx-auto" />
                <h2 className="text-green-700 font-bold">
                  Pedido guardado correctamente 🎉
                </h2>
              </div>
            )}
          </div>


          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-bold">Summary</h2>

            {cart.map((i, idx) => (
              <div key={idx} className="flex justify-between">
                <span>{i.name}</span>
                <span>${i.subtotal}</span>
              </div>
            ))}

            <div className="font-bold flex justify-between mt-4">
              <span>Total</span>
              <span>${total}</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .btn {
          width: 100%;
          background: #55a605;
          color: white;
          padding: 12px;
          border-radius: 8px;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}