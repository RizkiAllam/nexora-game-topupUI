import { useState, useEffect } from 'react';
import { useTransactionStore } from '@/store/useTransactionStore';
import { CheckCircle2, Clock, XCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/utils/cn';

export const History = () => {
  // Panggil juga fungsi updateTransactionStatus dari store
  const { transactions, updateTransactionStatus } = useTransactionStore();
  
  // State palsu untuk memicu re-render agar timer bisa berjalan (opsional tapi bagus)
const [currentTime, setCurrentTime] = useState(new Date().getTime());
  
  useEffect(() => {
    // Update state waktu setiap 1 menit, cara ini sangat aman untuk React
    const timer = setInterval(() => setCurrentTime(new Date().getTime()), 60000); 
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12">
      <header>
        <h1 className="text-2xl font-bold text-text-primary">Riwayat Transaksi</h1>
        <p className="text-text-secondary mt-1">Pantau status top-up dan selesaikan pembayaran Anda di sini.</p>
      </header>

      {transactions.length === 0 ? (
        <div className="glass-panel p-12 text-center rounded-2xl">
          <p className="text-text-secondary">Belum ada riwayat transaksi.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {transactions.map((trx) => {
            // Logika Batas Waktu (Timer 24 Jam)
            const isPending = trx.status === 'pending';
            const deadlineTime = (trx.timestamp || 0) + (24 * 60 * 60 * 1000); // +24 Jam
            const isExpired = currentTime > deadlineTime;
            
            // Jika sudah lewat 24 jam dan masih pending, anggap gagal
            const displayStatus = (isPending && isExpired) ? 'failed' : trx.status;

            return (
              <div key={trx.id} className="glass-panel p-6 rounded-2xl flex flex-col md:flex-row justify-between gap-6">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-primary">{trx.id}</span>
                    <span className="text-text-secondary text-xs px-2 py-0.5 rounded-full border border-white/10 bg-white/5">
                      {trx.timestamp ? new Date(trx.timestamp).toLocaleString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : '-'}
                    </span>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-text-primary text-lg">{trx.gameName || 'Game Tidak Diketahui'}</h3>
                    <div className="text-sm text-text-secondary flex flex-col sm:flex-row gap-x-4 gap-y-1 mt-1">
                      <span>Akun: <strong className="text-white">{trx.userId || '-'}</strong> ({trx.serverId || '-'})</span>
                      <span>Metode: <strong className="text-white">{trx.paymentMethod || '-'}</strong></span>
                    </div>
                  </div>

                  {/* Tampilan Timer & Warning Jika Masih Pending */}
                  {(isPending && !isExpired) && (
                    <div className="flex items-center gap-2 mt-3 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20 w-fit">
                      <AlertCircle className="w-4 h-4 text-yellow-400" />
                      <div className="text-xs">
                        <p className="text-yellow-400 font-medium">Menunggu Pembayaran</p>
                        <p className="text-text-secondary">Batas: {new Date(deadlineTime).toLocaleString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-row md:flex-col items-center md:items-end justify-between gap-3 border-t border-white/5 md:border-t-0 pt-4 md:pt-0">
                  <div className="text-left md:text-right">
                    <p className="text-xs text-text-secondary mb-1">Total Pembayaran</p>
                    <p className="font-bold text-text-primary text-xl">
                      Rp {trx.amount ? trx.amount.toLocaleString('id-ID') : '0'}
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    <div className={cn(
                      "flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-lg border w-fit",
                      displayStatus === 'success' ? "text-green-400 bg-green-400/10 border-green-400/20" :
                      displayStatus === 'pending' ? "text-yellow-400 bg-yellow-400/10 border-yellow-400/20" :
                      "text-red-400 bg-red-400/10 border-red-400/20"
                    )}>
                      {displayStatus === 'success' && <CheckCircle2 className="w-4 h-4" />}
                      {displayStatus === 'pending' && <Clock className="w-4 h-4" />}
                      {displayStatus === 'failed' && <XCircle className="w-4 h-4" />}
                      <span className="capitalize">{displayStatus === 'failed' ? 'Expired / Gagal' : displayStatus}</span>
                    </div>

                    {/* Tombol Lanjutkan Pembayaran (Simulasi mengubah pending jadi success) */}
                    {(isPending && !isExpired) && (
                      <Button 
                        size="sm" 
                        onClick={() => updateTransactionStatus(trx.id, 'success')}
                        className="mt-2 text-xs h-8"
                      >
                        Lunasi Sekarang
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};