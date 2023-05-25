import { z } from 'zod';

export const userInputSchema = z.object({
	email: z
		.string({
			required_error: 'Email is required',
		})
		.email('Email should be a valid email')
		.min(2, 'Email should be at least 2 characters'),
	password: z
		.string({
			required_error: 'Password is required',
		})
		.min(6, 'Password should be at least 6 characters')
		.max(64, 'Password should be at most 64 characters'),
});

export type UserInput = z.infer<typeof userInputSchema>;

export const newAccessTokenInputSchema = z.object({
	refreshToken: z.string(),
});

export type NewAccessTokenInput = z.infer<typeof newAccessTokenInputSchema>;
