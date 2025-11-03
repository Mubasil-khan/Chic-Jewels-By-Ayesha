import React from "react";
import { assets, categories } from "../../../../public/assets";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

// import required modules

const Categories = () => {
  const toSlug = (text) => text.toLowerCase().replace(/\s+/g, "-"); // "Fresh Fruits" -> "fresh-fruits"

  return (
    <div className="container mx-auto p-4 sm:p-0 my-8 block">
      <h4 className="text-3xl font-semibold text-zinc-600 flex flex-col gap-2 w-36 items-end my-5">
        Categories
        <div className="border-2 w-18 rounded text-[#4FBF8B]"></div>
      </h4>
      <div className="flex items-center gap-2 justify-between">
        <Swiper
          spaceBetween={20}
          className="mySwiper"
          breakpoints={{
            0: {
              slidesPerView: 2,
            },
            640: {
              slidesPerView: 4,
            },
            1024: {
              slidesPerView: 5,
            },
            1300: {
              slidesPerView: 7,
            },
          }}
        >
          {categories.map((items) => (
            <SwiperSlide>
              <Link href={`/products/${toSlug(items.text)}`}>
                <div
                  className={`flex flex-col gap-1 items-center rounded-md group p-3`}
                  style={{ background: items.bgColor }}
                >
                  <Image
                    src={items.image}
                    height={130}
                    width={130}
                    alt="itemsImage"
                    className="group-hover:scale-110 duration-120 transition"
                  />
                  <h6>{items.text}</h6>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Categories;
