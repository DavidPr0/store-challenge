"use client";

import { useEffect, useState } from "react";
import { getProductById } from "@/services/productService";
import { Product } from "@/types/product";

export function useProductDetail(productId: number) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!productId) {
      setLoading(false);
      return;
    }

    async function fetchData() {
      setLoading(true);
      setError("");

      try {
        const data = await getProductById(productId);
        setProduct(data);
      } catch (err: any) {
        setError("Erro ao obter produto");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [productId]);

  return { product, loading, error };
}
