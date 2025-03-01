"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useProductDetail } from "@/hooks/useProductDetail";
import { EditProductForm } from "@/components/EditProductForm";
import { deleteProduct } from "@/services/productService";
import { ConfirmModal } from "@/components/ConfirmModal";
import toast from "react-hot-toast";

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const { product, loading, error } = useProductDetail(Number(params.id));
  const [showConfirm, setShowConfirm] = useState(false);

  if (loading)
    return <div className="p-4 text-center">Carregando produto...</div>;
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;
  if (!product)
    return <div className="p-4 text-center">Produto não encontrado.</div>;

  const handleDelete = async () => {
    try {
      await deleteProduct(product.id);
      toast.success("Produto excluído (FakeStore).");
      router.push("/products");
    } catch (err) {
      console.error(err);
      toast.error("Erro ao excluir produto.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto p-4">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <button
            onClick={() => router.back()}
            className="text-blue-500 hover:underline mb-4 sm:mb-0"
          >
            ← Voltar
          </button>
          <button
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
            onClick={() => setShowConfirm(true)}
          >
            Excluir
          </button>
        </div>
        <h1 className="text-3xl font-bold text-center mb-8">
          Editar Produto #{product.id}
        </h1>
        <EditProductForm product={product} />
      </div>

      {showConfirm && (
        <ConfirmModal
          message="Você tem certeza que deseja excluir este produto?"
          onConfirm={() => {
            setShowConfirm(false);
            handleDelete();
          }}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}
