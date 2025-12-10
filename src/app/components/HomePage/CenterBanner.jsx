import React from "react";
import Image from "next/image";
import { features } from "../../../../public/assets";

const CenterBanner = () => {
  return (
    <div className="container mx-auto p-4 md:p-0 my-10 block">
      {/* Desktop */}
      <div className="relative hidden md:block h-100 w-full">
        <Image
          src="/CenterBanner.png"
          fill
          alt="Banner"
          className="w-full h-full object-cover rounded-lg"
        />
        <div className="absolute inset-0 flex items-center justify-end right-10">
          <div className="text-center md:text-left max-w-lg">
            <h2 className="text-2xl text-[#705436] font-bold !mb-4">
              Why We Are the Best?
            </h2>
            <div className="flex flex-col gap-3 items-center md:items-start">
              {features.map((data, index) => (
                <div key={index} className="flex gap-3 items-center">
                  <div className="p-2 rounded bg-[#705436] shadow-sm text-[#F2DED5]">
                    {data.icon}
                  </div>

                  <div className="flex flex-col justify-center">
                    <h6 className="text-lg text-zinc-600 font-semibold">
                      {data.title}
                    </h6>
                    <p className="text-sm text-zinc-400">{data.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="relative md:hidden h-220 w-full">
        <Image
          src="/mocenterbanner.png"
          fill
          alt="Banner"
          className="w-full object-cover rounded-lg"
        />
        <div className="absolute inset-0 flex items-start justify-center my-5 p-5">
          <div className=" max-w-sm">
            <h2 className="text-2xl text-[#705436] font-bold mb-4">
              Why We Are the Best?
            </h2>
            <div className="flex flex-col gap-4 ">
              {features.map((data, index) => (
                <div key={index} className="flex gap-3 items-center">
                  <div className="p-2 rounded bg-[#705436] shadow-sm text-[#F2DED5]">
                    {data.icon}
                  </div>
                  <div className="flex flex-col justify-center">
                    <h6 className="text-lg text-zinc-600 font-semibold">
                      {data.title}
                    </h6>
                    <p className="text-sm text-zinc-400">{data.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CenterBanner;
