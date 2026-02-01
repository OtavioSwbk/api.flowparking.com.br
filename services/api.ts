export const API_BASE_URL =
  (import.meta as any).env?.VITE_API_URL || "";

export async function apiGet(path: string) {
  const res = await fetch(`${API_BASE_URL}${path}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
