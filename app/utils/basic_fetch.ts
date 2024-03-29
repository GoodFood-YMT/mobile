import AsyncStorage from "@react-native-async-storage/async-storage";

export async function apiFetch<T>(
  url: string,
  { json, method }: { json?: Record<string, unknown>; method?: string } = {}
): Promise<T> {
  method ??= json ? "POST" : "GET";

  const token = await AsyncStorage.getItem("token");

  const body = json ? JSON.stringify(json) : undefined;
  const response = await fetch(process.env.EXPO_PUBLIC_BACKEND_URL + url, {
    method,
    body,
    headers: {
      Authorization: `Bearer ${token}`,
      accept: "application/json",
      "content-type": "application/json",
    },
  });

  console.log("response", JSON.stringify(response));

  if (response.ok) {
    return response.json() as Promise<T>;
  }

  throw new ApiError(response.status, await response.json());
}

class ApiError extends Error {
  constructor(public status: number, public data: Record<string, unknown>) {
    if (status === 401) {
      localStorage.removeItem("account");
    }

    super(`ApiError: ${status} ${JSON.stringify(data)}`);
  }
}
