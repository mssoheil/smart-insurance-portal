// Utilities
import axios from "axios";
// Types
import type { AxiosInstance } from "axios";

interface Config {
  suffix?: string;
  baseURL?: string;
  hasApiPrefix?: boolean;
}

const TIMEOUT = 60 * 1000;

export abstract class HttpService {
  protected httpService: AxiosInstance;

  protected constructor({
    suffix,
    hasApiPrefix = true,
    baseURL = import.meta.env.VITE_BASE_URL,
  }: Config) {
    this.httpService = axios.create({
      baseURL: `${baseURL}${hasApiPrefix ? "/api" : ""}${
        suffix ? `/${suffix}` : ""
      }`,
      timeout: TIMEOUT,
      validateStatus(status) {
        return status >= 200 && status < 300;
      },
    });
  }
}
