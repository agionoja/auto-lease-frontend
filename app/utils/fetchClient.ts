const baseUrl = "https://auto-lease.onrender.com/api/v1"; // Replace with your base URL

type Response<T> =
  | { statusText: "success"; status: number; data?: T; message?: string }
  | { statusText: "fail"; status: number; message: string }
  | { statusText: "error"; status: number; message: string }
  | { statusText: "networkError"; status: number; message: string };

type FetchOptions = {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
};

async function fetchClient<T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<Response<T>> {
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

    if (res.ok) {
      return {
        statusText: json.statusText,
        data: json.data,
        message: json.message,
        status: res.status,
      };
    }

    if (`${res.status}`.startsWith("4")) {
      return {
        statusText: "fail",
        status: res.status,
        message: json.message,
      };
    }

    return {
      statusText: "error",
      status: res.status,
      message: json.message,
    };
  } catch (error) {
    console.error("Fetch error:", error);
    return {
      statusText: "networkError",
      status: 500,
      message: (error as Error).message,
    };
  }
}

export default fetchClient;
