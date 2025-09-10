"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { assets } from "../../../../public/assets";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/order/seller`,
        {
          withCredentials: true,
        }
      );
      if (data.success) {
        setOrders(Array.isArray(data.orders) ? data.orders : [data]);
        console.log("seller Order", data.orders);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="md:p-10 p-4 space-y-4">
      <h2 className="text-lg font-medium">Orders List</h2>
      {orders.map((order, index) => (
        <div
          key={index}
          className="flex flex-col md:grid md:grid-cols-[2fr_1fr_1fr_1fr] md:items-center gap-5 p-5 max-w-4xl rounded-md border border-gray-300 text-gray-800"
        >
          <div className="flex gap-5">
            <Image
              src={assets.box_icon}
              alt="order_icon"
              height={80}
              width={80}
            />
            {/* <img
              className="w-12 h-12 object-cover opacity-60"
              src={boxIcon}
              alt="boxIcon"
            /> */}
            <>
              {order.items?.map((item, index) => (
                <div key={index} className="flex flex-col justify-center">
                  <p className="font-medium">
                    {item.product?.name}{" "}
                    <span
                      className={`text-[#4FBF92] ${
                        item.quantity < 2 && "hidden"
                      }`}
                    >
                      x {item.quantity}
                    </span>
                  </p>
                </div>
              ))}
            </>
          </div>

          <div className="text-sm">
            <p className="font-medium mb-1">
              {order.address.firstName} {order.address.lastName}
            </p>
            <p>
              {order.address.street}, {order.address.city},{" "}
              {order.address.state},{order.address.zipcode},{" "}
              {order.address.country}
            </p>
          </div>

          <p className="font-medium text-base my-auto text-black/70">
            ${order.amount}
          </p>

          <div className="flex flex-col text-sm">
            <p>Method: {order.paymentType}</p>
            <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
            <p>Payment: {order.isPaid ? "Paid" : "Pending"}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
