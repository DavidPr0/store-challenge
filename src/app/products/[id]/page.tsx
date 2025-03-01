"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { deleteProduct, getProductById } from "@/services/productService";
import { Product } from "@/types/product";
import { Button } from "@/components/Button";
import { ConfirmModal } from "@/components/ConfirmModal";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const data = await getProductById(Number(params.id));
        setProduct(data);
      } catch (err) {
        setError("Erro ao carregar produto.");
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [params.id]);

  if (loading) {
    return <div className="p-6 text-center">Carregando produto...</div>;
  }
  if (error || !product) {
    return (
      <div className="p-6 text-center text-red-500">
        {error || "Produto não encontrado."}
      </div>
    );
  }

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
    <div className="container mx-auto p-6">
      <button
        onClick={() => router.back()}
        className="mb-4 text-blue-500 hover:underline"
      >
        ← Voltar
      </button>
      {/* Box com sombra, borda arredondada e padding */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Imagem do produto */}
          <div className="md:w-1/3">
            <img
              src={product.image}
              alt={product.title}
              className="w-full object-contain rounded-lg"
            />
          </div>
          {/* Detalhes do produto */}
          <div className="md:w-2/3">
            <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
            <p className="text-lg text-gray-700 mb-4">{product.description}</p>
            <p className="text-xl font-semibold mb-2">
              Preço: ${product.price.toFixed(2)}
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Categoria: {product.category}
            </p>
            <div className="flex gap-4">
              <Button
                variant="default"
                onClick={() => router.push(`/products/${product.id}/edit`)}
              >
                Editar
              </Button>
              <Button
                variant="destructive"
                onClick={() => setShowConfirm(true)}
              >
                Excluir
              </Button>
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
          </div>
        </div>
      </div>
    </div>
  );
}
