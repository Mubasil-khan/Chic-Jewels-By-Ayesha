import React from "react";
import Image from "next/image";
import Link from "next/link";

const Banner = () => {
  return (
    <div className="relative w-full mt-10 md:h-[500px] container mx-auto mb-4 block">
      {/* Desktop Banner Image */}
      <Image
        src="/banner01.png"
        alt="Banner"
        fill
        className="object-cover rounded-xl hidden md:block"
        priority
      />

      {/* Mobile Banner Image */}
      <Image
        src="/main_banner_bg_sm.png"
        alt="Banner"
        fill
        className="object-cover rounded-xl md:hidden"
        priority
      />

      {/* Text Section */}
      <div
        className="absolute md:top-[25%] md:left-[6%] flex flex-col bottom-[20%] 
        md:text-start md:justify-start text-center w-full md:w-fit justify-center 
        items-center md:items-start gap-6"
      >
        <h4 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-snug text-[#1F1F1F]">
          Minimal Jewelry That Never <br /> Loses Its Shine
          <br />
          <p className="text-xl">
            Premium Anti-Tarnish Pieces Made for Everyday Wear
          </p>
        </h4>

        <div className="flex gap-8 items-center">
          <Link
            href="/allproduct"
            className="bg-[#F2DED5] px-8 py-2 rounded-md text-white font-semibold shadow-md hover:opacity-90 transition"
          >
            Shop Now
          </Link>

          <Link
            href=""
            className="hidden md:block text-[#333333] hover:text-white transition"
          >
            Explore Deals
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
