import { cookies } from "next/headers";

const API_URL = process.env.API_URL ?? "https://ting-be.onrender.com";

export async function backendFetch(path: string, options: RequestInit = {}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  return fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    cache: "no-store",
  });
}

export { API_URL };
