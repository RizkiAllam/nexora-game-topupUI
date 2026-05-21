import { User, Mail, Shield, Award, Settings, LogOut } from 'lucide-react';
import { useTransactionStore } from '@/store/useTransactionStore';
import { Button } from '@/components/ui/Button';

/**
 * User profile view component.
 * Aggregates user data and computes dynamic statistics from the global transaction store.
 */
export const Profile = () => {
  const { transactions } = useTransactionStore();

  const totalTransactions = transactions.length;
  const recentActivityDate = transactions.length > 0 
    ? new Date(transactions[0].timestamp).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
    : 'Belum ada aktivitas';

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-primary/10 rounded-lg text-primary">
          <User className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold text-text-primary">Profil Pengguna</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Profile Module */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-panel p-8 rounded-2xl flex flex-col items-center text-center space-y-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-primary/20 to-transparent" />
            
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-primary to-secondary p-[3px] relative z-10 shadow-premium">
              <img 
                src="https://github.com/RizkiAllam.png" 
                alt="Profile Avatar" 
                className="w-full h-full rounded-full bg-surface object-cover"
              />
            </div>
            
            <div className="relative z-10 space-y-1">
              <h2 className="text-xl font-bold text-text-primary">Rizki</h2>
              <p className="text-sm text-text-secondary">Front-End Developer</p>
            </div>

            <div className="w-full pt-4 border-t border-white/10 space-y-3 relative z-10">
              <div className="flex items-center text-sm text-text-secondary gap-3">
                <Mail className="w-4 h-4 text-primary" />
                rizki@nexora.dev
              </div>
              <div className="flex items-center text-sm text-text-secondary gap-3">
                <Shield className="w-4 h-4 text-primary" />
                Akun Terverifikasi
              </div>
            </div>
          </div>

          <div className="glass-panel p-4 rounded-2xl space-y-2">
            <Button variant="ghost" className="w-full justify-start text-text-secondary hover:text-text-primary">
              <Settings className="w-4 h-4 mr-3" />
              Pengaturan Akun
            </Button>
            <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-400 hover:bg-red-500/10">
              <LogOut className="w-4 h-4 mr-3" />
              Keluar
            </Button>
          </div>
        </div>

        {/* Statistics & System Information Panel */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="glass-panel p-6 rounded-2xl flex items-center gap-4 border-l-4 border-l-primary">
              <div className="p-4 bg-primary/10 rounded-xl text-primary">
                <Award className="w-8 h-8" />
              </div>
              <div>
                <p className="text-sm font-medium text-text-secondary">Total Transaksi</p>
                <p className="text-3xl font-bold text-text-primary">{totalTransactions}</p>
              </div>
            </div>
            
            <div className="glass-panel p-6 rounded-2xl flex items-center gap-4 border-l-4 border-l-secondary">
              <div className="p-4 bg-secondary/10 rounded-xl text-secondary">
                <User className="w-8 h-8" />
              </div>
              <div>
                <p className="text-sm font-medium text-text-secondary">Aktivitas Terakhir</p>
                <p className="text-sm font-bold text-text-primary mt-1">{recentActivityDate}</p>
              </div>
            </div>
          </div>

          <div className="glass-panel p-8 rounded-2xl">
            <h3 className="text-lg font-bold text-text-primary mb-4">Informasi Sistem</h3>
            <div className="space-y-4">
              <div className="flex justify-between py-3 border-b border-white/5">
                <span className="text-text-secondary text-sm">Environment</span>
                <span className="text-text-primary text-sm font-medium">Linux (CachyOS)</span>
              </div>
              <div className="flex justify-between py-3 border-b border-white/5">
                <span className="text-text-secondary text-sm">Arsitektur UI</span>
                <span className="text-text-primary text-sm font-medium">React + Vite + Tailwind</span>
              </div>
              <div className="flex justify-between py-3 border-b border-white/5">
                <span className="text-text-secondary text-sm">State Management</span>
                <span className="text-text-primary text-sm font-medium">Zustand + React Hook Form</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};