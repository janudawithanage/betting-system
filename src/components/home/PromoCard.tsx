import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';
import type { Promotion } from '@/types';
import { formatMatchDate } from '@/utils';

interface PromoCardProps {
  promo: Promotion;
  index?: number;
}

export function PromoCard({ promo, index = 0 }: PromoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -3, scale: 1.01 }}
      className={`relative rounded-2xl overflow-hidden bg-gradient-to-br ${promo.color} p-6 cursor-pointer shadow-card`}
    >
      {/* Decorative blobs */}
      <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/5 rounded-full" />
      <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-black/10 rounded-full" />

      <div className="relative">
        <div className="text-3xl mb-3">{promo.icon}</div>
        <span className="inline-block px-2.5 py-0.5 bg-white/20 rounded-full text-xs font-semibold text-white mb-3">
          {promo.tag}
        </span>
        <h3 className="text-xl font-bold text-white mb-1">{promo.title}</h3>
        <p className="text-sm font-semibold text-white/80 mb-2">{promo.subtitle}</p>
        <p className="text-xs text-white/60 leading-relaxed mb-4 line-clamp-2">{promo.description}</p>

        <div className="flex items-center justify-between">
          <Link
            to="/promotions"
            className="inline-flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all"
          >
            {promo.cta} <ArrowRight className="w-4 h-4" />
          </Link>
          <div className="flex items-center gap-1 text-white/50 text-xs">
            <Clock className="w-3 h-3" />
            <span>Until {formatMatchDate(promo.expiresAt)}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
