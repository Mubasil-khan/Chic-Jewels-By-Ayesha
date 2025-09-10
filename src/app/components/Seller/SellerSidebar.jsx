import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SellerSidebar = () => {
  const pathName = usePathname();
  return (
    <div className="flex flex-col h-screen ">
      <div className="md:w-64 w-20 border-r h-screen  flex-1 text-base border-gray-300 pt-4 flex flex-col bg-white">
        <Link
          href="/seller/add-product"
          className={`flex items-center py-3 px-4 gap-3 hover:bg-gray-100 ${
            pathName === "/seller/add-product" &&
            "bg-[#EDF8F3]  border-r-6 border-[#4FBF8B] "
          }`}
        >
          <Image src="/add_icon.svg" height={30} width={30} alt="Add" />
          <p className="md:block hidden">Add Products</p>
        </Link>

        <Link
          href="/seller/product-list"
          className={`flex items-center py-3 px-4 gap-3 hover:bg-gray-100 ${
            pathName === "/seller/product-list" &&
            "bg-[#EDF8F3]  border-r-6 border-[#4FBF8B] "
          }`}
        >
          <Image
            src="/product_list_icon.svg"
            height={30}
            width={30}
            alt="List"
          />
          <p className="md:block hidden">Product List</p>
        </Link>

        <Link
          href="/seller/orders"
          className={`flex items-center py-3 px-4 gap-3 hover:bg-gray-100 ${
            pathName === "/seller/orders" &&
            "bg-[#EDF8F3]  border-r-6 border-[#4FBF8B] "
          }`}
        >
          <Image src="/order_icon.svg" height={30} width={30} alt="Orders" />
          <p className="md:block hidden">Orders</p>
        </Link>
      </div>
    </div>
  );
};

export default SellerSidebar;
