"use client";
import React from "react";
import Image from "next/image";
import { useState } from "react";
import { useAppContext } from "@/app/context/AppContext";
import { ShoppingCart } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import "swiper/css";
import { useParams } from "next/navigation";

const Categories = () => {
  const [count, setCount] = React.useState(0);

  const { product, updateCart, addToCart, removeCart, cart, setCart } =
    useAppContext();

  console.log("All products:", product);

  const { categories } = useParams();
  console.log("categoriescategories", categories);

  const categoryMap = {
    "organic-veggies": "Vegetables",
    "fresh-fruits": "Fruits",
    "cold-drinks": "Drinks",
    "instant-food": "instant",
    "dairy-products": "dairy",
    "bakery-%26-breads": "Bakery",
    "grains-%26-cereals": "Grains",
  };

  const FilterData = product.filter(
    (p) => p.category.toLowerCase() === categoryMap[categories]?.toLowerCase()
  );

  return (
    <div className="container mx-auto my-8 block">
      <h2 className="text-3xl text-gray-600 mb-4">{categories}</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
        {FilterData.map((product) => (
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
  );
};

export default Categories;
