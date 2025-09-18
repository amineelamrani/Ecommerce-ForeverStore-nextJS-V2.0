import React from "react";

export default function RelatedProductsSection({
  category,
  subCategory,
}: {
  category: string;
  subCategory: string;
}) {
  return (
    <div>
      <h1>RelatedProductsSection</h1>
      <p>Category: {category}</p>
      <p>SubCategory: {subCategory}</p>
    </div>
  );
}
