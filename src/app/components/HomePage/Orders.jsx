"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useAppContext } from "@/app/context/AppContext";

const Orders = () => {
  const { user } = useAppContext();
  const [orders, setOrders] = useState([]);

  const FetchOrder = async () => {
    try {
      const { data } = await axios.get(
        `https://chic-jewels-backend.onrender.com/order/user`,
        {
          params: { userId: user._id }, // ✅ backend needs userId
          withCredentials: true,
        }
      );

      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (user?._id) {
      FetchOrder();
    }
  }, [user]);

  return (
    <div className="container mx-auto mt-14 p-4 md:p-0">
      <div className="flex flex-col items-end w-max mb-8">
        <p className="text-2xl uppercase">My Orders</p>
        <div className="w-16 h-0.5 bg-[#4FBF8B] rounded-full text-end"></div>
      </div>

      {orders.length === 0 && (
        <p className="text-gray-500 text-center">No orders found.</p>
      )}

      {orders.map((order) => (
        <div
          key={order._id}
          className="border border-gray-300 mb-10 p-4 max-w-4xl rounded-lg"
        >
          <p className="flex flex-col md:items-center justify-between text-gray-400 md:flex-row">
            <span>OrderId: {order._id}</span>
            <span>Payment: {order.paymentType}</span>
            <span>Total Amount: {order.amount}</span>
          </p>

          {order.items.map((item, idx) => {
            const product = item.product; // could be null
            return (
              <div
                key={idx}
                className="last:border-b-0 flex flex-col md:flex-row justify-between md:items-center gap-3 md:gap-0 border-b py-4 border-gray-300"
              >
                <div className="flex items-center gap-6">
                  <div className="bg-[#EDF8F3] p-2 rounded">
                    {product?.image?.[0] ? (
                      <Image
                        src={product.image[0]}
                        alt={product.name}
                        height={70}
                        width={70}
                        className="rounded"
                      />
                    ) : (
                      <div className="h-[70px] w-[70px] bg-gray-200 flex items-center justify-center text-gray-500 text-sm rounded">
                        No Img
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg text-gray-800">
                      {product?.name || "Unknown Product"}
                    </h3>
                    <p className="text-gray-400">
                      Category: {product?.category || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="text-gray-400 text-md flex flex-col gap-0.5">
                  <p>Quantity: {item.quantity || "1"}</p>
                  <p>Status: {order.status}</p>
                  <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>

                <p className="text-[#4FBF8B] text-lg">
                  Amount:{" "}
                  {product?.offerPrice
                    ? product.offerPrice * item.quantity
                    : order.amount}
                </p>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Orders;
