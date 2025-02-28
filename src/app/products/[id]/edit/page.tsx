"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useProductDetail } from "@/hooks/useProductDetail";
import { EditProductForm } from "@/components/EditProductForm";
import { deleteProduct } from "@/services/productService";

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();

  const { product, loading, error } = useProductDetail(Number(params.id));

  if (loading) return <div className="p-4">Carregando produto...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!product) return <div className="p-4">Produto não encontrado.</div>;

  return (
    <div className="p-4">
      <button
        onClick={() => router.back()}
        className="underline text-blue-500 mb-4"
      >
        Voltar
      </button>
      <button
        className="bg-red-600 text-white px-4 py-2 rounded"
        onClick={async () => {
          const confirmed = window.confirm(
            "Você tem certeza que deseja excluir?"
          );
          if (!confirmed) return;

          try {
            await deleteProduct(product.id);
            alert("Produto excluído (FakeStore).");
            router.push("/products");
          } catch (err) {
            console.error(err);
            alert("Erro ao excluir produto.");
          }
        }}
      >
        Excluir
      </button>
      <h1 className="text-2xl font-bold mb-4">Editar Produto #{product.id}</h1>
      <EditProductForm product={product} />
    </div>
  );
}
