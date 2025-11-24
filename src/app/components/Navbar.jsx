"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, ShoppingCart, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useAppContext } from "../context/AppContext";
import { assets } from "../../../public/assets";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [menu, setMenu] = useState(false);

  const { user, setuser, setSearch, search } = useAppContext();

  const logout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `https://chic-jewels-backend.onrender.com/user/logout`,

        { withCredentials: true }
      );

      if (data.success) {
        toast.success(data.message);
        setuser(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [hide, setHide] = useState(true);

  const pathName = usePathname();

  const router = useRouter();

  if (search && search.length > 0) {
    router.push("/allproduct");
  }

  const [timeLeft, setTimeLeft] = useState(594); // 600s = 10 min

  useEffect(() => {
    if (!hide) return; // stop when banner hidden
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, hide]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="bg-[#EDF8F3] shadow-lg">
      {hide && (
        <div class="text-center    text-white font-medium py-2 bg-gradient-to-r from-violet-500 via-[#9938CA] to-[#E0724A]">
          <p className="relative">
            Exclusive Price Drop! Hurry,{" "}
            <span class="underline underline-offset-2">
              Offer Ends in {formatTime(timeLeft)} !
            </span>
            <div
              className="absolute inset-0 flex items-center justify-end mr-20 cursor-pointer"
              onClick={() => {
                setHide(false);
              }}
            >
              <X className="" />
            </div>
          </p>
        </div>
      )}
      <div className="flex justify-between  items-center container mx-auto p-4 md:p-0 md:py-4  py-4">
        <Link href="/">
          <Image src="/logo.svg" height={160} width={160} alt="Logo" />
        </Link>

        <ul className="lg:flex items-center gap-4 hidden">
          <li>
            <Link
              href="/"
              className={`  ${
                pathName === "/"
                  ? "text-[#44AE7C] text-lg font-semibold"
                  : "text-zinc-500 text-md"
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href=""
              className={`  ${
                pathName === ""
                  ? "text-[#44AE7C] text-lg font-semibold"
                  : "text-zinc-500 text-md"
              }`}
            >
              Categories
            </Link>
          </li>
          <li>
            <Link
              href="/cart"
              className={`  ${
                pathName === "/cart"
                  ? "text-[#44AE7C] text-lg font-semibold"
                  : "text-zinc-500 text-md"
              }`}
            >
              cart
            </Link>
          </li>

          <li>
            <Link
              href="/allproduct"
              className={`  ${
                pathName === "/allproduct"
                  ? "text-[#44AE7C] text-lg font-semibold"
                  : "text-zinc-500 text-md"
              }`}
            >
              All Product
            </Link>
          </li>
          <li>
            <Link
              href=""
              className={`  ${
                pathName === ""
                  ? "text-[#44AE7C] text-lg font-semibold"
                  : "text-zinc-500 text-md"
              }`}
            >
              Contact Us
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-4">
          <input
            type="search"
            name=""
            id=""
            value={search}
            className="border border-zinc-400 py-1.5 px-4 rounded-lg outline-none hidden md:block"
            placeholder="Search Products"
            onChange={(e) => setSearch(e.target.value)}
          />

          {!user ? (
            <Link
              href="/login"
              className="py-1 px-4 md:px-6 bg-[#44AE7C] text-white text-lg rounded-3xl"
            >
              Login
            </Link>
          ) : (
            <div className="group relative">
              <Image src={assets.profile_icon} height={40} width={40} alt="" />
              <ul className="hidden group-hover:block absolute bg-white shadow-lg  top-10 right-0 z-40   w-30 rounded-md ">
                <Link href="/orders">
                  <li className="cursor-pointer hover:bg-[#44AE7C] rounded-t-md hover:text-white p-2">
                    My orders
                  </li>
                </Link>

                <li
                  className="cursor-pointer hover:bg-[#44AE7C]  rounded-b-md hover:text-white p-2"
                  onClick={logout}
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
          <button onClick={() => setMenu(!menu)}>
            {menu ? (
              <X className="h-7 w-7 lg:hidden cursor-pointer" />
            ) : (
              <Menu className="h-7 w-7 lg:hidden cursor-pointer" />
            )}
          </button>
        </div>
      </div>
      {menu ? (
        <div className="container mx-auto p-4 lg:hidden">
          <ul className="flex flex-col  gap-4 ">
            <li>
              <Link href="" className="text-lg text-zinc-500">
                Home
              </Link>
            </li>
            <li>
              <Link href="" className="text-lg text-zinc-500">
                Home
              </Link>
            </li>
            <li>
              <Link href="" className="text-lg text-zinc-500">
                Home
              </Link>
            </li>
            <li>
              <Link href="" className="text-lg text-zinc-500">
                Home
              </Link>
            </li>
          </ul>
        </div>
      ) : null}
      <ToastContainer />
    </div>
  );
};

export default Navbar;
