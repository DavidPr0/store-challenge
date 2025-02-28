import {
  getProducts,
  getProductById,
  createProduct,
} from "@/services/productService";
import api from "@/config/axios";
import { Product } from "@/types/product";

jest.mock("@/config/axios");

describe("productService", () => {
  const mockedApi = api as jest.Mocked<typeof api>;

  it("deve buscar a lista de produtos", async () => {
    const mockData: Product[] = [
      {
        id: 1,
        title: "Produto 1",
        price: 10,
        description: "Desc",
        category: "electronics",
        image: "img.jpg",
        rating: { rate: 4.5, count: 10 },
      },
    ];

    mockedApi.get.mockResolvedValueOnce({ data: mockData });

    const result = await getProducts();
    expect(result).toEqual(mockData);
    expect(mockedApi.get).toHaveBeenCalledWith("/products");
  });

  it("deve buscar um produto por ID", async () => {
    const mockProduct: Product = {
      id: 2,
      title: "Produto 2",
      price: 20,
      description: "Desc 2",
      category: "jewelery",
      image: "img2.jpg",
      rating: { rate: 4, count: 5 },
    };

    mockedApi.get.mockResolvedValueOnce({ data: mockProduct });

    const result = await getProductById(2);
    expect(result).toEqual(mockProduct);
    expect(mockedApi.get).toHaveBeenCalledWith("/products/2");
  });

  it("deve criar um produto", async () => {
    const newProduct = {
      title: "Novo Produto",
      price: 15,
      description: "Nova desc",
      category: "women's clothing",
      image: "img3.jpg",
      rating: { rate: 4.5, count: 10 },
    };

    const mockResponse: Product = {
      id: 101,
      ...newProduct,
      rating: { rate: 5, count: 1 },
    };

    mockedApi.post.mockResolvedValueOnce({ data: mockResponse });

    const result = await createProduct(newProduct);
    expect(result).toEqual(mockResponse);
    expect(mockedApi.post).toHaveBeenCalledWith("/products", newProduct);
  });
});
