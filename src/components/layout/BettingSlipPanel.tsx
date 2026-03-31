import { useBetSlipStore } from '@/store/betSlipStore';
import { useUIStore } from '@/store/uiStore';
import { useAuthStore } from '@/store/authStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, X, ChevronDown, ChevronUp, AlertCircle, ArrowRight } from 'lucide-react';
import { formatOdds, formatCurrency, calculatePayout } from '@/utils';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function BettingSlipPanel() {
  const {
    selections, mode, stakes, multiStake,
    removeSelection, clearSlip, setMode,
    setStake, setMultiStake, isOpen, setOpen,
    totalOdds, totalPossibleReturn,
  } = useBetSlipStore();
  const { addToast } = useUIStore();
  const { isLoggedIn } = useAuthStore();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handlePlaceBet = () => {
    if (!isLoggedIn) {
      addToast({ type: 'warning', title: 'Please Sign In', message: 'You need to be logged in to place bets.' });
      navigate('/login');
      return;
    }
    addToast({ type: 'success', title: 'Bet Placed! (Demo)', message: `${selections.length} selection${selections.length > 1 ? 's' : ''} placed successfully.` });
    clearSlip();
  };

  return (
    <motion.div
      initial={false}
      animate={{ width: isOpen ? 320 : 0, opacity: isOpen ? 1 : 0 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      className="flex-shrink-0 overflow-hidden hidden xl:block"
    >
      <div className="w-80 h-full bg-bg-secondary border-l border-bg-border flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-bg-border">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">Bet Slip</span>
            {selections.length > 0 && (
              <span className="flex items-center justify-center w-5 h-5 bg-brand-500 text-white rounded-full text-xs font-bold">
                {selections.length}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            {selections.length > 0 && (
              <button onClick={clearSlip} className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all" title="Clear slip">
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button onClick={() => setIsCollapsed(!isCollapsed)} className="p-1.5 text-slate-500 hover:text-white hover:bg-bg-elevated rounded-lg transition-all">
              {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
            <button onClick={() => setOpen(false)} className="p-1.5 text-slate-500 hover:text-white hover:bg-bg-elevated rounded-lg transition-all xl:hidden">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {!isCollapsed && (
          <>
            {/* Mode tabs */}
            {selections.length > 0 && (
              <div className="flex p-2 gap-1 border-b border-bg-border">
                {(['single', 'multi'] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all capitalize ${mode === m ? 'bg-brand-500 text-white' : 'text-slate-400 hover:text-white hover:bg-bg-elevated'}`}
                  >
                    {m === 'multi' ? 'Multi / Acca' : 'Single'}
                  </button>
                ))}
              </div>
            )}

            {/* Selections */}
            <div className="flex-1 overflow-y-auto scrollable">
              {selections.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <div className="text-4xl mb-4">🎯</div>
                  <p className="text-slate-400 font-medium text-sm">Your bet slip is empty</p>
                  <p className="text-slate-600 text-xs mt-2 leading-relaxed">Select odds from any match to add them here</p>
                </div>
              ) : (
                <div className="p-3 space-y-2">
                  <AnimatePresence>
                    {selections.map((sel) => (
                      <motion.div
                        key={sel.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20, height: 0 }}
                        className="card p-3 space-y-2.5"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-brand-400 font-medium truncate">{sel.leagueName}</p>
                            <p className="text-sm font-semibold text-white truncate mt-0.5">{sel.matchName}</p>
                            <p className="text-xs text-slate-400 mt-0.5">{sel.marketName}</p>
                          </div>
                          <button
                            onClick={() => removeSelection(sel.id)}
                            className="p-1 text-slate-600 hover:text-red-400 hover:bg-red-500/10 rounded transition-all flex-shrink-0"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="px-2 py-1 rounded-md bg-bg-elevated text-xs font-medium text-slate-300">{sel.oddLabel}</span>
                          <span className="text-brand-400 font-bold text-sm">{formatOdds(sel.oddValue)}</span>
                        </div>

                        {mode === 'single' && (
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-slate-500">Stake ($)</span>
                              <input
                                type="number"
                                min="1"
                                value={stakes[sel.id] || 10}
                                onChange={(e) => setStake(sel.id, parseFloat(e.target.value) || 0)}
                                className="input-dark text-xs py-1.5 text-right"
                              />
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-slate-500">Possible return</span>
                              <span className="text-green-400 font-semibold">
                                {formatCurrency(calculatePayout(stakes[sel.id] || 10, sel.oddValue))}
                              </span>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Multi stake + totals */}
            {selections.length > 1 && mode === 'multi' && (
              <div className="p-3 border-t border-bg-border space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Total Odds</span>
                  <span className="font-bold text-white">{formatOdds(totalOdds())}</span>
                </div>
                <div>
                  <label className="text-xs text-slate-500 mb-1 block">Stake ($)</label>
                  <input
                    type="number"
                    min="1"
                    value={multiStake}
                    onChange={(e) => setMultiStake(parseFloat(e.target.value) || 0)}
                    className="input-dark text-sm"
                  />
                </div>
                <div className="flex items-center justify-between bg-green-500/10 border border-green-500/20 rounded-lg px-3 py-2">
                  <span className="text-sm text-slate-300">Possible Return</span>
                  <span className="text-green-400 font-bold text-base">{formatCurrency(totalPossibleReturn())}</span>
                </div>
              </div>
            )}

            {/* Place bet */}
            {selections.length > 0 && (
              <div className="p-3 border-t border-bg-border space-y-2">
                {mode === 'single' && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Total Return (est.)</span>
                    <span className="text-green-400 font-bold">{formatCurrency(totalPossibleReturn())}</span>
                  </div>
                )}
                <button onClick={handlePlaceBet} className="w-full btn-primary flex items-center justify-center gap-2">
                  Place Bet <ArrowRight className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-1.5 text-xs text-slate-600">
                  <AlertCircle className="w-3 h-3" />
                  <span>18+ | Demo mode — no real money</span>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}
