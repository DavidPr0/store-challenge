import { Product } from "@/types/product";
import api from "../config/axios";

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get(`/products`);
  return response.data;
};

export const getProductById = async (id: number): Promise<Product> => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const createProduct = async (product: Product): Promise<Product> => {
  const response = await api.post(`/products`, product);
  return response.data;
};

export const updateProduct = async (
  id: number,
  product: Product
): Promise<Product> => {
  const response = await api.put(`/products/${id}`, product);
  return response.data;
};

export const deleteProduct = async (id?: number): Promise<void> => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};

export async function getCategories(): Promise<string[]> {
  const response = await api.get<string[]>("/products/categories");
  return response.data;
}
