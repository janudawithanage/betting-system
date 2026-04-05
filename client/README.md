# BetPulse — Frontend

React + TypeScript + Vite frontend for the BetPulse sports betting platform.

> See the [root README](../README.md) for the full project overview.

---

## Quick start

```bash
npm install
npm run dev
# → http://localhost:5173
```

Demo login: `demo@betpulse.io` / `demo1234`

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server (HMR) |
| `npm run build` | Type-check + production build → `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | ESLint on all TS/TSX files |

---

## Environment variables

Copy `.env.example` to `.env.local` and adjust as needed.

| Variable | Default | Description |
|---|---|---|
| `VITE_API_BASE_URL` | `http://localhost:3000/api` | Backend REST API URL |
| `VITE_USE_MOCK_DATA` | `true` | Use local mock data (no backend needed) |

---

## Routes

| Route | Page |
|---|---|
| `/` | Home — carousel, live events, sport quick-links |
| `/sports` | Sportsbook — match list with sport/league filters |
| `/sports/live` | Live Betting — in-play scoreboard cards |
| `/sports/:sport` | Per-sport event list |
| `/match/:id` | Match Detail — full odds markets, stats |
| `/promotions` | Promotions & bonus offers |
| `/results` | Historical match results |
| `/dashboard` | User overview — balance, activity, notifications |
| `/wallet` | Deposit / withdrawal (demo) |
| `/favorites` | Saved matches and sports |
| `/settings` | Account preferences |
| `/login` | Sign in |
| `/register` | Create account |

---

## Key architecture decisions

- **`src/services/`** — all data access goes through services, not directly through `mockData`.  
  When a backend is ready, change the function bodies in `matchService.ts` / `authService.ts`.
- **`src/config/constants.ts`** — single source of truth for app name, API URL, demo credentials, and feature flags.
- **`src/hooks/useMatchFilters.ts`** — reusable filtering hook used by match-list pages.
- **`src/store/`** — three Zustand stores: `authStore`, `betSlipStore`, `uiStore`.  
  `betSlipStore` and `authStore` are persisted via `localStorage`.

---

## Folder structure

```
src/
├── config/       # Constants, env, feature flags
├── types/        # Shared TypeScript interfaces
├── data/         # Mock data (demo mode only)
├── services/     # API / data abstraction layer
├── store/        # Zustand global state
├── hooks/        # Custom React hooks
├── routes/       # Router definition
├── layouts/      # Page shell components (Outlet-based)
├── pages/        # Route-level components
├── components/
│   ├── common/   # Generic UI primitives
│   ├── home/     # Home-page components
│   ├── layout/   # App shell components
│   └── sportsbook/ # Betting domain components
├── styles/       # Global CSS
└── utils/        # Pure helper functions
  types/          # TypeScript interfaces
  utils/          # formatOdds, formatCurrency, calculatePayout, etc.
  routes/         # AppRouter
  styles/         # globals.css
```

---

## ⚠️ Disclaimer

This is a **demonstration UI only**. No real gambling functionality exists. 18+ | Please gamble responsibly.
