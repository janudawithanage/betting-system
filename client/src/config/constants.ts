/**
 * Application-wide constants and configuration.
 *
 * Environment variables are read from import.meta.env (Vite).
 * Copy `.env.example` to `.env.local` and set values before running.
 */

// ─── Application metadata ────────────────────────────────────────────────────

export const APP_NAME = 'BetPulse';
export const APP_VERSION = '0.1.0';
export const APP_DESCRIPTION = 'Premium Sports Betting Platform — Demo Edition';

// ─── API configuration ────────────────────────────────────────────────────────

/**
 * Base URL for the REST API.
 * Defaults to localhost during development; override via VITE_API_BASE_URL in .env.local.
 */
export const API_BASE_URL: string =
  ((import.meta as unknown) as { env: Record<string, string> }).env.VITE_API_BASE_URL ?? 'http://localhost:3000/api';

/** Default request timeout in milliseconds. */
export const API_TIMEOUT_MS = 10_000;

// ─── Demo / development credentials ─────────────────────────────────────────

/**
 * Pre-filled demo credentials used on the login page.
 * These are safe to expose — this is a demo platform with no real accounts.
 */
export const DEMO_EMAIL = 'demo@betpulse.io';
export const DEMO_PASSWORD = 'demo1234';

// ─── Feature flags ────────────────────────────────────────────────────────────

/**
 * When true, all data is served from local mock files instead of the API.
 * Set VITE_USE_MOCK_DATA=false in .env.local to switch to a real backend.
 */
export const USE_MOCK_DATA: boolean =
  (((import.meta as unknown) as { env: Record<string, string> }).env.VITE_USE_MOCK_DATA ?? 'true') === 'true';

// ─── Localisation / formatting ───────────────────────────────────────────────

export const DEFAULT_CURRENCY = 'USD';
export const DEFAULT_ODDS_FORMAT = 'decimal';
export const DEFAULT_LOCALE = 'en-US';

// ─── Persistence keys ────────────────────────────────────────────────────────

export const STORAGE_KEY_AUTH = 'betpulse-auth';
export const STORAGE_KEY_BET_SLIP = 'betpulse-betslip';
