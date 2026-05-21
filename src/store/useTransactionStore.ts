import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Transaction {
  id: string;
  gameId: string;
  gameName: string;
  userId: string;
  serverId: string;
  amount: number;
  paymentMethod: string;
  status: 'pending' | 'success' | 'failed';
  timestamp: number;
}

interface TransactionState {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  updateTransactionStatus: (id: string, status: Transaction['status']) => void; // Fungsi baru
}

export const useTransactionStore = create<TransactionState>()(
  persist(
    (set) => ({
      transactions: [],
      addTransaction: (transaction) => 
        set((state) => ({ transactions: [transaction, ...state.transactions] })),
      // Logika untuk memperbarui status berdasarkan ID transaksi
      updateTransactionStatus: (id, status) =>
        set((state) => ({
          transactions: state.transactions.map((trx) =>
            trx.id === id ? { ...trx, status } : trx
          ),
        })),
    }),
    { name: 'nexora-transactions' }
  )
);