import { create } from 'zustand';
import type { Toast } from '@/types';
import { generateId } from '@/utils';

interface UIState {
  mobileMenuOpen: boolean;
  toasts: Toast[];
  activeSportFilter: string;
  setMobileMenuOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  setActiveSportFilter: (sport: string) => void;
}

export const useUIStore = create<UIState>((set, get) => ({
  mobileMenuOpen: false,
  toasts: [],
  activeSportFilter: 'all',

  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),

  addToast: (toastData) => {
    const id = generateId();
    const toast: Toast = { ...toastData, id };
    set((state) => ({ toasts: [...state.toasts, toast] }));
    setTimeout(() => {
      get().removeToast(id);
    }, toastData.duration || 4000);
  },

  removeToast: (id) => {
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
  },

  setActiveSportFilter: (sport) => set({ activeSportFilter: sport }),
}));
