# BetPulse — Sports Betting Platform

> **Status:** Frontend MVP complete · Backend integration pending

A full-featured, production-style sports betting web application built with React 18, TypeScript, and Tailwind CSS.  
This project demonstrates a scalable client–server architecture where the frontend is fully functional using mock data and is designed to integrate with a real REST API backend with minimal code changes.

---

## Tech Stack

| Concern | Technology |
|---|---|
| Framework | React 18 + Vite 6 |
| Language | TypeScript 5 (strict mode) |
| Styling | Tailwind CSS 3 |
| Routing | React Router 7 |
| State Management | Zustand 5 |
| Animations | Framer Motion 11 |
| Icons | Lucide React |
| Package Manager | npm |

---

## Current Status

| Area | Status |
|---|---|
| UI / Component library | ✅ Complete |
| Routing | ✅ Complete |
| Betting slip (single + multi/acca) | ✅ Complete |
| Auth flow (demo) | ✅ Complete |
| Mock data layer | ✅ Complete |
| Service / API layer (frontend contracts) | ✅ Scaffolded |
| Backend / REST API | 🔲 Not started |
| Database | 🔲 Not started |
| Real-time odds (WebSocket) | 🔲 Not started |
| Tests | 🔲 Not started |

---

## Features

- **Sportsbook** — browse live and upcoming events across 12 sports with odds and market filtering
- **Live Betting** — in-play events with real-time score display and market updates (mocked)
- **Betting Slip** — single and multi/accumulator modes, stake input, and payout calculation; persisted in `localStorage`
- **Match Detail** — per-match odds accordion, stats, and head-to-head layout
- **User Dashboard** — balance, transaction history, notification feed, and saved matches
- **Wallet** — deposit / withdrawal UI (demo)
- **Promotions** — bonus cards and terms display
- **Results** — historical match results with sport and date filtering
- **Favourites** — saved sports and matches, toggled per user
- **Authentication** — demo login / register flow with Zustand-persisted session
- **Responsive** — fully mobile-friendly with a dedicated bottom navigation bar

---

## Local Setup

See [SETUP.md](SETUP.md) for full instructions.

**Quick start:**

```bash
cd client
npm install
npm run dev
# → http://localhost:5173
```

**Demo credentials:**

| Field | Value |
|---|---|
| Email | `demo@betpulse.io` |
| Password | `demo1234` |

---

## Project Structure

```
betting-system/
├── client/                 # React + Vite frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── common/     # Generic components (Badge, EmptyState, Toast, SearchInput)
│   │   │   ├── home/       # Home-page specific components
│   │   │   ├── layout/     # App shell components (Navbar, Sidebar, BetSlip)
│   │   │   └── sportsbook/ # Match cards, odds buttons, market accordion
│   │   ├── config/         # App-wide constants and environment config
│   │   ├── data/           # Static mock data (replaces API calls during development)
│   │   ├── hooks/          # Reusable custom React hooks
│   │   ├── layouts/        # Page layout wrappers (Main, Sportsbook, Auth)
│   │   ├── pages/          # Route-level page components (one per route)
│   │   ├── routes/         # Centralised router definition
│   │   ├── services/       # API / data service layer (mock-backed, API-ready)
│   │   ├── store/          # Zustand state stores (auth, betSlip, ui)
│   │   ├── styles/         # Global CSS and Tailwind base styles
│   │   ├── types/          # Shared TypeScript interfaces and types
│   │   └── utils/          # Pure utility functions (formatting, helpers)
│   └── public/             # Static assets served as-is
├── server/                 # Future Node.js / Express backend (scaffolded)
├── SETUP.md
├── PROJECT_STRUCTURE.md
└── README.md               # ← You are here
```

See [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) for a detailed breakdown.

---

## Planned Improvements

- [ ] Real REST API (Node.js + Express or Fastify)
- [ ] PostgreSQL database with Prisma ORM
- [ ] JWT authentication with refresh tokens
- [ ] WebSocket live odds feed
- [ ] Unit and integration tests (Vitest + React Testing Library)
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Docker compose for local full-stack development
- [ ] Odds format toggle (decimal / fractional / american)
- [ ] Cash-out feature
- [ ] Responsible gambling controls

---

## Contributing

See [SETUP.md](SETUP.md) for the development environment setup.  
This project uses conventional commit messages — please follow the style when contributing.

---

## Disclaimer

> ⚠️ **This is a demonstration project only.**  
> No real money is involved. No real bets are placed. All data is mocked locally.  
> This application is not intended for real gambling use.

---

## License

[MIT](LICENSE) © 2026 BetPulse
