import { env } from "@/env";
import ky from "ky";

export type Response<TData = unknown, TError = unknown> =
  | [TError, null]
  | [null, TData];

export function isError<T>(
  value: [unknown, T] | [T, unknown],
): value is [T, null] {
  return value[0] !== null;
}

export function isSuccess<T>(
  value: [unknown, T] | [T, unknown],
): value is [null, T] {
  return value[0] === null;
}

export type ApiError = {
  error: string;
};

export const apiAuth = ky.create({
  prefixUrl: env.VITE_API_AUTH_URL,
  throwHttpErrors: false,
  hooks: {
    beforeRequest: [
      (request) => {
        request.headers.set("Content-Type", "application/json");
      },
    ],
  },
});
