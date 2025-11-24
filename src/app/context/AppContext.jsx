"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import Cart from "../components/HomePage/Cart";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [seller, setSeller] = useState(null);

  const [product, setProducts] = useState([]);

  const [user, setuser] = useState(null);
  const [cart, setCart] = useState({});

  const [search, setSearch] = useState("");

  const value = { seller, setSeller };

  const auth = async () => {
    try {
      const { data } = await axios.get(
        `https://chic-jewels-backend.onrender.com/seller/AuthSeller`,
        { withCredentials: true }
      );

      if (data.success) {
        console.log("✅ Authorized:", data.message);
        setSeller(true);
      } else {
        console.log("❌ Unauthorized:", data.message);
        setSeller(false);
      }
    } catch (error) {
      console.error("Auth error:", error);
      setSeller(false);
    }
  };

  const fetchproducts = async () => {
    try {
      const { data } = await axios.get(
        `https://chic-jewels-backend.onrender.com/product/list`,
        { withCredentials: true }
      );
      if (data) {
        // console.log("message", data);
        setProducts(data.products);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchUser = async () => {
    try {
      const { data } = await axios.get(
        `https://chic-jewels-backend.onrender.com/user/isAuth`,
        { withCredentials: true }
      );
      if (data.success) {
        setuser(data.findUser);
        setCart(data.findUser.CartItems);
      }
    } catch (error) {
      setuser(null);
    }
  };

  const addToCart = (itemId) => {
    let cartData = structuredClone(cart);

    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }
    setCart(cartData);
    toast.success("Add to Cart");
  };

  const updateCart = (itemId, qty) => {
    let cartData = structuredClone(cart);
    cartData[itemId] = qty;
    setCart(cartData);
    toast.success("Cart Update");
  };

  const removeCart = (itemId) => {
    const cartData = structuredClone(cart);
    if (cartData[itemId]) {
      cartData[itemId] -= 1;

      if (cartData[itemId] === 0) {
        delete cartData[itemId];
      }
    }
    setCart(cartData);
    toast.success("remove From cart");
  };

  useEffect(() => {
    const updateCartItem = async () => {
      try {
        const { data } = await axios.post(
          `https://chic-jewels-backend.onrender.com/cart/update`,
          { userId: user._id, cart },
          { withCredentials: true }
        );
        if (!data.success) {
          toast.error(data.message);
        }
        console.log("datadata", data);
      } catch (error) {
        toast.error(data.message);
      }
    };
    if (user) {
      updateCartItem();
    }
  }, [cart]);

  const router = useRouter();
  useEffect(() => {
    auth();
    fetchproducts();
    fetchUser();
  }, []);

  useEffect(() => {
    if (seller === false) {
      router.push("/seller/login");
    }
  }, [seller, router]);

  console.log(seller);
  <ToastContainer />;
  return (
    <AppContext.Provider
      value={{
        value,
        product,
        setProducts,
        seller,
        setSeller,
        fetchproducts,
        user,
        cart,
        setuser,
        addToCart,
        updateCart,
        removeCart,
        setCart,
        search,
        setSearch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
