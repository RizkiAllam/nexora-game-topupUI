import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Search, Menu, Sun, Moon } from 'lucide-react';
import { useUIStore } from '@/store/useUIStore';
import { useThemeStore } from '@/store/useThemeStore';
import { ROUTES } from '@/constants/config';
import { Button } from '@/components/ui/Button';

/**
 * Main navigation header component.
 * Integrates global search, theme toggling, and mobile canvas triggers.
 */
export const Navbar = () => {
  const { openMobileMenu } = useUIStore();
  const { theme, toggleTheme } = useThemeStore();
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchInput.trim()) {
      navigate(`${ROUTES.GAMES}?q=${encodeURIComponent(searchInput.trim())}`);
      setSearchInput('');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b-0 lg:border-b border-white/5 bg-surface/80 backdrop-blur-xl">
      <div className="flex h-16 items-center px-4 md:px-6 justify-between gap-4">
        
        {/* Branding & Menu Trigger */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="px-2 lg:hidden" onClick={openMobileMenu}>
            <Menu className="w-5 h-5" />
          </Button>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Nexora
          </span>
        </div>

        {/* Desktop Global Search Bar */}
        <div className="hidden lg:flex items-center flex-1 max-w-md ml-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
            <input
              type="text"
              placeholder="Cari game favoritmu..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleSearch}
              className="w-full bg-background/50 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm text-text-primary focus:outline-none focus:border-primary transition-all duration-300 focus:bg-background"
            />
          </div>
        </div>

        {/* Action Center & User Profile */}
        <div className="flex items-center gap-1 sm:gap-2">
          
          {/* Theme Toggle Button */}
          <Button variant="ghost" size="sm" className="p-2" onClick={toggleTheme}>
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-text-secondary hover:text-primary transition-colors" />
            ) : (
              <Moon className="w-5 h-5 text-text-secondary hover:text-primary transition-colors" />
            )}
          </Button>

          {/* Notification Button */}
          <Button variant="ghost" size="sm" className="relative p-2 flex">
            <Bell className="w-5 h-5 text-text-secondary" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full border-2 border-surface" />
          </Button>
          
          {/* User Avatar */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-secondary p-[2px] ml-2">
            <img 
              src="https://github.com/RizkiAllam.png" 
              alt="User Avatar" 
              className="w-full h-full rounded-full bg-surface object-cover"
            />
          </div>
        </div>
        
      </div>
    </header>
  );
};