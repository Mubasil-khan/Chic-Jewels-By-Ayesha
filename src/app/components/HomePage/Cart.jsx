"use client";
import { ArrowLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { dummyAddress } from "../../../../public/assets";
import { useAppContext } from "@/app/context/AppContext";
import Link from "next/link";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

const Cart = () => {
  const { cart, product, removeCart, updateCart, user, setCart } =
    useAppContext();
  const [showAddress, setShowAddress] = React.useState(false);

  const [cartArray, setcartArray] = useState([]);
  const [address, setAddress] = useState([]);
  const [selectaddress, setselectAddress] = useState(null);
  const [paymentOption, setpaymentOption] = useState("COD");

  const route = useRouter();

  const getCart = () => {
    let tempArray = [];
    for (const key in cart) {
      const products = product.find((item) => item._id === key);
      if (products) {
        tempArray.push({ ...products, quantity: cart[key] });
      }
    }
    setcartArray(tempArray);
  };

  const getAddress = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/address/get`,

        { withCredentials: true }
      );

      if (data.success) {
        setAddress(data.message);
        console.log("data.message", data.message);

        if (data.message.length > 0) {
          setselectAddress(data.message[0]);
          console.log("selectaddressselectaddressselectaddress", selectaddress);
        }
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const PlaceOreder = async () => {
    try {
      if (!selectaddress) {
        return toast.error("Please Select Address");
      }
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/order/createOrder`,
        {
          userId: user._id,
          items: cartArray.map((item) => ({
            product: item._id,
            quantity: item.quantity,
          })),
          address: selectaddress._id,
        },
        { withCredentials: true }
      );

      if (data.success) {
        toast.success(data.message);
        route.push("/orders");
        setCart({});
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getCart();
  }, [product, cart]);

  useEffect(() => {
    if (user) {
      getAddress();
    }
  }, [user]);

  return (
    <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto">
      <div className="flex-1 max-w-4xl">
        <h1 className="text-3xl font-medium mb-6">
          Shopping Cart <span className="text-sm text-[#4FBF8B]">3 Items</span>
        </h1>

        <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
          <p className="text-left">Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {cartArray.map((product, index) => (
          <div
            key={index}
            className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3"
          >
            <div className="flex items-center md:gap-6 gap-3">
              <div className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded overflow-hidden">
                <img
                  className="max-w-full h-full object-cover"
                  src={product.image[0]}
                  alt={product.name}
                />
              </div>
              <div>
                <p className="hidden md:block font-semibold">{product.name}</p>
                <div className="font-normal text-gray-500/70">
                  <p>
                    Size: <span>{product.size || "N/A"}</span>
                  </p>
                  <div className="flex items-center">
                    <p>Qty:</p>
                    <select
                      className="outline-none"
                      onChange={(e) =>
                        updateCart(product._id, Number(e.target.value))
                      }
                      value={cart[product._id]}
                    >
                      {Array(cart[product._id] > 9 ? cart[product._id] : 9)
                        .fill("")
                        .map((_, index) => (
                          <option key={index} value={index + 1}>
                            {index + 1}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center">
              ${product.offerPrice * product.quantity}
            </p>
            <button
              className="cursor-pointer mx-auto"
              onClick={() => removeCart(product._id)}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m12.5 7.5-5 5m0-5 5 5m5.833-2.5a8.333 8.333 0 1 1-16.667 0 8.333 8.333 0 0 1 16.667 0"
                  stroke="#FF532E"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        ))}

        <button className="group cursor-pointer flex items-center mt-8 gap-2 text-[#4FBF8B] font-medium">
          <ArrowLeft />
          Continue Shopping
        </button>
      </div>

      <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
        <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
        <hr className="border-gray-300 my-5" />

        <div className="mb-6">
          <p className="text-sm font-medium uppercase">Delivery Address</p>
          <div className="relative flex justify-between items-start mt-2">
            {address.length === 0 ? (
              <p className="text-gray-500">No address found</p>
            ) : (
              <p className="text-gray-500">
                {selectaddress
                  ? ` 
                  ${selectaddress.street}, ${selectaddress.city},
                  ${selectaddress.state} ,
                  ${selectaddress.country},${selectaddress.zipcode}`
                  : "Select an address"}
              </p>
            )}

            <button
              onClick={() => setShowAddress(!showAddress)}
              className="text-[#4FBF8B] hover:underline cursor-pointer"
            >
              Change
            </button>

            {showAddress && (
              <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full">
                {address.map((addr) => (
                  <p
                    key={addr._id}
                    onClick={() => {
                      setselectAddress(addr);
                      setShowAddress(false);
                    }}
                    className="text-gray-500 p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {addr.firstName} {addr.lastName} <br />
                    {addr.street}, {addr.city},{addr.state} {addr.country},
                    {addr.zipcode}
                  </p>
                ))}

                <Link
                  href="/address"
                  onClick={() => setShowAddress(false)}
                  className="text-[#4FBF8B] flex items-center !w-full justify-center cursor-pointer p-2 hover:bg-indigo-500/10"
                >
                  Add address
                </Link>
              </div>
            )}
          </div>

          <p className="text-sm font-medium uppercase mt-6">Payment Method</p>

          <select className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none">
            <option value="COD">Cash On Delivery</option>
            <option value="Online">Online Payment</option>
          </select>
        </div>

        <hr className="border-gray-300" />

        <div className="text-gray-500 mt-4 space-y-2">
          <p className="flex justify-between">
            <span>Price</span>
            <span>$20</span>
          </p>
          <p className="flex justify-between">
            <span>Shipping Fee</span>
            <span className="text-[#4FBF8B]">Free</span>
          </p>
          <p className="flex justify-between">
            <span>Tax (2%)</span>
            <span>$20</span>
          </p>
          <p className="flex justify-between text-lg font-medium mt-3">
            <span>Total Amount:</span>
            <span>$20</span>
          </p>
        </div>

        <button
          onClick={PlaceOreder}
          className="w-full py-3 mt-6 cursor-pointer bg-[#4FBF8B] text-white font-medium hover:[#4FBF8B] transition"
        >
          Place Order
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Cart;
