import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, Gamepad2, Monitor, LayoutGrid } from 'lucide-react';
import { gameService } from '@/services/api';
import { Game } from '@/types/game';
import { ROUTES } from '@/constants/config';
import { cn } from '@/utils/cn';

export const Games = () => {
  const navigate = useNavigate();
  // 1. Jadikan URL sebagai Single Source of Truth
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || ''; 
  
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<'All' | 'Mobile' | 'PC'>('All');

  // HAPUS useEffect yang memicu error sebelumnya!

  useEffect(() => {
    const fetchAllGames = async () => {
      try {
        const data = await gameService.getGames();
        setGames(data);
      } catch (error) {
        console.error('Failed to fetch game catalog:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllGames();
  }, []);

  const filteredGames = games.filter((game) => {
    const matchesSearch = game.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          game.publisher.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || game.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Katalog Game</h1>
          <p className="text-text-secondary mt-1">Temukan dan top-up game favoritmu.</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
            <input
              type="text"
              placeholder="Cari nama atau publisher..."
              value={searchQuery}
              onChange={(e) => {
                // 2. Langsung update URL saat user mengetik
                const value = e.target.value;
                if (value) {
                  setSearchParams({ q: value });
                } else {
                  setSearchParams({}); // Hapus parameter jika kosong
                }
              }}
              className="w-full bg-surface border border-white/10 rounded-xl py-2 pl-9 pr-4 text-sm text-text-primary focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          
          <div className="flex items-center gap-1 bg-surface p-1 rounded-xl border border-white/10 w-full sm:w-auto">
            {(['All', 'Mobile', 'PC'] as const).map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-all flex-1 sm:flex-none justify-center",
                  activeCategory === category 
                    ? "bg-primary text-gray-900 shadow-premium" 
                    : "text-text-secondary hover:text-text-primary hover:bg-white/5"
                )}
              >
                {category === 'All' && <LayoutGrid className="w-4 h-4" />}
                {category === 'Mobile' && <Gamepad2 className="w-4 h-4" />}
                {category === 'PC' && <Monitor className="w-4 h-4" />}
                <span className="hidden sm:inline">{category}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Grid Rendering */}
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="aspect-[3/4] rounded-2xl glass-panel animate-pulse" />
          ))}
        </div>
      ) : filteredGames.length === 0 ? (
        <div className="glass-panel p-12 text-center rounded-2xl">
          <p className="text-text-secondary">Tidak ada game yang sesuai dengan pencarian Anda.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filteredGames.map((game) => (
            <button
              key={game.id}
              onClick={() => navigate(`${ROUTES.CHECKOUT}/${game.id}`)}
              className="group text-left relative rounded-2xl overflow-hidden glass-panel transition-all duration-300 hover:scale-105 hover:shadow-premium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
            >
              <div className="aspect-[3/4] overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-transparent z-10" />
                <img
                  src={game.imageUrl}
                  alt={game.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute top-2 right-2 z-20">
                  <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-black/50 backdrop-blur-md text-white rounded-lg border border-white/10">
                    {game.category}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 p-4 z-20 w-full">
                  <h3 className="font-bold text-white text-sm sm:text-base truncate">
                    {game.name}
                  </h3>
                  <p className="text-primary text-xs font-medium truncate mt-0.5">
                    {game.publisher}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};