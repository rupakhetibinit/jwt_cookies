import { JwtPayload } from 'jsonwebtoken';
declare global {
	declare namespace Express {
		interface Locals {
			user: {
				email: string | JwtPayload;
			};
		}
	}
}
