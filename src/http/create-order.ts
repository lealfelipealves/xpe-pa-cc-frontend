import { type ApiError, type Response } from "@/http/api-auth";
import { HTTPError } from "ky";
import { api } from ".";

export interface Order {
  id: string;
  customerId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export type CreateOrderResponse = {
  order: Order;
};

export async function createOrder(
  customerId: string,
  productIds: string[]
): Promise<Response<CreateOrderResponse, ApiError>> {
  try {
    const response = await api.post("orders", {
      json: {
        customerId,
        productIds,
      },
    });

    const data = await response.json<CreateOrderResponse>();
    return [null, data];
  } catch (error) {
    if (error instanceof HTTPError && error.response.status === 400) {
      const errorData = await error.response.json();
      return [errorData, null];
    }

    throw error;
  }
}
