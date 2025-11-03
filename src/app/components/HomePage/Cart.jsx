"use client";
import {
  ArrowLeft,
  ShoppingCart,
  ArrowRight,
  ShoppingBag,
  Heart,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { dummyAddress } from "../../../../public/assets";
import { useAppContext } from "@/app/context/AppContext";
import Link from "next/link";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

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

  const subtotal = cartArray.reduce(
    (acc, item) => acc + item.offerPrice * item.quantity,
    0
  );

  const shipping = subtotal > 100 ? 0 : 10; // Free shipping
  const tax = (subtotal * 0.02).toFixed(2); // 2% tax
  const total = (subtotal + parseFloat(tax) + shipping).toFixed(2);

  return cartArray.length > 0 ? (
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

        <Link
          href="/allproduct"
          className="group  flex items-center mt-8 gap-2 text-[#4FBF8B] font-medium"
        >
          <ArrowLeft />
          Continue Shopping
        </Link>
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
            <span>${subtotal.toFixed(2)}</span>
          </p>
          <p className="flex justify-between">
            <span>Shipping Fee</span>
            <span className="text-[#4FBF8B]">
              {shipping === 0 ? "Free" : `$${shipping}`}
            </span>
          </p>
          <p className="flex justify-between">
            <span>Tax (2%)</span>
            <span>${tax}</span>
          </p>
          <p className="flex justify-between text-lg font-medium mt-3">
            <span>Total Amount:</span>
            <span>${Math.round(total)}</span>
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
  ) : (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-[#EDF8F3]/30">
      <div className="container mx-auto px-4 py-8 md:py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-light tracking-tight text-gray-900 mb-4"
          >
            Your Cart
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-20 h-1 bg-gradient-to-r from-[#EDF8F3] to-emerald-200 mx-auto rounded-full"
          />
        </div>

        {/* Empty Cart Illustration */}
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            {/* Main Card */}
            <div className="bg-white/70 backdrop-blur-sm border border-gray-100 rounded-3xl p-12 md:p-16 shadow-xl shadow-gray-100/50">
              {/* Custom Cart Icon with Animation */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.5,
                  type: "spring",
                  stiffness: 200,
                }}
                className="relative mx-auto mb-8 w-32 h-32 md:w-40 md:h-40"
              >
                {/* Background Circle */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#EDF8F3] to-emerald-100 rounded-full opacity-20 animate-pulse" />

                {/* Cart Icon Container */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    {/* Shopping Bag */}
                    <ShoppingBag className="w-16 h-16 md:w-20 md:h-20 text-emerald-400 stroke-[1.5]" />

                    {/* Floating Hearts */}
                    <motion.div
                      animate={{
                        y: [-5, -15, -5],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute -top-6 -right-6"
                    >
                      <Heart className="w-6 h-6 text-rose-300 fill-current" />
                    </motion.div>

                    <motion.div
                      animate={{
                        y: [-3, -12, -3],
                        opacity: [0.3, 0.8, 0.3],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5,
                      }}
                      className="absolute -bottom-4 -left-4"
                    >
                      <Heart className="w-4 h-4 text-pink-300 fill-current" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Empty State Text */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-center space-y-6"
              >
                <h2 className="text-2xl md:text-3xl font-light text-gray-800 tracking-tight">
                  Your cart is waiting
                </h2>

                <p className="text-lg text-gray-500 leading-relaxed max-w-md mx-auto">
                  Discover amazing products and fill your cart with items you'll
                  love
                </p>

                {/* Call to Action */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                  className="pt-6 flex justify-center"
                >
                  <Link
                    href="/allproduct"
                    className="group flex items-center gap-2  bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white border-0 rounded-full px-8 py-3 text-lg font-medium tracking-tight shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    Start Shopping
                    <ArrowRight className=" w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </motion.div>
              </motion.div>
            </div>

            {/* Decorative Elements */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-[#EDF8F3] to-emerald-200 rounded-full blur-sm opacity-60"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 1.7 }}
              className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-br from-rose-100 to-pink-100 rounded-full blur-sm opacity-40"
            />
          </motion.div>
        </div>

        {/* Additional Features Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          <div className="text-center p-6 rounded-2xl bg-white/40 backdrop-blur-sm border border-gray-100">
            <div className="w-12 h-12 bg-[#EDF8F3] rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="font-medium text-gray-800 mb-2">Easy Shopping</h3>
            <p className="text-sm text-gray-500">
              Browse and add items with just a click
            </p>
          </div>

          <div className="text-center p-6 rounded-2xl bg-white/40 backdrop-blur-sm border border-gray-100">
            <div className="w-12 h-12 bg-[#EDF8F3] rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="font-medium text-gray-800 mb-2">Save Favorites</h3>
            <p className="text-sm text-gray-500">
              Keep track of items you love
            </p>
          </div>

          <div className="text-center p-6 rounded-2xl bg-white/40 backdrop-blur-sm border border-gray-100">
            <div className="w-12 h-12 bg-[#EDF8F3] rounded-full flex items-center justify-center mx-auto mb-4">
              <ArrowRight className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="font-medium text-gray-800 mb-2">Quick Checkout</h3>
            <p className="text-sm text-gray-500">
              Seamless and secure payment process
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Cart;
