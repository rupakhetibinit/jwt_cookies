import { z } from 'zod';

export const userInputSchema = z.object({
	email: z.string(),
	password: z.string(),
});

export type UserInput = z.infer<typeof userInputSchema>;
