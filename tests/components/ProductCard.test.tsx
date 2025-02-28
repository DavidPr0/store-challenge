import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/product";

describe("ProductCard", () => {
  it("deve exibir título truncado se for maior que 30 caracteres", () => {
    const product: Product = {
      id: 1,
      title: "Título muito grande que ultrapassa trinta caracteres",
      price: 10,
      description: "Desc",
      category: "Test",
      image: "img.jpg",
      rating: { rate: 4.5, count: 10 },
    };

    render(<ProductCard product={product} />);

    const titleRegex = /Título muito grande que ultrap\.\.\./i;
    const titleElement = screen.getByText(titleRegex);
    expect(titleElement).toBeInTheDocument();
  });

  it("deve aplicar destaque se rating > 4.5", () => {
    const product: Product = {
      id: 2,
      title: "Produto com rating alto",
      price: 20,
      description: "Desc 2",
      category: "Test",
      image: "img2.jpg",
      rating: { rate: 4.6, count: 5 },
    };

    render(<ProductCard product={product} />);

    const linkEl = screen.getByText(/Produto com rating alto/i).closest("a");
    expect(linkEl).toBeInTheDocument();

    const cardDiv = linkEl?.querySelector("div");
    expect(cardDiv).toHaveClass("bg-yellow-100");
  });

  it("não deve aplicar destaque se rating <= 4.5", () => {
    const product: Product = {
      id: 3,
      title: "Produto sem destaque",
      price: 30,
      description: "Desc 3",
      category: "Test",
      image: "img3.jpg",
      rating: { rate: 4.5, count: 2 },
    };

    const { container } = render(<ProductCard product={product} />);

    const linkEl = screen.getByText(/Produto sem destaque/i).closest("a");
    expect(linkEl).toBeInTheDocument();

    const cardDiv = linkEl?.querySelector("div");

    expect(cardDiv).not.toHaveClass("bg-yellow-100");
    expect(cardDiv).not.toHaveClass("border-yellow-400");
  });
});
