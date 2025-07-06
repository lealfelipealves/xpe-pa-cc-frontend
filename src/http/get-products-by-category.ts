import { type ApiError, type Response } from "@/http/api-auth";
import { HTTPError } from "ky";
import { api } from ".";

export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
}

export type ProductsResponse = {
  products: Product[]
}

export async function getProductsByCategory(category: string): Promise<Response<ProductsResponse, ApiError>> {
  try {
    const response_backend = await api.get(`products/${category}`);

    const dataBackend = await response_backend.json<ProductsResponse>();
    return [null, dataBackend];
  } catch (error) {
    if (error instanceof HTTPError && error.response.status === 400) {
      const errorData = await error.response.json();
      return [errorData, null];
    }

    throw error;
  }
}
