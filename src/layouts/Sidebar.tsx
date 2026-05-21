import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, Gamepad2, History, User, X, Search } from 'lucide-react';
import { ROUTES } from '@/constants/config';
import { cn } from '@/utils/cn';
import { useUIStore } from '@/store/useUIStore';
import { Button } from '@/components/ui/Button';

const MENU_ITEMS = [
  { path: ROUTES.HOME, icon: Home, label: 'Beranda' },
  { path: ROUTES.GAMES, icon: Gamepad2, label: 'Katalog Game' },
  { path: ROUTES.HISTORY, icon: History, label: 'Riwayat' },
  { path: ROUTES.PROFILE, icon: User, label: 'Profil' },
];

/**
 * Responsive navigation sidebar component.
 * Implements global search functionality mapping to the Game Catalog.
 */
export const Sidebar = () => {
  const { isMobileMenuOpen, closeMobileMenu } = useUIStore();
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');

  /**
   * Handles global search execution on 'Enter' key press.
   * Redirects to the catalog page with URL query parameters.
   */
  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchInput.trim()) {
      // Mengirim user ke halaman Games dengan query parameter
      navigate(`${ROUTES.GAMES}?q=${encodeURIComponent(searchInput.trim())}`);
      setSearchInput(''); // Bersihkan input
      closeMobileMenu(); // Tutup sidebar otomatis (di versi mobile)
    }
  };

  return (
    <>
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={closeMobileMenu}
        />
      )}

      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 glass-panel border-r-0 lg:border-r border-white/5 bg-surface lg:bg-surface/30 px-4 py-6 transition-transform duration-300 ease-in-out",
        "lg:static lg:translate-x-0 lg:h-[calc(100vh-5rem)] lg:flex lg:flex-col lg:w-64",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        
        <div className="flex items-center justify-between mb-6 lg:hidden px-2">
          <span className="text-xl font-bold text-primary">Menu</span>
          <Button variant="ghost" size="sm" className="px-2" onClick={closeMobileMenu}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Global Search Bar */}
        <div className="mb-6 lg:hidden px-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
            <input
              type="text"
              placeholder="Cari game..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleSearch}
              className="w-full bg-background border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-text-primary focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          {MENU_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={closeMobileMenu} 
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium',
                  isActive
                    ? 'bg-primary text-gray-900 shadow-premium'
                    : 'text-text-secondary hover:bg-white/5 hover:text-text-primary'
                )
              }
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </aside>
    </>
  );
};