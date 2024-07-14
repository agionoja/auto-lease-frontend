const baseUrl = "https://auto-lease.onrender.com/api/v1"; // Replace with your base URL

export type FetchResult<T> = {
  statusText: "success" | "fail" | "error" | "networkError";
  status: number;
  data?: T;
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
    const res = await fetch(`${baseUrl}${endpoint}`, config);

    const json = await res.json();

    return {
      statusText: json.statusText,
      data: json.data,
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
