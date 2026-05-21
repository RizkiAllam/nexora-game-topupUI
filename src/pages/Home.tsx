import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Gamepad2, TrendingUp } from 'lucide-react';
import { gameService } from '@/services/api';
import { Game } from '@/types/game';
import { GameCard } from '@/components/ui/GameCard';

export const Home = () => {
  const [popularGames, setPopularGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setIsLoading(true);
        const data = await gameService.getPopularGames();
        setPopularGames(data);
      } catch (error) {
        console.error("Failed to fetch games", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGames();
  }, []);

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Hero Banner */}
      <div className="glass-panel rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 border-l-4 border-l-primary relative overflow-hidden">
        {/* Dekorasi Background Glow */}
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-text-primary mb-2">
            Selamat datang di Nexora
          </h1>
          <p className="text-text-secondary max-w-lg">
            Platform Top-Up Game terpercaya. Temukan harga terbaik untuk game favoritmu hari ini dengan proses instan.
          </p>
        </div>
        <Button size="lg" className="shrink-0 relative z-10">
          <Gamepad2 className="w-5 h-5 mr-2" />
          Mulai Top Up
        </Button>
      </div>

      {/* Popular Games Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <TrendingUp className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-text-primary">Game Terpopuler</h2>
        </div>

        {isLoading ? (
          /* Loading State: Skeleton Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="glass-panel rounded-2xl aspect-[4/5] animate-pulse bg-white/5" />
            ))}
          </div>
        ) : (
          /* Data Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {popularGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};