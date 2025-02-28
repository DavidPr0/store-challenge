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
      const updated = await updateProduct(product.id!, {
        title: data.title,
        price: data.price,
        description: data.description,
        image: data.image,
        category: "",
        rating: {
          rate: 0,
          count: 0,
        },
      });
      alert("Produto atualizado (Fake Store)!");
      console.log("updated =>", updated);
      router.push(`/products/${product.id}`);
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      alert("Falha ao atualizar produto.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md flex flex-col">
      <div className="mb-4">
        <label className="block font-semibold mb-1">
          Categoria (não editável)
        </label>
        <input
          type="text"
          disabled
          className="border w-full p-2 bg-gray-200 text-gray-600"
          value={product.category}
        />
      </div>

      <Input
        label="Nome do Produto"
        error={errors.title?.message}
        {...register("title")}
      />

      <Input
        label="Preço"
        type="number"
        step="0.01"
        error={errors.price?.message}
        {...register("price")}
      />

      <Textarea
        label="Descrição"
        rows={4}
        error={errors.description?.message}
        {...register("description")}
      />

      <Input
        label="URL da Imagem"
        error={errors.image?.message}
        {...register("image")}
      />

      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 rounded disabled:bg-gray-400 mt-4"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Enviando..." : "Salvar Alterações"}
      </button>
    </form>
  );
}
