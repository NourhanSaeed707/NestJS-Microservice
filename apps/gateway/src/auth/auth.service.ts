import { createClerkClient, verifyToken } from '@clerk/backend';
import { Injectable } from '@nestjs/common';
import { UserContext } from './auth.types.js';

@Injectable()
export class AuthService {
  private readonly clerk = createClerkClient({
    secretKey: process.env.CLERK_SECRET_KEY || '',
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY || '',
  });

  private jwtVerifyOptions(): Record<string, any> {
    return {
      secretKey: process.env.CLERK_SECRET_KEY || '',
    };
  }

  async verifyAndBuildContext(token: string): Promise<UserContext | null> {
    try{
      const verified: any = await verifyToken(token, this.jwtVerifyOptions());
      // decoded payload
      const payload = verified.payload ?? verified?.payload ?? verified;
      // clerk user id -> payload.sub
      const clerkUserId = payload?.sub ?? payload?.userId;
      if(!clerkUserId) {
        throw new Error('Clerk user ID not found in token payload');
      }
    }
    catch (error) {
      console.error('Error verifying token:', error);
    }

  }
}
