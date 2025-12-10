'use client'
import Image from "next/image";
import Banner from "./components/HomePage/Banner";
import Categories from "./components/HomePage/Categories";
import BestSellers from "./components/HomePage/BestSellers";
import CenterBanner from "./components/HomePage/CenterBanner";
import NewsLetter from "./components/HomePage/NewsLetter";
import Footer from "./components/HomePage/Footer";
import { useAppContext } from "./context/AppContext";

export default function Home() {
  const { product } = useAppContext()
  return (
    <div>
      <Banner />
      <Categories />
      <BestSellers product={product[0]} />
      <CenterBanner />
      {/* <NewsLetter /> */}

    </div>
  );
}
