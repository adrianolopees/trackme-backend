// File: src/types/jwt.d.ts
// This file defines the structure of the JWT payload used in the application.
export interface JwtPayload {
  id: number;
  username: string;
  email: string;
  iat: number;
  exp: number;
}
