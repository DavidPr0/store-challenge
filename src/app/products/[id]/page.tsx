"use client";

import React from "react";
import { useRouter, useParams } from "next/navigation";
import { useProductDetail } from "@/hooks/useProductDetail";

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();

  const { product, loading, error } = useProductDetail(Number(params.id));

  if (loading) {
    return <div className="p-4">Carregando...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  if (!product) {
    return <div className="p-4">Produto não encontrado.</div>;
  }

  const truncatedTitle =
    product.title.length > 30
      ? product.title.slice(0, 30) + "..."
      : product.title;

  const isHighlighted = product.rating?.rate && product.rating.rate > 4.5;

  return (
    <div className="p-4">
      {/* Botão para voltar à tela anterior */}
      <button
        onClick={() => router.back()}
        className="mb-4 underline text-blue-500"
      >
        Voltar
      </button>

      <div
        className={`border p-4 rounded ${
          isHighlighted ? "bg-yellow-100 border-yellow-400" : ""
        }`}
      >
        <img
          src={product.image}
          alt={product.title}
          className="w-48 h-48 object-contain mx-auto mb-4"
        />
        <h1 className="text-2xl font-bold">{truncatedTitle}</h1>
        <p className="text-gray-600">{product.category}</p>
        <p className="mt-2">
          Preço: <strong>${product.price}</strong>
        </p>
        <p className="mt-2 text-sm text-gray-500">{product.description}</p>
        {product.rating && (
          <div className="mt-2">
            Avaliação: <strong>{product.rating.rate}</strong>
            <span> ({product.rating.count} reviews)</span>
          </div>
        )}
      </div>
    </div>
  );
}
