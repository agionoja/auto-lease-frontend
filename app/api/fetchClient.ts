import * as process from "node:process";

const baseUrlOnline = "https://auto-lease.onrender.com/api/v1"; // Replace with your base URL
const baseUrlLocal = "http://localhost:3000/api/v1";

const url = ({ localUrl = false }: { localUrl?: boolean }) =>
  process.env.NODE_ENV === "production"
    ? baseUrlOnline
    : localUrl
      ? baseUrlLocal
      : baseUrlOnline;

export type FetchResult<T> = {
  statusText: "success" | "fail" | "error" | "networkError";
  status: number;
  data?: T;
  token?: string;
  message?: string;
  ok: boolean;
};

type FetchOptions = {
  method?: "POST" | "GET" | "PUT" | "PATCH" | "DELETE";
  headers?: Record<string, string>;
  body?: string;
};

async function fetchClient<T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<FetchResult<T>> {
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const config: RequestInit = {
    ...options,
    headers,
  };

  try {
    const res = await fetch(`${url({ localUrl: true })}${endpoint}`, config);

    const json = await res.json();

    return {
      statusText: json.statusText,
      data: json.data,
      token: json.token,
      message: json.message,
      status: res.status,
      ok: res.ok,
    };
  } catch (error) {
    console.log((error as Error).message);
    return {
      statusText: "networkError",
      status: 500,
      message: "Network error occurred. Please try again later.",
      ok: false,
    };
  }
}

export default fetchClient;
