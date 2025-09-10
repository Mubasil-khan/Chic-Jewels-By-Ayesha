"use client";
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  const handalSignup = async (e) => {
    e.preventDefault();

    try {
      const register = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/register`,
        { name, email, password },
        { withCredentials: true }
      );
      if (register.data.success) {
        toast.success(register.data.message);
      } else {
        toast.error(register.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center h-screen items-center">
      <div className="bg-white text-gray-500 max-w-96 mx-4 md:p-6 p-4 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          <span className="text-[#4FBF8B]">User</span> Sign Up
        </h2>
        <form method="post">
          <input
            id="name"
            className="w-full bg-transparent border my-1.5 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
            type="text"
            placeholder="Enter your Name"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            id="email"
            className="w-full bg-transparent border my-1.5 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            id="password"
            className="w-full bg-transparent border my-1.5 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setpassword(e.target.value)}
            required
          />
          <div className="text-right py-2"></div>
          <button
            type="submit"
            onClick={handalSignup}
            className="w-full mb-3 bg-[#4FBF8B] py-2.5 rounded-full text-white cursor-pointer"
          >
            signup
          </button>
        </form>
        <p className="text-center mt-4">
          Already have account?{" "}
          <Link href="/login" className="text-blue-500 underline">
            Login
          </Link>
        </p>
        <button
          type="button"
          className="w-full flex items-center gap-2 justify-center mt-5 bg-black py-2.5 rounded-full text-white"
        >
          <img
            className="h-4 w-4"
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/appleLogo.png"
            alt="appleLogo"
          />
          signup in with Apple
        </button>
        <button
          type="button"
          className="w-full flex items-center gap-2 justify-center my-3 bg-white border border-gray-500/30 py-2.5 rounded-full text-gray-800"
        >
          <img
            className="h-4 w-4"
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleFavicon.png"
            alt="googleFavicon"
          />
          signup in with Apple
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
