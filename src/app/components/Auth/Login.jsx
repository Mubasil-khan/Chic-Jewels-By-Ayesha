"use client";
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const route = useRouter();

  const handalLogin = async (e) => {
    e.preventDefault();
    try {
      const login = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      if (login.data.success) {
        toast.success(login.data.message);
        route.push("/");
      } else {
        toast.error(login.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex justify-center h-screen items-center">
      <div className="bg-white text-gray-500 max-w-96 mx-4 md:p-6 p-4 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          <span className="text-[#4FBF8B]">User</span> Login
        </h2>
        <form>
          <input
            id="email"
            className="w-full bg-transparent border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            id="password"
            className="w-full bg-transparent border mt-1 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="text-right py-4">
            <a className="text-blue-600 underline" href="#">
              Forgot Password
            </a>
          </div>
          <button
            type="submit"
            className="w-full mb-3 bg-[#4FBF8B] py-2.5 rounded-full text-white cursor-pointer"
            onClick={handalLogin}
          >
            Log in
          </button>
        </form>
        <p className="text-center mt-4">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-blue-500 underline">
            Signup
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
          Log in with Apple
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
          Log in with Apple
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
