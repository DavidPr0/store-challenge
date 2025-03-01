import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import ProductCard from "./ProductCard";
import { Product } from "@/types/product";

const meta: Meta<typeof ProductCard> = {
  title: "Components/ProductCard",
  component: ProductCard,
  parameters: {
    docs: {
      // Aqui você pode adicionar descrições ou notas para os docs
      description: {
        component:
          "O componente ProductCard exibe os detalhes de um produto e trunca o título se exceder 30 caracteres. Destaca visualmente produtos com rating > 4.5.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProductCard>;

const fakeProduct: Product = {
  id: 1,
  title: "Exemplo de Produto com um nome que será truncado",
  price: 29.99,
  description: "Descrição detalhada do produto.",
  category: "electronics",
  image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  rating: { rate: 4.7, count: 100 },
};

export const Default: Story = {
  args: {
    product: fakeProduct,
  },
};
