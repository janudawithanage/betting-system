import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { MockUser } from "@/types";
import type { RegisterInput } from "@/services/authService";
import {
  login as loginService,
  logout as logoutService,
  register as registerService,
} from "@/services/authService";

interface AuthState {
  user: MockUser | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (input: RegisterInput) => Promise<boolean>;
  logout: () => void;
  toggleFavoriteMatch: (matchId: string) => void;
  toggleFavoriteSport: (sportId: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: false,

      login: async (email: string, password: string) => {
        const result = await loginService(email, password);
        if (result.success && result.user) {
          set({ user: result.user, isLoggedIn: true });
        }
        return result.success;
      },

      register: async (input: RegisterInput) => {
        const result = await registerService(input);
        if (result.success && result.user) {
          set({ user: result.user, isLoggedIn: true });
        }
        return result.success;
      },

      logout: () => {
        void logoutService();
        set({ user: null, isLoggedIn: false });
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
    { name: "betpulse-auth" },
  ),
);
