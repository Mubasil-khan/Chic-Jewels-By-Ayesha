"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useAppContext } from "@/app/context/AppContext";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const AddProduct = () => {
  const [file, setFile] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");

  const { fetchproducts } = useAppContext();

  const onSubmitHandal = async (event) => {
    try {
      event.preventDefault();
      const productdata = {
        name,
        description,
        category,
        price,
        offerPrice,
      };

      const formData = new FormData();
      formData.append("productData", JSON.stringify(productdata));
      for (let i = 0; i < file.length; i++) {
        formData.append("images", file[i]);
      }

      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/product/add`,
        formData,
        { withCredentials: true }
      );

      if (data.success) {
        toast("add");
        fetchproducts();
      } else {
        toast("problem");
      }
    } catch (error) {
      toast("catching error");
    }
  };

  return (
    <div className="flex flex-col justify-between bg-white">
      <form
        className="md:p-10 p-4 space-y-5 max-w-xl"
        onSubmit={onSubmitHandal}
      >
        {/* Upload Images */}
        <div>
          <p className="text-base font-medium">Product Image</p>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            {Array(4)
              .fill("")
              .map((_, index) => (
                <label key={index} htmlFor={`image${index}`}>
                  <input
                    accept="image/*"
                    type="file"
                    id={`image${index}`}
                    onChange={(e) => {
                      const updateFiles = [...file];
                      updateFiles[index] = e.target.files[0];
                      setFile(updateFiles);
                    }}
                    hidden
                  />

                  <div className="w-24 h-24  object-fill flex items-center justify-center overflow-hidden">
                    <Image
                      src={
                        file[index]
                          ? URL.createObjectURL(file[index])
                          : "/upload_area.png"
                      }
                      alt="uploadArea"
                      width={96}
                      height={96}
                      unoptimized
                      className="object-contain w-24 h-24"
                    />
                  </div>
                </label>
              ))}
          </div>
        </div>

        {/* Product Name */}
        <div className="flex flex-col gap-1 max-w-xl">
          <label className="text-base font-medium" htmlFor="product-name">
            Product Name
          </label>
          <input
            id="product-name"
            type="text"
            placeholder="Type here"
            className="outline-none md:py-2.5 py-2 px-3 w-full rounded border border-gray-500/40"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Product Description */}
        <div className="flex flex-col gap-1 max-w-xl">
          <label
            className="text-base font-medium"
            htmlFor="product-description"
          >
            Product Description
          </label>
          <textarea
            id="product-description"
            rows={4}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
            placeholder="Type here"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          ></textarea>
        </div>

        {/* Category */}
        <div className="w-full flex flex-col gap-1">
          <label className="text-base font-medium" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          >
            <option value="">Select Category</option>
            {["Electronics", "Clothing", "Accessories"].map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Price and Offer Price */}
        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex-1 flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="product-price">
              Product Price
            </label>
            <input
              id="product-price"
              type="number"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              required
            />
          </div>
          <div className="flex-1 flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="offer-price">
              Offer Price
            </label>
            <input
              id="offer-price"
              type="number"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              onChange={(e) => setOfferPrice(e.target.value)}
              value={offerPrice}
              required
            />
          </div>
        </div>

        <button className="px-8 py-2.5 bg-[#4FBF8B] text-white font-medium rounded">
          ADD
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddProduct;
