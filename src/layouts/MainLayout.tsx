import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { useThemeStore } from '@/store/useThemeStore';
import { useEffect } from 'react';

export const MainLayout = () => {
  const { theme } = useThemeStore();

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-x-hidden">
      <Navbar />
      {/* Tambahkan overflow-hidden relatif di sini */}
      <div className="flex flex-1 relative w-full">
        <Sidebar />
        <main className="flex-1 w-full overflow-y-auto">
          <div className="p-4 lg:p-8 max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};