import { type ApiError, type Response, apiAuth } from "@/http/api-auth";
import { HTTPError } from "ky";

export type AuthRequest = {
  cpf: string;
};

export type AuthResponse = {
  AccessToken: string
  ExpiresIn: number
  IdToken: string
  RefreshToken: string
  TokenType: string
}

export async function auth(
  json: AuthRequest,
): Promise<Response<AuthResponse, ApiError>> {
  try {
    const response = await apiAuth.post(`auth`, { json });

    if (!response.ok) {
      const errorText = await response.json<ApiError>();
      return [errorText, null];
    }

    const data = await response.json<AuthResponse>();
    return [null, data];
  } catch (error) {
    if (error instanceof HTTPError && error.response.status === 400) {
      const errorData = await error.response.json();
      return [errorData, null];
    }

    throw error;
  }
}
