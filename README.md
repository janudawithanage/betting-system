# BetPulse — Premium Sports Betting Platform

A complete, production-quality **frontend-only** sports betting platform built with React, TypeScript, Tailwind CSS, and Zustand.

> ⚠️ **Demo Platform Only** — No real money, no real betting, no backend. All data is mocked locally.

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v3 |
| Routing | React Router v6 |
| State | Zustand |
| Animations | Framer Motion |
| Icons | Lucide React |

---

## 📦 Getting Started

```bash
npm install
npm run dev
# → http://localhost:5173
```

---

## 🗺️ Pages & Routes

| Route | Page |
|---|---|
| `/` | Home — hero carousel, live events, top leagues |
| `/sports` | Sportsbook — match list with filters |
| `/sports/live` | Live Betting — scoreboard cards |
| `/sports/:sport` | Per-sport events |
| `/match/:id` | Match Detail — odds, stats, H2H |
| `/promotions` | Promotions & bonuses |
| `/results` | Match results |
| `/dashboard` | User dashboard |
| `/wallet` | Wallet (demo) |
| `/login` | Sign In |
| `/register` | Create Account |
| `/favorites` | Saved matches & sports |
| `/settings` | Account preferences |

---

## 🎯 Key Features

- **Betting Slip** — single & multi/acca mode, stake input, payout calculation, persisted in localStorage
- **Live Ticker** — scrolling live score strip
- **Featured Carousel** — auto-rotating hero with odds
- **Sports Sidebar** — expandable leagues, star favourites
- **Mobile Bottom Nav** — full responsive mobile experience
- **Toast Notifications** — for all interactions
- **Auth Flow** — demo login: `demo@betpulse.io` / `demo1234`

---

## 📁 Folder Structure

```
src/
  components/
    common/       # Skeleton, Toast, Badge, SearchInput, EmptyState
    layout/       # TopNavbar, Sidebar, BettingSlipPanel, LiveTicker, MobileBottomNav
    sportsbook/   # MatchCard, LiveMatchCard, OddsButton, MarketAccordion, FilterBar
    home/         # FeaturedMatchCarousel, PromoCard
  pages/          # All 13 route-level pages
  layouts/        # MainLayout, SportsbookLayout, AuthLayout
  store/          # betSlipStore, authStore, uiStore
  data/           # mockData.ts (sports, matches, odds, promos, etc.)
  types/          # TypeScript interfaces
  utils/          # formatOdds, formatCurrency, calculatePayout, etc.
  routes/         # AppRouter
  styles/         # globals.css
```

---

## ⚠️ Disclaimer

This is a **demonstration UI only**. No real gambling functionality exists. 18+ | Please gamble responsibly.
