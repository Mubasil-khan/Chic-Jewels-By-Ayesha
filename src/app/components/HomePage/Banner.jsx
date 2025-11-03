import React from "react";
import Image from "next/image";
import Link from "next/link";

const Banner = () => {
  return (
    <div className="relative w-full mt-10  md:h-[400px] container mx-auto mb-4 block">
      <Image
        src="/main_banner_bg.png"
        alt="Banner"
        fill
        className="object-cover rounded-xl hidden md:block"
        priority
      />
      <Image
        src="/main_banner_bg_sm.png"
        alt="Banner"
        fill
        className="object-cover rounded-xl md:hidden"
        priority
      />
      <div className="absolute  md:top-[20%] md:left-[6%] flex flex-col bottom-[20%] md:text-start md:justify-start  text-center w-full md:w-fit justify-center items-center md:items-start gap-6">
        <h4 className="text-3xl md:text-4xl lg:text-5xl  font-bold text-zinc-600 ">
          Freshness You Can <br />
          Trust, Savings You <br /> will Love!
        </h4>
        <div className="flex gap-8 items-center">
          <Link
            href="/allproduct"
            className="bg-[#44AE7C] px-8 py-1.5 rounded-md text-white"
          >
            Shop Now
          </Link>
          <Link href="" className="hidden md:block">
            Explore Deals
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
