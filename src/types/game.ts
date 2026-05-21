export interface TopUpPackage {
  id: string;
  name: string;
  price: number;
  bonus: string | null;
  promo: string | null;
}

export interface Game {
  id: string;
  name: string;
  publisher: string;
  category: 'Mobile' | 'PC';
  imageUrl: string;
  isPopular?: boolean; 
  packages: TopUpPackage[];
}