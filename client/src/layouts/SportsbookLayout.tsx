import { Outlet } from 'react-router-dom';
import { TopNavbar } from '@/components/layout/TopNavbar';
import { SidebarSportsMenu } from '@/components/layout/SidebarSportsMenu';
import { BettingSlipPanel } from '@/components/layout/BettingSlipPanel';
import { LiveTicker } from '@/components/layout/LiveTicker';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { ToastContainer } from '@/components/common/Toast';
import { motion } from 'framer-motion';

export function SportsbookLayout() {
  return (
    <div className="min-h-screen bg-bg-primary flex flex-col">
      <TopNavbar />
      <LiveTicker />
      <div className="flex flex-1 overflow-hidden" style={{ height: 'calc(100vh - 112px)' }}>
        <SidebarSportsMenu />
        <main className="flex-1 overflow-y-auto pb-20 xl:pb-0">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Outlet />
          </motion.div>
        </main>
        <BettingSlipPanel />
      </div>
      <MobileBottomNav />
      <ToastContainer />
    </div>
  );
}
