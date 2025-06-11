// Types
import type { AxiosError } from "axios";
// Utils
import { getServerError } from "./get-server-error";

describe("getServerError", () => {
  const message = "test message";
  it("returns server error message ", () => {
    const error = {
      response: {
        data: {
          error: "server error",
        },
      },
    } as AxiosError<{ error: string }>;

    const result = getServerError(error, message);
    expect(result).toBe("server error");
  });

  it("returns Axios error.message when server error is not exists", () => {
    const error = {
      message: "error 400",
      response: {
        data: {},
      },
    } as AxiosError<{ error: string }>;

    const result = getServerError(error, message);
    expect(result).toBe("error 400");
  });

  it("returns message when no error is available", () => {
    const error = {} as AxiosError;

    const result = getServerError(error, message);
    expect(result).toBe("test message");
  });
});
