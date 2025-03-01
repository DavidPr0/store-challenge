"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  productUpdateSchema,
  ProductUpdateSchemaType,
} from "@/validations/productValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { Product } from "@/types/product";
import { updateProduct } from "@/services/productService";
import { useRouter } from "next/navigation";
import { Input } from "./Input";
import { Textarea } from "./Textarea";
import toast from "react-hot-toast";

interface EditProductFormProps {
  product: Product;
}

export function EditProductForm({ product }: EditProductFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProductUpdateSchemaType>({
    resolver: yupResolver(productUpdateSchema),
    defaultValues: {
      title: product.title,
      price: product.price,
      description: product.description,
      image: product.image,
    },
  });

  useEffect(() => {
    reset({
      title: product.title,
      price: product.price,
      description: product.description,
      image: product.image,
    });
  }, [product, reset]);

  async function onSubmit(data: ProductUpdateSchemaType) {
    try {
      // Na edição, a categoria não pode ser alterada; mantenha a original
      const updated = await updateProduct(product.id, {
        title: data.title,
        price: data.price,
        description: data.description,
        image: data.image,
        category: product.category,
        rating: product.rating, // Preserva o rating atual
      });
      toast.success("Produto atualizado (Fake Store)!");
      console.log("updated =>", updated);
      router.push(`/products/${product.id}`);
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      toast.error("Falha ao atualizar produto.");
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Exibir a categoria (não editável) */}
        <div>
          <label className="block font-medium mb-1">
            Categoria (não editável)
          </label>
          <input
            type="text"
            disabled
            value={product.category}
            className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-200 text-gray-600 cursor-not-allowed"
          />
        </div>

        <Input
          label="Nome do Produto"
          placeholder="Ex: Camiseta"
          error={errors.title?.message}
          {...register("title")}
        />

        <Input
          label="Preço"
          type="number"
          step="0.01"
          placeholder="Ex: 29.90"
          error={errors.price?.message}
          {...register("price")}
        />

        <Textarea
          label="Descrição"
          rows={4}
          placeholder="Descreva o produto..."
          error={errors.description?.message}
          {...register("description")}
        />

        <Input
          label="URL da Imagem"
          placeholder="https://"
          error={errors.image?.message}
          {...register("image")}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors duration-200 mt-4"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Enviando..." : "Salvar Alterações"}
        </button>
      </form>
    </div>
  );
}
