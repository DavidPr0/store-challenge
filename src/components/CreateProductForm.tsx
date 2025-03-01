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
import toast from "react-hot-toast";

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

      toast.success("Produto criado com sucesso (Fake Store)!");
      console.log("Produto criado:", newProduct);

      reset();
      router.push("/products");
    } catch (error) {
      console.error("Erro ao criar produto:", error);
      toast.error("Falha ao criar produto.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors duration-200 mt-4"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Enviando..." : "Criar Produto"}
        </button>
      </form>
    </div>
  );
}
