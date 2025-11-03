"use client";
import { useAppContext } from "@/app/context/AppContext";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ProductDetail = () => {
  const { product, addToCart, removeCart, cart } = useAppContext();

  const param = useParams();

  // find product by id (convert to string to avoid mismatch)
  const ProductDetail = product?.find(
    (p) => String(p._id) === String(param.id)
  );

  const route = useRouter();

  // if not found or still loading
  if (!ProductDetail) {
    return (
      <div className="max-w-6xl w-full px-6 my-20 container mx-auto">
        <p className="text-center text-gray-500">Loading product...</p>
      </div>
    );
  }

  const [thumbnail, setThumbnail] = useState(ProductDetail.image?.[0]);

  return (
    <div className="container mx-auto my-20 ">
      <div className="max-w-6xl w-full px-6 mb-20">
        <p>
          <span>Home</span> / <span>Products</span> /
          <span> {ProductDetail.category}</span> /
          <span className="text-[#4FBF8B]"> {ProductDetail.name}</span>
        </p>

        <div className="flex flex-col md:flex-row gap-16 mt-4">
          {/* Thumbnail & main image */}
          <div className="flex gap-3">
            <div className="flex flex-col gap-3">
              {ProductDetail.image?.map((image, index) => (
                <div
                  key={index}
                  onClick={() => setThumbnail(image)}
                  className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer"
                >
                  <img src={image} alt={`Thumbnail ${index + 1}`} />
                </div>
              ))}
            </div>

            <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden relative">
              <img
                src={thumbnail}
                alt="Selected product"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Details */}
          <div className="text-sm w-full md:w-1/2">
            <h1 className="text-3xl font-medium">{ProductDetail.name}</h1>

            <div className="mt-6">
              <p className="text-gray-500/70 line-through">
                MRP: ${ProductDetail.price}
              </p>
              <p className="text-2xl font-medium">
                MRP: ${ProductDetail.offerPrice}
              </p>
              <span className="text-gray-500/70">(inclusive of all taxes)</span>
            </div>

            <p className="font-medium text-lg mt-6 mb-2">About Product</p>
            <ul className="list-disc ml-4 text-gray-500/70">
              {ProductDetail.description?.split("\n").map((line, index) => (
                <li key={index}>{line}</li>
              ))}
            </ul>

            <div className="flex items-center mt-10 gap-4 text-base">
              {!cart[ProductDetail._id] ? (
                <button
                  onClick={() => {
                    addToCart(ProductDetail._id);
                  }}
                  className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition"
                >
                  Add to Cart
                </button>
              ) : (
                <div className="flex items-center py-3.5 w-full justify-center gap-8  bg-[#EDF8F3] rounded select-none">
                  <button
                    onClick={() => {
                      removeCart(ProductDetail._id);
                    }}
                    className="cursor-pointer text-lg font-semibold text-zinc-600"
                  >
                    -
                  </button>
                  <span className="w-5 text-center text-lg font-semibold text-zinc-600">
                    {cart[ProductDetail._id]}
                  </span>
                  <button
                    onClick={() => {
                      addToCart(ProductDetail._id);
                    }}
                    className="cursor-pointer text-lg font-semibold text-zinc-600"
                  >
                    +
                  </button>
                </div>
              )}

              <button
                onClick={() => {
                  addToCart(ProductDetail._id);
                  route.push("/cart");
                }}
                className="w-full py-3.5 cursor-pointer font-medium bg-[#4FBF8B] text-white hover:bg-[#4fbf8bda] transition"
              >
                Buy now
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h4 className="text-3xl font-semibold text-zinc-600 flex flex-col gap-2 w-58 items-end my-8">
          Related Products
          <div className="border-2 w-30 rounded text-[#4FBF8B]"></div>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 xl:grid-cols-5 gap-10 ">
          {product
            .filter(
              (p) =>
                p.category === ProductDetail.category &&
                p._id !== ProductDetail._id
            )
            .map((product) => (
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
    </div>
  );
};

export default ProductDetail;
