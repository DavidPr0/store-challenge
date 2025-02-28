"use client";

import React from "react";
import { useProducts } from "@/hooks/useProducts";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

export default function ProductsPage() {
  const {
    products,
    categories,
    loading,
    error,
    currentPage,
    totalPages,
    category,
    sortByPrice,
    handleCategoryChange,
    handleSortChange,
    handlePageChange,
  } = useProducts();

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Listagem de Produtos</h1>
      <div className="mb-4">
        <Link
          href="/products/create"
          className="inline-block bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Criar Novo Produto
        </Link>
      </div>
      <div className="flex gap-4 mb-4">
        <select
          value={category}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="border p-2"
        >
          <option value="all">Todas as Categorias</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={sortByPrice}
          onChange={(e) =>
            handleSortChange(e.target.value as "asc" | "desc" | "")
          }
          className="border p-2"
        >
          <option value="">Ordenar por preço</option>
          <option value="asc">Menor para Maior</option>
          <option value="desc">Maior para Menor</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="flex gap-2 mt-4">
        {Array.from({ length: totalPages }).map((_, idx) => {
          const pageNumber = idx + 1;
          return (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`border px-3 py-1 ${
                pageNumber === currentPage ? "bg-blue-500 text-white" : ""
              }`}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
    </div>
  );
}
