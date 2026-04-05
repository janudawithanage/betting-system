import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { BetSelection, BetMode } from '@/types';
import { calculateMultiOdds, calculatePayout, generateId } from '@/utils';

interface BetSlipState {
  selections: BetSelection[];
  mode: BetMode;
  stakes: Record<string, number>;
  multiStake: number;
  isOpen: boolean;

  addSelection: (selection: Omit<BetSelection, 'id'>) => void;
  removeSelection: (id: string) => void;
  clearSlip: () => void;
  setMode: (mode: BetMode) => void;
  setStake: (selectionId: string, amount: number) => void;
  setMultiStake: (amount: number) => void;
  toggleOpen: () => void;
  setOpen: (open: boolean) => void;

  // Computed
  totalOdds: () => number;
  totalPossibleReturn: () => number;
  selectionCount: () => number;
}

export const useBetSlipStore = create<BetSlipState>()(
  persist(
    (set, get) => ({
      selections: [],
      mode: 'single',
      stakes: {},
      multiStake: 10,
      isOpen: false,

      addSelection: (selectionData) => {
        const id = generateId();
        set((state) => ({
          selections: [...state.selections, { ...selectionData, id }],
          isOpen: true,
        }));
      },

      removeSelection: (id) => {
        set((state) => {
          const newStakes = { ...state.stakes };
          delete newStakes[id];
          return {
            selections: state.selections.filter((s) => s.id !== id),
            stakes: newStakes,
          };
        });
      },

      clearSlip: () => {
        set({ selections: [], stakes: {}, multiStake: 10 });
      },

      setMode: (mode) => set({ mode }),

      setStake: (selectionId, amount) => {
        set((state) => ({
          stakes: { ...state.stakes, [selectionId]: amount },
        }));
      },

      setMultiStake: (amount) => set({ multiStake: amount }),

      toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
      setOpen: (open) => set({ isOpen: open }),

      totalOdds: () => {
        const { selections } = get();
        if (selections.length === 0) return 0;
        return calculateMultiOdds(selections.map((s) => s.oddValue));
      },

      totalPossibleReturn: () => {
        const { mode, selections, stakes, multiStake } = get();
        if (mode === 'multi') {
          const total = calculateMultiOdds(selections.map((s) => s.oddValue));
          return calculatePayout(multiStake, total);
        }
        return selections.reduce((sum, s) => {
          const stake = stakes[s.id] || 10;
          return sum + calculatePayout(stake, s.oddValue);
        }, 0);
      },

      selectionCount: () => get().selections.length,
    }),
    { name: 'betpulse-slip' }
  )
);
