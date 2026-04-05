import { useState } from 'react';
import { motion } from 'framer-motion';
import { promotions } from '@/data/mockData';
import { PromoCard } from '@/components/home/PromoCard';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const faqs = [
  { q: 'How do I claim the welcome bonus?', a: 'Simply register, make your first deposit of $20 or more, and the bonus will be automatically credited to your account within 24 hours.' },
  { q: 'What are the wagering requirements?', a: 'Bonus funds carry a 5x wagering requirement. This means you need to place bets totalling 5x the bonus amount before withdrawal is available.' },
  { q: 'Can I withdraw my bonus?', a: 'Bonus funds become withdrawable once wagering requirements are met. Winnings from bonus bets can be withdrawn immediately.' },
  { q: 'How does the Acca Boost work?', a: 'When you place an accumulator bet with 4 or more selections, you automatically qualify for the boost. The percentage increases with the number of selections.' },
  { q: 'When is cashback credited?', a: 'Cashback is calculated every Friday and credited to eligible accounts by 12:00 PM UTC every Friday.' },
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="card overflow-hidden"
    >
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-4 hover:bg-bg-elevated/50 transition-colors text-left">
        <span className="font-medium text-slate-200 text-sm pr-4">{q}</span>
        {open ? <ChevronUp className="w-4 h-4 text-slate-500 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-500 flex-shrink-0" />}
      </button>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          className="px-4 pb-4 border-t border-bg-border"
        >
          <p className="text-sm text-slate-400 mt-3 leading-relaxed">{a}</p>
        </motion.div>
      )}
    </motion.div>
  );
}

export function PromotionsPage() {
  return (
    <div className="p-4 lg:p-6 space-y-8">
      {/* Header CTA */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-orange-600 via-red-600 to-pink-700 p-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.1),transparent)]" />
        <div className="relative">
          <p className="text-white/80 text-sm font-medium mb-2">🎁 Limited Time Offers</p>
          <h1 className="text-3xl lg:text-4xl font-black text-white mb-3">Promotions & Bonuses</h1>
          <p className="text-white/70 leading-relaxed max-w-xl">
            Claim exclusive offers, boost your winnings, and enjoy weekly cashback. New promotions added every week.
          </p>
          <div className="mt-2 inline-block px-3 py-1 bg-white/10 rounded-full text-xs text-white/60">
            ⚠️ Demo only — no real money involved
          </div>
        </div>
      </div>

      {/* Promo cards */}
      <section>
        <h2 className="text-xl font-bold text-white mb-5">Current Offers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {promotions.map((promo, i) => (
            <PromoCard key={promo.id} promo={promo} index={i} />
          ))}
        </div>
      </section>

      {/* Terms block */}
      <section className="card p-5 space-y-3">
        <h3 className="font-bold text-white">General Terms & Conditions</h3>
        <ul className="space-y-2 text-sm text-slate-400">
          <li className="flex items-start gap-2"><span className="text-brand-400 mt-0.5">•</span>All bonuses are for demonstration purposes only.</li>
          <li className="flex items-start gap-2"><span className="text-brand-400 mt-0.5">•</span>Minimum age 18+ to participate in any promotional activity.</li>
          <li className="flex items-start gap-2"><span className="text-brand-400 mt-0.5">•</span>One active bonus per account at any time.</li>
          <li className="flex items-start gap-2"><span className="text-brand-400 mt-0.5">•</span>BetPulse reserves the right to amend or withdraw promotions at any time.</li>
          <li className="flex items-start gap-2"><span className="text-brand-400 mt-0.5">•</span>Wagering requirements must be met within 30 days of bonus activation.</li>
        </ul>
      </section>

      {/* FAQ */}
      <section>
        <div className="flex items-center gap-2 mb-5">
          <HelpCircle className="w-5 h-5 text-brand-400" />
          <h2 className="text-xl font-bold text-white">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
