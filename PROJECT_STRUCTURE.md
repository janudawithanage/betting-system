# Project Structure

Detailed breakdown of every directory and its purpose.

---

## Repository root

```
betting-system/
├── client/               # Frontend application (React + Vite)
├── server/               # Backend placeholder (Node.js — not yet implemented)
├── .gitignore
├── .env.example          # (none at root — env files live inside client/)
├── LICENSE
├── README.md
├── SETUP.md
└── PROJECT_STRUCTURE.md  # ← You are here
```

---

## `client/` — Frontend

```
client/
├── index.html            # Vite entry HTML
├── package.json
├── vite.config.ts        # Vite + path alias (@/ → src/)
├── tailwind.config.js    # Design tokens, custom colours, component styles
├── tsconfig.json
├── tsconfig.node.json
├── postcss.config.js
├── .env.example          # Environment variable template
└── src/
    ├── main.tsx          # React DOM bootstrap
    │
    ├── config/
    │   └── constants.ts  # App name, API URL, demo creds, feature flags,
    │                     # storage keys — single source of truth for config
    │
    ├── types/
    │   └── index.ts      # All shared TypeScript interfaces and type aliases
    │                     # (Sport, Match, BetSelection, MockUser, Toast, …)
    │
    ├── data/
    │   └── mockData.ts   # Static mock data (sports, matches, odds, users,
    │                     # promotions, transactions, notifications)
    │                     # Used by services in demo mode only
    │
    ├── services/         # Data / API abstraction layer
    │   ├── apiClient.ts  # Fetch wrapper — base URL, headers, error handling
    │   ├── matchService.ts # Match, sport, and league data functions
    │   └── authService.ts  # Login, logout, register functions
    │                     # Each function has a TODO: API comment showing
    │                     # the real endpoint to call once backend is ready
    │
    ├── store/            # Zustand global state stores
    │   ├── authStore.ts  # User session: login, logout, favourites
    │   ├── betSlipStore.ts # Bet slip: selections, stakes, payout, persist
    │   └── uiStore.ts    # UI state: toast queue, mobile menu open
    │
    ├── hooks/            # Reusable custom React hooks
    │   └── useMatchFilters.ts # Filtering logic for match lists
    │
    ├── routes/
    │   └── AppRouter.tsx # createBrowserRouter declaration — all routes
    │
    ├── layouts/          # Page shell wrappers (Outlet-based)
    │   ├── MainLayout.tsx       # Navbar + LiveTicker + BetSlip + MobileNav
    │   ├── SportsbookLayout.tsx # MainLayout + collapsible sports sidebar
    │   └── AuthLayout.tsx       # Centred card, branding only
    │
    ├── pages/            # One file per route (route-level components)
    │   ├── HomePage.tsx
    │   ├── SportsbookPage.tsx
    │   ├── LivePage.tsx
    │   ├── SportPage.tsx        # /sports/:sport
    │   ├── MatchDetailPage.tsx  # /match/:id
    │   ├── PromotionsPage.tsx
    │   ├── ResultsPage.tsx
    │   ├── DashboardPage.tsx
    │   ├── WalletPage.tsx
    │   ├── FavoritesPage.tsx
    │   ├── SettingsPage.tsx
    │   ├── LoginPage.tsx
    │   └── RegisterPage.tsx
    │
    ├── components/       # Reusable presentational components
    │   ├── common/       # Generic, domain-agnostic UI primitives
    │   │   ├── Badge.tsx         # LiveBadge, HotBadge, generic Badge
    │   │   ├── EmptyState.tsx    # Zero-result placeholder with icon + CTA
    │   │   ├── SearchInput.tsx   # Controlled search field
    │   │   └── Toast.tsx         # Toast notification + ToastContainer
    │   │
    │   ├── home/         # Components used only on the home page
    │   │   ├── FeaturedMatchCarousel.tsx
    │   │   └── PromoCard.tsx
    │   │
    │   ├── layout/       # App shell components (used inside layouts)
    │   │   ├── TopNavbar.tsx
    │   │   ├── SidebarSportsMenu.tsx
    │   │   ├── BettingSlipPanel.tsx
    │   │   ├── LiveTicker.tsx
    │   │   └── MobileBottomNav.tsx
    │   │
    │   └── sportsbook/   # Domain components for the betting/match UI
    │       ├── MatchCard.tsx
    │       ├── LiveMatchCard.tsx
    │       ├── OddsButton.tsx
    │       ├── MarketAccordion.tsx
    │       └── FilterBar.tsx
    │
    ├── styles/
    │   └── globals.css   # Tailwind directives, CSS variables, global resets,
    │                     # custom scrollbar, and utility component classes
    │
    └── utils/
        └── index.ts      # Pure helpers: cn(), formatOdds(), formatCurrency(),
                          # formatMatchTime(), calculatePayout(), generateId(), …
```

---

## `server/` — Backend (placeholder)

```
server/
└── src/
    ├── config/       # Database, environment, and app configuration
    ├── controllers/  # Route handler functions
    ├── middlewares/  # Auth guard, error handler, rate limiter, etc.
    ├── models/       # Data models / ORM schemas
    ├── routes/       # Express router definitions
    └── utils/        # Server-side helper functions
```

All directories are currently empty.  
The structure follows a standard MVC-style Node.js backend layout.  
When implementation begins, the frontend's `services/` layer will be the primary integration point.

---

## Key architectural decisions

### Why `services/` in the frontend?

Pages should not know where data comes from. The service layer is the only place
that deals with mock files _or_ API calls. Swapping from mock to real API means
changing one file, not touching every page.

### Why `config/constants.ts`?

Magic strings and numbers scattered across files are a maintenance hazard.
A single config module means changes to API URLs, app names, or feature flags
happen in one place.

### Why keep `data/mockData.ts`?

The mock data enables 100 % of the UI to be developed and demonstrated without
a backend. It is not test data — it is a deliberate demo layer.

### Why Zustand over Redux?

Zustand has zero boilerplate, first-class TypeScript support, and built-in
`persist` middleware. For a project of this scale it is the right choice.
