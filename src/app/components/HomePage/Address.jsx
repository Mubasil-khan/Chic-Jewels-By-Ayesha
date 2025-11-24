"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { assets } from "../../../../public/assets";
import axios from "axios";
import { useAppContext } from "@/app/context/AppContext";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

const Address = () => {
  const { user } = useAppContext();
  const router = useRouter();
  const InputField = ({ type, placeholder, name, handleChange, address }) => {
    return (
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={handleChange}
        value={address[name]}
        required
        className="w-full transition px-2 py-2.5 border-gray-500/30 rounded text-gray-500 border focus:border-[#4FBF8B] outline-none"
      />
    );
  };

  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `https://chic-jewels-backend.onrender.com/address/add`,
        { address, userId: user._id },
        { withCredentials: true }
      );

      if (data.success) {
        toast(data.message);
        router.push("/cart");
      } else {
        toast(data.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, []);

  const getAddressFromCoords = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=964814bd0d934091981b1064c1d4b435`
      );
      const data = await response.json();
      if (data.results.length > 0) {
        const components = data.results[0].components;
        return {
          city: components.city || components.town || "",
          state: components.state || "",
          country: components.country || "",
          zipcode: components.postcode || "",
          street: components.road || "",
        };
      }
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  const fetchLocation = () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const locationData = await getAddressFromCoords(latitude, longitude);

      if (locationData) {
        setAddress((prev) => ({
          ...prev,
          ...locationData,
        }));
      }
    });
  };

  return (
    <div className="container mx-auto my-10 p-10">
      <p className="text-gray-400 text-2xl md:text-3xl">
        Add Shipping{" "}
        <span className="text-[#4FBF8B] font-semibold">Address</span>
      </p>
      <div className="flex items-center gap-30 justify-between mt-7">
        <form className="flex flex-col gap-4 w-full" onSubmit={onSubmitForm}>
          <div className="flex items-center gap-2">
            <InputField
              type="text"
              name="firstName"
              placeholder="First Name"
              handleChange={handleChange}
              address={address}
            />
            <InputField
              type="text"
              name="lastName"
              placeholder="Last Name"
              handleChange={handleChange}
              address={address}
            />
          </div>
          <InputField
            type="email"
            name="email"
            placeholder="Email Address"
            handleChange={handleChange}
            address={address}
          />
          <InputField
            type="text"
            name="street"
            placeholder="Street"
            handleChange={handleChange}
            address={address}
          />
          <div className="flex items-center gap-2">
            <InputField
              type="text"
              name="city"
              placeholder="City"
              handleChange={handleChange}
              address={address}
            />
            <InputField
              type="text"
              name="state"
              placeholder="State"
              handleChange={handleChange}
              address={address}
            />
          </div>
          <div className="flex items-center gap-2">
            <InputField
              type="text"
              name="zipcode"
              placeholder="Zip code"
              handleChange={handleChange}
              address={address}
            />
            <InputField
              type="text"
              name="country"
              placeholder="Country"
              handleChange={handleChange}
              address={address}
            />
          </div>
          <InputField
            type="text"
            name="phone"
            placeholder="Phone"
            handleChange={handleChange}
            address={address}
          />
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={fetchLocation}
              className="uppercase bg-zinc-500 mt-3 rounded py-3 transition cursor-pointer text-white w-full"
            >
              Use Current Location
            </button>
            <button className="uppercase bg-[#4FBF8B] mt-3 rounded hover:bg-[#47af7f] py-3 transition cursor-pointer text-white w-full">
              Save Address
            </button>
          </div>
        </form>
        <div className="w-full flex items-center">
          <Image
            src={assets.add_address_iamge}
            alt="address_iamge"
            height={400}
            width={400}
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Address;
