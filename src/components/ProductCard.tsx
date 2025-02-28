import React from "react";
import Link from "next/link";

import { Product } from "@/types/product";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const truncatedTitle =
    product.title.length > 30
      ? product.title.slice(0, 30) + "..."
      : product.title;

  const isHighlighted = product.rating?.rate && product.rating.rate > 4.5;

  return (
    <Link href={`/products/${product.id}`}>
      <div
        className={`border p-4 rounded ${
          isHighlighted ? "bg-yellow-100 border-yellow-400" : ""
        }`}
      >
        <img
          src={product.image}
          alt={product.title}
          className="h-40 mx-auto object-contain"
        />
        <h2 className="font-bold mt-2">{truncatedTitle}</h2>
        <p className="text-sm text-gray-600">{product.category}</p>
        <p className="font-semibold">${product.price}</p>
      </div>
    </Link>
  );
}
