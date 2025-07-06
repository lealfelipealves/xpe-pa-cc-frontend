import { type ApiError, type Response, apiAuth } from "@/http/api-auth";
import { HTTPError } from "ky";
import { api } from ".";

export interface Customer {
  id?: string
  cpf: string
  name?: string
  email?: string
}

export type CustomerResponse = {
  customer: Customer
}

export interface AuthResponse {
  message: string
  user: string
  isPasswordSet: boolean
}

export type CreateCustomerResponse = {
  dataCongnito: AuthResponse
  dataBackend: CustomerResponse
}

export async function createCustomer(
  json: Customer,
): Promise<Response<CreateCustomerResponse, ApiError>> {
  try {
    const response_congnito = await apiAuth.post(`create`, {
      json: {
        cpf: json.cpf
      }
    });

    if (!response_congnito.ok) {
      const errorText = await response_congnito.json<ApiError>();
      return [errorText, null];
    }

    const response_backend = await api.post(`customers/${json.cpf}`, {
      json: {
        name: `Cliente ${json.cpf}`,
        email: `${json.cpf}@xpe-pa-cc-example.com.br`
      }
    });

    const dataCongnito = await response_congnito.json<AuthResponse>();
    const dataBackend = await response_backend.json<CustomerResponse>();
    return [null, {
      dataCongnito,
      dataBackend
    }];
  } catch (error) {
    if (error instanceof HTTPError && error.response.status === 400) {
      const errorData = await error.response.json();
      return [errorData, null];
    }

    throw error;
  }
}
