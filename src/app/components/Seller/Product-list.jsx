"use client";
import { useAppContext } from "@/app/context/AppContext";
import axios from "axios";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

const Productlist = () => {
  const { fetchproducts, product } = useAppContext();

  const productStock = async (id, instock) => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/product/stock`,
        { id, instock },
        { withCredentials: true }
      );
      if (data.success) {
        fetchproducts();
        toast.success("Stock updated ");
      } else {
        toast.error("Update issue ❌");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const bestSellers = async (id, BestSellers) => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/product/bestSellers`,
        { id, BestSellers },
        { withCredentials: true }
      );
      if (data.success) {
        fetchproducts();
        toast.success("bestSellers updated ");
      } else {
        toast.error("Update issue ❌");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex-1 py-10 flex flex-col justify-between">
      <div className="w-full md:p-10 p-4">
        <h2 className="pb-4 text-lg font-medium">All Products</h2>
        <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
          <table className="md:table-auto table-fixed w-full overflow-hidden">
            <thead className="text-gray-900 text-sm text-left">
              <tr>
                <th className="px-4 py-3 font-semibold truncate">Product</th>
                <th className="px-4 py-3 font-semibold truncate">Category</th>
                <th className="px-4 py-3 font-semibold truncate hidden md:block">
                  Selling Price
                </th>
                <th className="px-4 py-3 font-semibold truncate">In Stock</th>
                <th className="px-4 py-3 font-semibold truncate">
                  Best Sellers
                </th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-500">
              {Array.isArray(product) && product.length > 0 ? (
                product.map((product, index) => (
                  <tr
                    key={product._id || index}
                    className="border-t border-gray-500/20"
                  >
                    <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                      <div className="border border-gray-300 rounded overflow-hidden">
                        <img
                          src={product.image[0]}
                          alt="Product"
                          className="w-16"
                        />
                      </div>
                      <span className="truncate max-sm:hidden w-full">
                        {product.name}
                      </span>
                    </td>
                    <td className="px-4 py-3">{product.category}</td>
                    <td className="px-4 py-3 max-sm:hidden">
                      ${product.offerPrice}
                    </td>
                    <td className="px-4 py-3">
                      <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={product.instock}
                          onChange={() =>
                            productStock(product._id, !product.instock)
                          }
                        />
                        <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200"></div>
                        <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                      </label>
                    </td>
                    <td className="px-4 py-3">
                      <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={product.BestSellers}
                          onChange={() =>
                            bestSellers(product._id, !product.BestSellers)
                          }
                        />
                        <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200"></div>
                        <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                      </label>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-400">
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Productlist;
