import { z } from 'zod';

/** Example only — replace with real domain schemas in future features. */
export const exampleNicknameSchema = z.object({
  nickname: z.string().min(1, 'Enter a nickname').max(40),
});

export type ExampleNickname = z.infer<typeof exampleNicknameSchema>;

// With React Hook Form: zodResolver(exampleNicknameSchema) from @hookform/resolvers/zod
