"use client";

import React from "react";
import { CreateProductForm } from "@/components/CreateProductForm";

export default function CreateProductPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Criar Novo Produto
      </h1>
      <CreateProductForm />
    </div>
  );
}
