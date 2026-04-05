# Setup Guide

This guide covers everything you need to run BetPulse locally.

---

## Prerequisites

| Tool | Minimum Version | Notes |
|---|---|---|
| Node.js | 18.x LTS | [nodejs.org](https://nodejs.org) |
| npm | 9.x | Bundled with Node |
| Git | 2.x | |

Optional (for future backend):
- PostgreSQL 15+
- Docker & Docker Compose

---

## 1 — Clone the repository

```bash
git clone https://github.com/<your-username>/betting-system.git
cd betting-system
```

---

## 2 — Configure environment variables

```bash
cp client/.env.example client/.env.local
```

The defaults in `.env.local` are sufficient for running the frontend with mock data.  
Edit `VITE_API_BASE_URL` only when a backend is available.

---

## 3 — Install dependencies

```bash
cd client
npm install
```

---

## 4 — Start the development server

```bash
npm run dev
```

The app will be available at **http://localhost:5173**.

---

## 5 — Build for production

```bash
npm run build
# Output: client/dist/
```

To preview the production build locally:

```bash
npm run preview
```

---

## Available Scripts (inside `client/`)

| Script | Description |
|---|---|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint on all TypeScript/TSX files |

---

## Demo Login

| Field | Value |
|---|---|
| Email | `demo@betpulse.io` |
| Password | `demo1234` |

Any valid email/password combination is accepted in demo mode.

---

## Switching from Mock Data to a Real Backend

1. Set `VITE_USE_MOCK_DATA=false` and `VITE_API_BASE_URL=http://localhost:3000/api` in `client/.env.local`.
2. Implement the backend endpoints listed in `client/src/services/matchService.ts` and `client/src/services/authService.ts`.
3. Each service function includes a `TODO: API` comment with the expected endpoint and HTTP method.

---

## Project Structure

See [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md).
