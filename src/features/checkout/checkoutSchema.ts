import { z } from 'zod';

export const checkoutSchema = z.object({
  userId: z.string().min(1, 'User ID wajib diisi').max(20, 'Format User ID tidak valid'),
  serverId: z.string().min(1, 'Server ID wajib diisi'),
  // Gunakan .min() sebagai pengganti required_error
  paymentMethod: z.string().min(1, 'Pilih metode pembayaran terlebih dahulu'), 
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;