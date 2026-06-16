import { z } from 'zod';

export const createGoalSchema = z.object({
  name: z.string().trim().min(1, 'Goal name is required'),
  amount: z.coerce.number().gt(0, 'Amount must be greater than zero'),
  deadline: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val || val.trim() === '') return true;
        const date = new Date(val);
        if (isNaN(date.getTime())) return false;
        return date > new Date();
      },
      { message: 'Deadline must be a future date' }
    ),
});

export type CreateGoalFormData = z.infer<typeof createGoalSchema>;
