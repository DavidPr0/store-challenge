"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useProductDetail } from "@/hooks/useProductDetail";
import Link from "next/link";
import { deleteProduct } from "@/services/productService";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();

  const { product, loading, error } = useProductDetail(Number(params.id));

  if (loading) return <div className="p-4">Carregando...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!product) return <div className="p-4">Produto não encontrado.</div>;

  const truncatedTitle =
    product.title.length > 30
      ? product.title.slice(0, 30) + "..."
      : product.title;

  const isHighlighted = product.rating?.rate && product.rating.rate > 4.5;

  async function handleDelete() {
    const confirmed = window.confirm(
      "Tem certeza que deseja excluir o produto?"
    );
    if (!confirmed) return;

    try {
      await deleteProduct(product?.id);
      alert("Produto excluído com sucesso (Fake Store API)!");
      router.push("/products");
    } catch (err) {
      console.error("Erro ao excluir produto:", err);
      alert("Falha ao excluir produto.");
    }
  }

  return (
    <div className="p-4">
      <button
        onClick={() => router.back()}
        className="underline text-blue-500 mb-4"
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
            Avaliação: <strong>{product.rating.rate}</strong>{" "}
            <span>({product.rating.count} reviews)</span>
          </div>
        )}
      </div>

      <div className="flex gap-2 mt-4">
        <Link
          href={`/products/${product.id}/edit`}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Editar
        </Link>

        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Excluir
        </button>
      </div>
    </div>
  );
}
