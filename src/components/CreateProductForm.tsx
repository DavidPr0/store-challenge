"use client";

import React from "react";
import { useForm } from "react-hook-form";
import {
  productCreateSchema,
  ProductCreateSchemaType,
} from "@/validations/productValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { createProduct } from "@/services/productService";
import { useRouter } from "next/navigation";
import { Product } from "@/types/product";
import { Input } from "./Input";
import { Select } from "./Select";
import { Textarea } from "./Textarea";
import { useProducts } from "@/hooks/useProducts";

export function CreateProductForm() {
  const router = useRouter();
  const { categories } = useProducts();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProductCreateSchemaType>({
    resolver: yupResolver(productCreateSchema),
  });

  const onSubmit = async (data: ProductCreateSchemaType) => {
    try {
      const newProduct: Product = await createProduct({
        title: data.title,
        price: data.price,
        description: data.description,
        category: data.category,
        image: data.image,
        rating: {
          rate: 0,
          count: 0,
        },
      });

      alert("Produto criado com sucesso (Fake Store)!");
      console.log("Produto criado:", newProduct);

      reset();
      router.push("/products");
    } catch (error) {
      console.error("Erro ao criar produto:", error);
      alert("Falha ao criar produto.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md flex flex-col">
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

      <Select
        label="Categoria"
        error={errors.category?.message}
        options={[
          { value: "", label: "Selecione uma categoria" },
          ...categories.map((cat) => ({ value: cat, label: cat })),
        ]}
        {...register("category")}
      />

      <Input
        label="URL da Imagem"
        placeholder="https://"
        error={errors.image?.message}
        {...register("image")}
      />

      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 rounded disabled:bg-gray-400 mt-4"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Enviando..." : "Criar Produto"}
      </button>
    </form>
  );
}
