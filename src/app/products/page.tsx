"use client";

import React from "react";
import { useProducts } from "@/hooks/useProducts";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
// Se você tiver o componente Button do Shadcn, pode importá-lo, caso contrário use classes do Tailwind.
import { Button } from "@/components/Button"; // Ajuste conforme sua estrutura

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
    return <div className="p-6 text-center">Carregando produtos...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Produtos</h1>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        {/* Select para Categoria */}
        <div className="relative">
          <select
            value={category}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="block w-full appearance-none border border-gray-300 rounded-md bg-white py-2 px-3 pr-10 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="all">Todas as Categorias</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
              <path d="M7 10l5 5 5-5H7z" />
            </svg>
          </div>
        </div>

        {/* Select para Ordenação */}
        <div className="relative">
          <select
            value={sortByPrice}
            onChange={(e) =>
              handleSortChange(e.target.value as "asc" | "desc" | "")
            }
            className="block w-full appearance-none border border-gray-300 rounded-md bg-white py-2 px-3 pr-10 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">Ordenar por preço</option>
            <option value="asc">Menor para Maior</option>
            <option value="desc">Maior para Menor</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
              <path d="M7 10l5 5 5-5H7z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Grid de Produtos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Paginação */}
      <div className="flex justify-center mt-8 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
          (pageNumber) => (
            <Button
              key={pageNumber}
              variant={pageNumber === currentPage ? "default" : "outline"}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </Button>
          )
        )}
      </div>
    </div>
  );
}
