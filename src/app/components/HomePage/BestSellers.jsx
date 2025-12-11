"use client";
import React from "react";
import Image from "next/image";
import { useState } from "react";
import { useAppContext } from "@/app/context/AppContext";
import { ShoppingCart } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import "swiper/css";

const BestSellers = () => {
  const [count, setCount] = React.useState(0);

  const { product, updateCart, addToCart, removeCart, cart, setCart } =
    useAppContext();
  // const product = {
  //   name: "Casual Shoes",
  //   category: "Sports",
  //   price: 100,
  //   offerPrice: 80,
  //   rating: 4,
  //   image:
  //     "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImageWithoutBg.png",
  // };
  return (
    product && (
      <div className="container mx-auto p-4 sm:p-0 my-0  block">
        <h4 className="text-3xl font-semibold text-[#705436] flex flex-col gap-2 w-39 items-end mb-5">
          Best Sellers
          <div className="border-2 w-18 rounded text-[#F2DED5]"></div>
        </h4>
        <Swiper
          spaceBetween={30}
          className="mySwiper !flex !justify-between"
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            924: { slidesPerView: 4 },
            1300: { slidesPerView: 5 },
          }}
        >
          {product
            .filter((item) => item.BestSellers === true)
            .map((product) => (
              <SwiperSlide className="!flex md:!justify-between !justify-center">
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
                      <p>(5{product.rating})</p>
                    </div>
                    <div className="flex items-end justify-between mt-3">
                      <p className="md:text-xl text-base font-medium text-[#705436]">
                        ₹{product.offerPrice}{" "}
                        <span className="text-gray-500/60 md:text-sm text-xs line-through">
                          ₹{product.price}
                        </span>
                      </p>
                      <div
                        className="text-[#705436]"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {!cart[product._id] ? (
                          <button
                            className="flex items-center justify-center cursor-pointer gap-1 bg-[#F2DED5] border border-[#705436] md:w-[80px] w-[64px] h-[34px] rounded text-[#4FBF8B] font-medium"
                            onClick={() => {
                              addToCart(product._id);
                            }}
                          >
                            <ShoppingCart className="h-4.5 w-4.5" /> Add
                          </button>
                        ) : (
                          <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-[#F2DED5] rounded select-none">
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
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    )
  );
};

export default BestSellers;
