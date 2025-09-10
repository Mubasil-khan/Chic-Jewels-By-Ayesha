"use client";
import { useParams } from "next/navigation";
import React from "react";

const Categories = () => {
  const params = useParams();

  const categories = decodeURIComponent(params.categories);
  return (
    <div>
      <h1>{categories}</h1>
    </div>
  );
};

export default Categories;
