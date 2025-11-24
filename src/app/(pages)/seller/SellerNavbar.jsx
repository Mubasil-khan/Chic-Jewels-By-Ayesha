import React from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const logout = async () => {
    try {
      const { data } = await axios.get(
        `https://chic-jewels-backend.onrender.com/seller/logout`,
        { withCredentials: true }
      );
      if (data.success) {
        toast.success(` You have been logged out successfully!`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        router.push("/seller/login");
      } else {
        toast.error(`❌ already Logout`, {
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
  };

  return (
    <div className="flex sticky top-0 w-full items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white">
      <Link href="/">
        <Image src="/logo.svg" height={150} width={150} alt="logo" />
      </Link>
      <div className="flex items-center gap-5 text-gray-500">
        <p>Hi! Admin</p>
        <button
          className="border rounded-full text-sm px-4 py-1 cursor-pointer"
          onClick={logout}
        >
          Logout
        </button>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
};

export default Navbar;
