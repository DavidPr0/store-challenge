"use client";

import React from "react";
import { CreateProductForm } from "@/components/CreateProductForm";

export default function CreateProductPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Criar Novo Produto</h1>
      <CreateProductForm />
    </div>
  );
}
