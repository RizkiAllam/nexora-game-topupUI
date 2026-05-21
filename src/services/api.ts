import { Game } from '@/types/game';

/**
 * Enterprise-grade Mock Database.
 * Contains domain-specific top-up packages tailored to each individual game ecosystem.
 */
const MOCK_GAMES: Game[] = [
  {
    id: 'g1',
    name: 'Mobile Legends: Bang Bang',
    publisher: 'Moonton',
    category: 'Mobile',
    imageUrl: '/images/logo-mobile-legend-31252.png',
    packages: [
      { id: 'ml-wdp', name: 'Weekly Diamond Pass', price: 28000, bonus: '210', promo: 'Terlaris 🔥' },
      { id: 'ml-tp', name: 'Twilight Pass', price: 140000, bonus: null, promo: 'Promo Baru' },
      { id: 'ml-86', name: '86 Diamonds', price: 20000, bonus: '8', promo: null },
      { id: 'ml-172', name: '172 Diamonds', price: 40000, bonus: '16', promo: null },
      { id: 'ml-257', name: '257 Diamonds', price: 57000, bonus: '28', promo: 'Diskon 5%' },
      { id: 'ml-706', name: '706 Diamonds', price: 160000, bonus: '94', promo: 'Populer' },
      { id: 'ml-2194', name: '2194 Diamonds', price: 480000, bonus: '350', promo: null },
      { id: 'ml-3688', name: '3688 Diamonds', price: 800000, bonus: '600', promo: 'Pilihan Sultan 💎' }
    ]
  },
  {
    id: 'g2',
    name: 'Valorant',
    publisher: 'Riot Games',
    category: 'PC',
    imageUrl: '/images/valorant-seeklogo.png',
    packages: [
      { id: 'val-125', name: '125 Valorant Points', price: 15000, bonus: null, promo: null },
      { id: 'val-420', name: '420 Valorant Points', price: 50000, bonus: '20', promo: null },
      { id: 'val-700', name: '700 Valorant Points', price: 80000, bonus: '45', promo: 'Populer 🔥' },
      { id: 'val-1375', name: '1375 Valorant Points', price: 150000, bonus: '100', promo: 'Hemat' },
      { id: 'val-2400', name: '2400 Valorant Points', price: 250000, bonus: '200', promo: null },
      { id: 'val-4000', name: '4000 Valorant Points', price: 400000, bonus: '400', promo: 'Rekomendasi' },
      { id: 'val-8150', name: '8150 Valorant Points', price: 800000, bonus: '950', promo: 'Sultan Pack' }
    ]
  },
  {
    id: 'g3',
    name: 'Genshin Impact',
    publisher: 'HoYoverse',
    category: 'Mobile',
    imageUrl: '/images/logo-genshin-impact-42378.png',
    packages: [
      { id: 'gi-welkin', name: 'Blessing of the Welkin Moon', price: 79000, bonus: '2700', promo: 'Wajib Beli 🔥' },
      { id: 'gi-60', name: '60 Genesis Crystals', price: 16000, bonus: null, promo: null },
      { id: 'gi-300', name: '300 Genesis Crystals', price: 79000, bonus: '30', promo: null },
      { id: 'gi-980', name: '980 Genesis Crystals', price: 249000, bonus: '110', promo: 'Diskon' },
      { id: 'gi-1980', name: '1980 Genesis Crystals', price: 479000, bonus: '260', promo: null },
      { id: 'gi-3280', name: '3280 Genesis Crystals', price: 799000, bonus: '600', promo: 'Populer' },
      { id: 'gi-6480', name: '6480 Genesis Crystals', price: 1599000, bonus: '1600', promo: 'Sultan' }
    ]
  },
  {
    id: 'g4',
    name: 'PUBG Mobile',
    publisher: 'Tencent Games',
    category: 'Mobile',
    imageUrl: '/images/pubg-10166.png',
    packages: [
      { id: 'pubg-rp', name: 'Royale Pass Upgrade', price: 150000, bonus: null, promo: 'Seasonal 🌟' },
      { id: 'pubg-60', name: '60 Unknown Cash', price: 14000, bonus: null, promo: null },
      { id: 'pubg-325', name: '325 Unknown Cash', price: 70000, bonus: '25', promo: null },
      { id: 'pubg-660', name: '660 Unknown Cash', price: 140000, bonus: '60', promo: 'Terlaris 🔥' },
      { id: 'pubg-1800', name: '1800 Unknown Cash', price: 350000, bonus: '200', promo: null },
      { id: 'pubg-3850', name: '3850 Unknown Cash', price: 700000, bonus: '450', promo: 'Hemat' },
      { id: 'pubg-8100', name: '8100 Unknown Cash', price: 1400000, bonus: '1000', promo: 'Super Sultan' }
    ]
  },
  {
    id: 'g5',
    name: 'Free Fire',
    publisher: 'Garena',
    category: 'Mobile',
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80',
    packages: [
      { id: 'ff-mgg', name: 'Membership Mingguan', price: 33000, bonus: '450', promo: 'Untung 🔥' },
      { id: 'ff-bln', name: 'Membership Bulanan', price: 149000, bonus: '2600', promo: 'Super Hemat' },
      { id: 'ff-50', name: '50 Diamonds', price: 8000, bonus: null, promo: null },
      { id: 'ff-140', name: '140 Diamonds', price: 20000, bonus: null, promo: null },
      { id: 'ff-355', name: '355 Diamonds', price: 50000, bonus: '35', promo: 'Populer' },
      { id: 'ff-720', name: '720 Diamonds', price: 100000, bonus: '75', promo: null },
      { id: 'ff-1440', name: '1440 Diamonds', price: 200000, bonus: '160', promo: null },
      { id: 'ff-7310', name: '7310 Diamonds', price: 1000000, bonus: '900', promo: 'Sultan Pack' }
    ]
  }
];

/**
 * Data Access Object (DAO) service layer.
 * Simulates asynchronous network latency using promises.
 */
export const gameService = {
  getGames: async (): Promise<Game[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_GAMES), 300);
    });
  },

  getGameById: async (id: string): Promise<Game | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const game = MOCK_GAMES.find((g) => g.id === id);
        resolve(game);
      }, 150);
    });
  },

  // Tambahkan fungsi ini agar Home.tsx tidak error
  getPopularGames: async (): Promise<Game[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mengambil 3 game pertama sebagai simulasi "Game Terpopuler"
        resolve(MOCK_GAMES.slice(0, 3)); 
      }, 200);
    });
  },
};