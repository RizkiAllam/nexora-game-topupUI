import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, useWatch } from 'react-hook-form'; // Import useWatch
import { zodResolver } from '@hookform/resolvers/zod';
import { ShieldCheck, CreditCard, Gem, CheckCircle2, QrCode, Building2, Wallet } from 'lucide-react';
import { gameService } from '@/services/api';
import { Game } from '@/types/game';
import { useTransactionStore } from '@/store/useTransactionStore';
import { checkoutSchema, type CheckoutFormValues } from '@/features/checkout/checkoutSchema';
import { ROUTES } from '@/constants/config';
import { Button } from '@/components/ui/Button';
import { cn } from '@/utils/cn';

// Definisikan Interface yang jelas untuk menggantikan <any>
interface InvoiceData {
  trxId: string;
  gameName: string;
  playerName: string;
  userId: string;
  serverId: string;
  amount: number;
  packageName: string;
  paymentMethod: string;
  timestamp: number;
}

export const Checkout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const addTransaction = useTransactionStore((state) => state.addTransaction);
  
  const [game, setGame] = useState<Game | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [packageError, setPackageError] = useState(false);
  
  const [showInvoice, setShowInvoice] = useState(false);
  // Menggunakan Interface InvoiceData, bukan any
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  // Hapus 'watch' dari destructuring useForm
  const { register, handleSubmit, formState: { errors }, control } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
  });

  // Gunakan useWatch untuk membaca nilai form secara reaktif dan aman
  const selectedMethod = useWatch({
    control,
    name: 'paymentMethod',
  });

  useEffect(() => {
    const fetchGame = async () => {
      try {
        if (id) {
          const data = await gameService.getGameById(id);
          setGame(data || null);
        }
      } catch (error) {
        console.error('Failed to fetch game details:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGame();
  }, [id]);

  const onSubmit = (data: CheckoutFormValues) => {
    if (!selectedPackage) {
      setPackageError(true);
      return;
    }

    const pkg = game?.packages.find(p => p.id === selectedPackage);
    
    if (game && pkg) {
      setIsVerifying(true);
      
      setTimeout(() => {
        setIsVerifying(false);
        const currentTime = new Date().getTime(); 
        
        setInvoiceData({
          trxId: `TRX-${currentTime}`,
          gameName: game.name,
          playerName: `Rizki_Player_${data.userId.substring(0, 3)}`,
          userId: data.userId,
          serverId: data.serverId,
          amount: pkg.price,
          packageName: pkg.name,
          paymentMethod: data.paymentMethod,
          timestamp: currentTime,
        });
        
        setShowInvoice(true);
      }, 1500);
    }
  };

// Jika user memilih "Bayar Nanti"
  const handlePaymentLater = () => {
    if (invoiceData && game) {
      addTransaction({
        id: invoiceData.trxId, // Kita pasangkan trxId ke id agar TypeScript senang
        gameId: game.id,
        gameName: invoiceData.gameName,
        userId: invoiceData.userId,
        serverId: invoiceData.serverId,
        amount: invoiceData.amount,
        paymentMethod: invoiceData.paymentMethod,
        timestamp: invoiceData.timestamp,
        status: 'pending',
      });
      navigate(ROUTES.HISTORY);
    }
  };

  // Jika user sudah bayar langsung
  const handleConfirmPayment = () => {
    if (invoiceData && game) {
      addTransaction({
        id: invoiceData.trxId, // Kita pasangkan trxId ke id
        gameId: game.id,
        gameName: invoiceData.gameName,
        userId: invoiceData.userId,
        serverId: invoiceData.serverId,
        amount: invoiceData.amount,
        paymentMethod: invoiceData.paymentMethod,
        timestamp: invoiceData.timestamp,
        status: 'success',
      });
      navigate(ROUTES.HISTORY);
    }
  };

  if (isLoading) return <div className="animate-pulse h-96 glass-panel rounded-2xl" />;
  if (!game) return <div className="glass-panel p-12 text-center rounded-2xl">Game tidak ditemukan</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12 relative">
      
      {/* Header Game Info */}
      <div className="glass-panel p-6 rounded-2xl flex flex-col sm:flex-row items-center gap-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-50" />
        <img src={game.imageUrl} alt={game.name} className="w-32 h-32 rounded-xl object-cover shadow-premium relative z-10" />
        <div className="relative z-10 text-center sm:text-left">
          <h1 className="text-2xl font-bold text-text-primary">{game.name}</h1>
          <p className="text-primary font-medium mt-1">{game.publisher}</p>
          <div className="flex items-center justify-center sm:justify-start gap-2 mt-3 text-sm text-text-secondary">
            <ShieldCheck className="w-4 h-4 text-green-400" />
            <span>Transaksi Aman & Terverifikasi</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* 1. Player Info Form */}
        <section className="glass-panel p-6 sm:p-8 rounded-2xl space-y-6">
          <div className="flex items-center gap-3 border-b border-white/5 pb-4">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">1</div>
            <h2 className="text-lg font-bold text-text-primary">Masukkan Data Akun</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-secondary">User ID</label>
              <input {...register('userId')} placeholder="Contoh: 12345678" className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-sm text-text-primary focus:border-primary outline-none transition-all" />
              {errors.userId && <span className="text-red-400 text-xs">{errors.userId.message}</span>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-secondary">Server ID</label>
              <input {...register('serverId')} placeholder="Contoh: 2012" className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-sm text-text-primary focus:border-primary outline-none transition-all" />
              {errors.serverId && <span className="text-red-400 text-xs">{errors.serverId.message}</span>}
            </div>
          </div>
        </section>

        {/* 2. Select Package (GRID DINAMIS) */}
        <section className="glass-panel p-6 sm:p-8 rounded-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">2</div>
              <h2 className="text-lg font-bold text-text-primary">Pilih Nominal</h2>
            </div>
            {packageError && <span className="text-red-400 text-sm font-medium animate-pulse">Pilih paket terlebih dahulu!</span>}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {game?.packages?.map((pkg) => {
              const isSelected = selectedPackage === pkg.id;
              return (
                <button
                  key={pkg.id}
                  type="button"
                  onClick={() => { setSelectedPackage(pkg.id); setPackageError(false); }}
                  className={cn(
                    "relative text-left p-4 rounded-xl border transition-all duration-200 overflow-hidden group",
                    isSelected ? "border-primary bg-primary/10 shadow-[0_0_15px_rgba(255,204,0,0.2)]" : "border-white/10 bg-background/50 hover:border-white/30 hover:bg-white/5"
                  )}
                >
                  {pkg.promo && <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg z-10">{pkg.promo}</div>}
                  <div className="flex flex-col space-y-3 relative z-10">
                    <div className="flex justify-between items-start">
                      <Gem className={cn("w-6 h-6", isSelected ? "text-primary" : "text-text-secondary")} />
                      {isSelected && <CheckCircle2 className="w-5 h-5 text-primary" />}
                    </div>
                    <div>
                      <h3 className={cn("font-bold", isSelected ? "text-primary" : "text-text-primary")}>{pkg.name}</h3>
                      {pkg.bonus && <p className="text-xs text-text-secondary mt-0.5">Bonus +{pkg.bonus}</p>}
                    </div>
                    <div className="pt-2 border-t border-white/10">
                      <p className="font-semibold text-sm">Rp {pkg.price.toLocaleString('id-ID')}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* 3. Payment Method */}
        <section className="glass-panel p-6 sm:p-8 rounded-2xl space-y-6">
          <div className="flex items-center gap-3 border-b border-white/5 pb-4">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">3</div>
            <h2 className="text-lg font-bold text-text-primary">Metode Pembayaran</h2>
          </div>
          
          <div className="space-y-4">
            {['Qris', 'E-Wallet (GoPay/OVO/Dana)', 'Bank Transfer (BCA/Mandiri)'].map((method) => (
              <label key={method} className={cn("flex items-center p-4 border rounded-xl cursor-pointer transition-colors", selectedMethod === method ? "border-primary bg-primary/5" : "border-white/10 hover:bg-white/5")}>
                <input type="radio" value={method} {...register('paymentMethod')} className="w-4 h-4 text-primary bg-surface border-white/10 focus:ring-primary focus:ring-2" />
                <span className="ml-3 text-text-primary flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-text-secondary" />
                  {method}
                </span>
              </label>
            ))}
            {errors.paymentMethod && <span className="text-red-400 text-xs block">{errors.paymentMethod.message}</span>}
          </div>
        </section>

        {/* Submit Button */}
        <Button type="submit" size="lg" className="w-full text-lg shadow-premium" disabled={isVerifying}>
          {isVerifying ? 'Memeriksa ID Akun...' : 'Beli Sekarang'}
        </Button>
      </form>

      {/* --- MODAL STRUK PEMBAYARAN --- */}
      {showInvoice && invoiceData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in">
          <div className="glass-panel w-full max-w-md rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            {/* Header Struk */}
            <div className="bg-gradient-to-r from-primary to-secondary p-4 text-center">
              <h3 className="text-xl font-bold text-surface">Instruksi Pembayaran</h3>
              <p className="text-surface/80 text-sm">{invoiceData.trxId}</p>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Info Player Dinamis */}
              <div className="bg-background/50 p-4 rounded-xl border border-white/5 text-center">
                <p className="text-sm text-text-secondary">Detail Akun Ditemukan:</p>
                <p className="text-lg font-bold text-primary mt-1">{invoiceData.playerName}</p>
                <p className="text-xs text-text-secondary">{invoiceData.userId} ({invoiceData.serverId}) - {invoiceData.gameName}</p>
              </div>

              {/* Dinamis Instruksi Pembayaran (QRIS / Bank / E-Wallet) */}
              <div className="flex flex-col items-center justify-center space-y-4 py-4 border-y border-white/5">
                {invoiceData.paymentMethod === 'Qris' ? (
                  <>
                    <QrCode className="w-8 h-8 text-primary" />
                    <p className="text-sm text-text-secondary">Scan QR Code di bawah ini</p>
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=NEXORA_${invoiceData.trxId}&color=ffffff&bgcolor=1a1a1a`} 
                      alt="QRIS" 
                      className="rounded-lg border-4 border-white/10 w-40 h-40"
                    />
                  </>
                ) : invoiceData.paymentMethod.includes('Bank') ? (
                  <>
                    <Building2 className="w-8 h-8 text-primary" />
                    <p className="text-sm text-text-secondary">Transfer ke Virtual Account:</p>
                    <div className="bg-surface px-6 py-3 rounded-lg border border-primary/30">
                      <p className="text-2xl font-mono font-bold tracking-wider text-text-primary">
                        8801 {invoiceData.userId.substring(0, 4)} 1234
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <Wallet className="w-8 h-8 text-primary" />
                    <p className="text-sm text-text-secondary">Lanjutkan ke aplikasi E-Wallet Anda</p>
                    <p className="text-sm font-medium text-text-primary text-center">
                      Notifikasi pembayaran telah dikirim ke nomor yang terhubung.
                    </p>
                  </>
                )}
              </div>

              {/* Total Harga */}
              <div className="flex justify-between items-center text-lg">
                <span className="text-text-secondary">Total Bayar:</span>
                <span className="font-bold text-primary">Rp {invoiceData.amount.toLocaleString('id-ID')}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="w-full" onClick={handlePaymentLater}>
                  Bayar Nanti
                </Button>
                <Button className="w-full" onClick={handleConfirmPayment}>
                  Saya Sudah Bayar
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};