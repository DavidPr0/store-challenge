import React, { JSX } from "react";
import Link from "next/link";
import { Product } from "@/types/product";

/**
 * Componente que exibe um cartão de produto.
 *
 * @component
 * @example
 * const product = {
 *   id: 1,
 *   title: "Título do Produto",
 *   price: 29.99,
 *   description: "Descrição do produto",
 *   category: "electronics",
 *   image: "/img.jpg",
 *   rating: { rate: 4.7, count: 120 },
 * };
 * return <ProductCard product={product} />;
 *
 * @param {Object} props - Propriedades do componente.
 * @param {Product} props.product - Objeto que representa o produto.
 * @returns {JSX.Element} O cartão do produto.
 */
export default function ProductCard({
  product,
}: {
  product: Product;
}): JSX.Element {
  const truncatedTitle =
    product.title.length > 30
      ? product.title.slice(0, 30) + "..."
      : product.title;

  const isHighlighted = product.rating?.rate && product.rating.rate > 4.5;

  return (
    <Link href={`/products/${product.id}`}>
      <div
        className={`bg-white shadow-md hover:shadow-lg transition-all rounded-lg p-4 border ${
          isHighlighted ? "bg-yellow-100 border-yellow-400" : "border-gray-200"
        }`}
      >
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-40 object-contain mb-4"
        />
        <h2 className="text-lg font-bold mb-1 truncate" title={product.title}>
          {truncatedTitle}
        </h2>
        <p className="text-sm text-gray-500 mb-2">{product.category}</p>
        <p className="text-md font-semibold">${product.price.toFixed(2)}</p>
      </div>
    </Link>
  );
}
