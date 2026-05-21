import { Game } from '@/types/game';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/config';
import { Flame } from 'lucide-react';

interface GameCardProps {
  game: Game;
}

export const GameCard = ({ game }: GameCardProps) => {
  return (
    <Link 
      to={`${ROUTES.CHECKOUT}/${game.id}`} // Nanti kita buat halaman checkout dinamis
      className="group relative flex flex-col glass-panel rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-premium transition-all duration-300"
    >
      {/* Label Popular */}
      {game.isPopular && (
        <div className="absolute top-3 right-3 z-10 bg-red-500/90 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-lg">
          <Flame className="w-3 h-3" /> Popular
        </div>
      )}

      {/* Image Container dengan efek zoom saat hover */}
      <div className="w-full aspect-[4/3] overflow-hidden bg-background">
        <img 
          src={game.imageUrl} 
          alt={game.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-1">
        <span className="text-xs font-semibold text-primary uppercase tracking-wider">
          {game.category}
        </span>
        <h3 className="text-base font-bold text-text-primary line-clamp-1 group-hover:text-primary transition-colors">
          {game.name}
        </h3>
        <p className="text-sm text-text-secondary">
          {game.publisher}
        </p>
      </div>
    </Link>
  );
};