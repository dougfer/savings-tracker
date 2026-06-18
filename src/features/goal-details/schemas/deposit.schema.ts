import { z } from 'zod';

export const depositSchema = z.object({
  amount: z.coerce.number().gt(0, 'Amount must be greater than zero'),
  description: z.string().optional(),
});

export type DepositFormValues = z.infer<typeof depositSchema>;
