import React from "react";
import Image from "next/image";

const CenterBanner = () => {
  return (
    <div className="relative container mx-auto h-100 w-full">
      <Image
        src="/bottom_banner_image.png"
        fill
        alt="Banner"
        className="w-full object-contain hidden md:block"
      />
      <Image
        src="/bottom_banner_image_sm.png"
        fill
        alt="Banner"
        className="w-full object-contain md:hidden"
      />
    </div>
  );
};

export default CenterBanner;
