import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { MockUser } from '@/types';
import { mockUser } from '@/data/mockData';

interface AuthState {
  user: MockUser | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<MockUser>) => void;
  toggleFavoriteMatch: (matchId: string) => void;
  toggleFavoriteSport: (sportId: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: false,

      login: async (_email: string, _password: string) => {
        // Simulate API delay
        await new Promise((res) => setTimeout(res, 800));
        // Always succeed with mock user in demo
        set({ user: mockUser, isLoggedIn: true });
        return true;
      },

      logout: () => set({ user: null, isLoggedIn: false }),

      updateUser: (updates) => {
        const { user } = get();
        if (user) set({ user: { ...user, ...updates } });
      },

      toggleFavoriteMatch: (matchId) => {
        const { user } = get();
        if (!user) return;
        const favs = user.favoriteMatches;
        const updated = favs.includes(matchId)
          ? favs.filter((id) => id !== matchId)
          : [...favs, matchId];
        set({ user: { ...user, favoriteMatches: updated } });
      },

      toggleFavoriteSport: (sportId) => {
        const { user } = get();
        if (!user) return;
        const favs = user.favoritesSports;
        const updated = favs.includes(sportId)
          ? favs.filter((id) => id !== sportId)
          : [...favs, sportId];
        set({ user: { ...user, favoritesSports: updated } });
      },
    }),
    { name: 'betpulse-auth' }
  )
);
