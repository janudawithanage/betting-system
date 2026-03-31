import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import { AuthLayout } from '@/layouts/AuthLayout';
import { SportsbookLayout } from '@/layouts/SportsbookLayout';

import { HomePage } from '@/pages/HomePage';
import { SportsbookPage } from '@/pages/SportsbookPage';
import { LivePage } from '@/pages/LivePage';
import { SportPage } from '@/pages/SportPage';
import { MatchDetailPage } from '@/pages/MatchDetailPage';
import { PromotionsPage } from '@/pages/PromotionsPage';
import { ResultsPage } from '@/pages/ResultsPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { WalletPage } from '@/pages/WalletPage';
import { LoginPage } from '@/pages/LoginPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { FavoritesPage } from '@/pages/FavoritesPage';
import { SettingsPage } from '@/pages/SettingsPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'promotions', element: <PromotionsPage /> },
      { path: 'results', element: <ResultsPage /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'wallet', element: <WalletPage /> },
      { path: 'favorites', element: <FavoritesPage /> },
      { path: 'settings', element: <SettingsPage /> },
      { path: 'match/:id', element: <MatchDetailPage /> },
    ],
  },
  {
    path: '/sports',
    element: <SportsbookLayout />,
    children: [
      { index: true, element: <SportsbookPage /> },
      { path: 'live', element: <LivePage /> },
      { path: ':sport', element: <SportPage /> },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
