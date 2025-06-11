import type { AxiosError } from "axios";

export function getServerError(error: unknown, message: string) {
  const err = error as AxiosError<{ error: string }>;
  const serverError = err.response?.data?.error;

  return serverError || err.message || message;
}
