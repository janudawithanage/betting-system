/**
 * Centralised HTTP client.
 *
 * This thin wrapper around the native Fetch API provides:
 *   - A consistent base URL sourced from `constants.ts`
 *   - Default JSON headers
 *   - Unified error handling
 *
 * When the backend is ready, all service modules import this client and make
 * their real API calls here.  No page component should ever call fetch() directly.
 *
 * Usage example:
 *   const matches = await apiClient.get<Match[]>('/matches/live');
 */

import { API_BASE_URL, API_TIMEOUT_MS } from "@/config/constants";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T;
  ok: boolean;
  status: number;
}

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// ─── Internal helpers ────────────────────────────────────────────────────────

async function request<T>(
  method: string,
  path: string,
  body?: unknown,
): Promise<ApiResponse<T>> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), API_TIMEOUT_MS);

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    signal: controller.signal,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  }).finally(() => clearTimeout(timer));

  if (!response.ok) {
    throw new ApiError(
      response.status,
      `HTTP ${response.status}: ${response.statusText}`,
    );
  }

  const data: T = await response.json();
  return { data, ok: response.ok, status: response.status };
}

// ─── Public API ──────────────────────────────────────────────────────────────

export const apiClient = {
  get: <T>(path: string) => request<T>("GET", path),
  post: <T>(path: string, body: unknown) => request<T>("POST", path, body),
  put: <T>(path: string, body: unknown) => request<T>("PUT", path, body),
  patch: <T>(path: string, body: unknown) => request<T>("PATCH", path, body),
  delete: <T>(path: string) => request<T>("DELETE", path),
};
