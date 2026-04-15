/**
 * Auth Service
 *
 * Handles all authentication-related API interactions.
 *
 * CURRENT BEHAVIOUR  — simulates an async login with a 600 ms delay and always
 *   succeeds (demo mode).  The result is a mock user object.
 *
 * MIGRATION PATH — replace each function body marked with "TODO: API" with a real
 *   fetch call via `apiClient`.  The Zustand `authStore` calls this service and
 *   does not need to change.
 *
 * Example migration for login:
 *   import { apiClient } from './apiClient';
 *   const { data } = await apiClient.post<{ token: string; user: MockUser }>(
 *     '/auth/login', { email, password }
 *   );
 */

import type { MockUser } from "@/types";
import { mockUser } from "@/data/mockData";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface LoginResult {
  success: boolean;
  user?: MockUser;
  error?: string;
}

export interface RegisterInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
}

function createDemoUser(email: string, firstName?: string, lastName?: string): MockUser {
  const username = email.split("@")[0] || mockUser.username;

  return {
    ...mockUser,
    email,
    username,
    firstName: firstName?.trim() || mockUser.firstName,
    lastName: lastName?.trim() || mockUser.lastName,
  };
}

// ─── Auth functions ───────────────────────────────────────────────────────────

/**
 * Authenticates a user with email and password.
 * TODO: API → POST /api/auth/login
 */
export async function login(
  email: string,
  _password: string,
): Promise<LoginResult> {
  // Simulate network latency in demo mode
  await new Promise((resolve) => setTimeout(resolve, 600));

  // Demo: always succeeds — swap this block for a real API call when backend is ready
  return { success: true, user: createDemoUser(email) };
}

/**
 * Logs the current user out by invalidating the session.
 * TODO: API → POST /api/auth/logout
 */
export async function logout(): Promise<void> {
  // Demo: no-op — a real implementation would revoke the JWT / session token
  await Promise.resolve();
}

/**
 * Registers a new user account.
 * TODO: API → POST /api/auth/register
 */
export async function register(
  input: RegisterInput,
): Promise<LoginResult> {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return {
    success: true,
    user: {
      ...createDemoUser(input.email, input.firstName, input.lastName),
      level: "standard",
      verified: false,
      favoritesSports: ["football"],
      favoriteMatches: [],
    },
  };
}
