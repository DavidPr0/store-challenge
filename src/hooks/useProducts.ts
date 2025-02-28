"use client";

import { useState, useEffect } from "react";
import { getProducts, getCategories } from "@/services/productService";
import { Product } from "@/types/product";

type SortOrder = "" | "asc" | "desc";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const [category, setCategory] = useState<string>("all");
  const [sortByPrice, setSortByPrice] = useState<SortOrder>("");

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError("");

        const [data, catData] = await Promise.all([
          getProducts(),
          getCategories(),
        ]);

        setProducts(data);
        setCategories(catData);
      } catch (err: any) {
        console.error("Erro ao buscar produtos:", err);
        setError("Erro ao buscar produtos");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filteredProducts = products.filter((prod) => {
    if (category === "all") return true;
    return prod.category === category;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (!sortByPrice) return 0;
    if (sortByPrice === "asc") return a.price - b.price;
    return b.price - a.price;
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = sortedProducts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  function handleCategoryChange(newCategory: string) {
    setCategory(newCategory);
    setCurrentPage(1);
  }

  function handleSortChange(order: SortOrder) {
    setSortByPrice(order);
    setCurrentPage(1);
  }

  function handlePageChange(page: number) {
    setCurrentPage(page);
  }

  return {
    products: paginatedProducts,
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
  };
}
