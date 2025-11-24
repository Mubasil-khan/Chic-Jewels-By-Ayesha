"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const sellerLogin = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [seller, setSeller] = useState(false);

  console.log("NEXT_PUBLIC_BACKEND_URL", process.env.NEXT_PUBLIC_BACKEND_URL);

  const handalSubmit = async (event) => {
    try {
      event.preventDefault();
      const { data } = await axios.post(
        `https://chic-jewels-backend.onrender.com/seller/login`,
        { email, password },
        { withCredentials: true }
      );

      if (data.success) {
        toast.success(` ${data.message}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        router.push("/seller/add-product");
      } else {
        toast.error(`❌ ${data.message}`, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    !seller && (
      <div className="h-screen w-full !overflow-hidden justify-center items-center flex container mx-auto p-4">
        <form
          class="max-w-96 w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white"
          onSubmit={handalSubmit}
        >
          <h1 class="text-gray-900 text-3xl mt-10 font-medium">
            {" "}
            <span className="text-[#44AE7C]">Seller</span> Login
          </h1>
          <p class="text-gray-500 text-sm mt-2">Please sign in to continue</p>
          <div class="flex items-center w-full mt-10 bg-white border  border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <svg
              width="16"
              height="11"
              viewBox="0 0 16 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z"
                fill="#6B7280"
              />
            </svg>
            <input
              type="email"
              placeholder="Email id"
              class="bg-transparent text-gray-500  placeholder-gray-500 outline-none text-sm w-full h-full"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>

          <div class="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <svg
              width="13"
              height="17"
              viewBox="0 0 13 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z"
                fill="#6B7280"
              />
            </svg>
            <input
              type="password"
              placeholder="Password"
              class="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>
          <div class="mt-3 text-left text-indigo-500"></div>

          <button
            type="submit"
            class="mt-2 w-full h-11 rounded-full text-white bg-[#44AE7C] cursor-pointer hover:opacity-90 transition-opacity"
          >
            Login
          </button>

          <p class="text-gray-500 text-sm mt-3 mb-6"></p>
          <ToastContainer position="top-right" autoClose={3000} />
        </form>
      </div>
    )
  );
};

export default sellerLogin;
