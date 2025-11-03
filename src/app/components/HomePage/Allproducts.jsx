"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useAppContext } from "@/app/context/AppContext";
import Link from "next/link";

import { motion } from "framer-motion";
import {
  Search,
  Home,
  ArrowLeft,
  Package,
  Mail,
  ShoppingBag,
  Sparkles,
  ShoppingCart,
} from "lucide-react";
import Categories from "./Categories";

const Allproducts = () => {
  const { product, updateCart, addToCart, removeCart, cart, setCart, search } =
    useAppContext();

  const filterSearch = product.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // product not found

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    // Simulate search delay
    setTimeout(() => {
      setIsSearching(false);
      // Here you would typically redirect to search results
      console.log("Searching for:", searchQuery);
    }, 1000);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="container mx-auto my-18 block p-4">
      {filterSearch.length > 0 ? (
        <div>
          <h2 className="text-3xl text-gray-600 mb-4">All products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 xl:grid-cols-5 gap-10">
            {filterSearch.map((product) => (
              <div className="!flex md:!justify-between !justify-center">
                <div className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white min-w-56 max-w-56 w-full">
                  <Link
                    href={`/products/${product.category}/${product._id}`}
                    className="group  flex items-center justify-center px-2"
                  >
                    <img
                      className="group-hover:scale-105 transition max-w-26 md:max-w-36"
                      src={product.image[0]}
                      alt={product.name}
                    />
                  </Link>

                  <div className="text-gray-500/60 text-sm">
                    <p>{product.category}</p>
                    <p className="text-gray-700 font-medium text-lg truncate w-full">
                      {product.name}
                    </p>
                    <div className="flex items-center gap-0.5">
                      <Image
                        src="/star_icon.svg"
                        alt="rating"
                        height={13}
                        width={13}
                      />
                      <Image
                        src="/star_icon.svg"
                        alt="rating"
                        height={13}
                        width={13}
                      />
                      <Image
                        src="/star_icon.svg"
                        alt="rating"
                        height={13}
                        width={13}
                      />
                      <Image
                        src="/star_icon.svg"
                        alt="rating"
                        height={13}
                        width={13}
                      />
                      <Image
                        src="/star_icon.svg"
                        alt="rating"
                        height={13}
                        width={13}
                      />
                      <p>({product.rating})</p>
                    </div>
                    <div className="flex items-end justify-between mt-3">
                      <p className="md:text-xl text-base font-medium text-[#4FBF8B]">
                        ${product.offerPrice}{" "}
                        <span className="text-gray-500/60 md:text-sm text-xs line-through">
                          ${product.price}
                        </span>
                      </p>
                      <div
                        className="text-[#4FBF8B]"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {!cart[product._id] ? (
                          <button
                            className="flex items-center justify-center cursor-pointer gap-1 bg-[#EDF8F3] border border-[#4FBF8B] md:w-[80px] w-[64px] h-[34px] rounded text-[#4FBF8B] font-medium"
                            onClick={() => {
                              addToCart(product._id);
                            }}
                          >
                            <ShoppingCart className="h-4.5 w-4.5" /> Add
                          </button>
                        ) : (
                          <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-[#EDF8F3] rounded select-none">
                            <button
                              onClick={() => {
                                removeCart(product._id);
                              }}
                            >
                              -
                            </button>
                            <span className="w-5 text-center">
                              {cart[product._id]}
                            </span>
                            <button
                              onClick={() => {
                                addToCart(product._id);
                              }}
                            >
                              +
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="min-h-screen  bg-gradient-to-br rounded p-10 from-[#edf8f34f]  via-[#EDF8F3] to-white relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute top-20 left-10 w-32 h-32 bg-[#EDF8F3] rounded-full opacity-20"
              variants={floatingVariants}
              animate="animate"
            />
            <motion.div
              className="absolute bottom-32 right-16 w-24 h-24 bg-[#F6D55C] rounded-full opacity-10"
              variants={floatingVariants}
              animate="animate"
              transition={{ delay: 0.5 }}
            />
            <motion.div
              className="absolute top-1/3 right-1/4 w-16 h-16 bg-[#EDF8F3] rounded-full opacity-15"
              variants={floatingVariants}
              animate="animate"
              transition={{ delay: 1 }}
            />
          </div>

          <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
            <motion.div
              className="w-full mx-auto text-center"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Main Icon */}
              <motion.div
                className="inline-flex items-center justify-center w-32 h-32 mb-8 bg-gradient-to-br from-[#EDF8F3] to-white rounded-full shadow-xl border border-white/50"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Package className="w-12 h-12 text-[#2D3748]" />
                <motion.div
                  className="absolute -top-2 -right-2"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <Sparkles className="w-6 h-6 text-[#F6D55C]" />
                </motion.div>
              </motion.div>

              {/* Heading */}
              <motion.h1
                className="text-5xl md:text-6xl font-bold text-[#2D3748] mb-4 tracking-tight"
                variants={itemVariants}
              >
                Product Not Found
              </motion.h1>

              {/* Subheading */}
              <motion.p
                className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed max-w-lg mx-auto font-light"
                variants={itemVariants}
              >
                The product you're looking for might have been moved, removed,
                or doesn't exist.
              </motion.p>

              {/* Search Bar */}
              {/* <motion.div variants={itemVariants}>
                <div className="p-2 mb-8 bg-white/80 backdrop-blur-sm shadow-2xl border-white/50 max-w-md mx-auto">
                  <form onSubmit={handleSearch} className="flex gap-2">
                    <button
                      type="submit"
                      disabled={isSearching}
                      className="bg-gradient-to-r from-[#EDF8F3] to-[#d4f4dd] hover:from-[#d4f4dd] hover:to-[#EDF8F3] text-[#2D3748] border-0 px-6 font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      {isSearching ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="w-4 h-4 border-2 border-[#2D3748] border-t-transparent rounded-full"
                        />
                      ) : (
                        "Search"
                      )}
                    </button>
                  </form>
                </div>
              </motion.div> */}

              {/* Action buttons */}
              {/* <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
                variants={itemVariants}
              >
                <button
                  asChild
                  className="bg-gradient-to-r from-[#2D3748] to-[#4A5568] hover:from-[#1A202C] hover:to-[#2D3748] text-white px-8 py-3 rounded-full font-medium shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <Link href="" className="flex items-center gap-2">
                    <Home className="w-4 h-4" />
                    Go Home
                  </Link>
                </button>

                <button
                  variant="outline"
                  className="border-2 border-[#EDF8F3] text-[#2D3748] hover:bg-[#EDF8F3] px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white/50 backdrop-blur-sm"
                  onClick={() => window.history.back()}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Go Back
                </button>
              </motion.div> */}

              {/* Quick Links */}
              <motion.div variants={itemVariants}>
                <Categories />
              </motion.div>

              {/* Contact Support */}
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Allproducts;
