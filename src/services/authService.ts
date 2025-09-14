import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/jwtConfig";
import { JwtPayload } from "../types/jwt";
import {
  LoginData,
  RegisterData,
  AuthData,
  TokenData,
} from "../schemas/authSchemas";
import { authRepository } from "../repositories/authRepository";
import { profileRepository } from "../repositories/profileRepository";
import { createAppError } from "../middleware/errorHandler";
import { toSafeProfile } from "../utils/toSafeProfile";

export const authService = {
  async register(data: RegisterData): Promise<AuthData> {
    const existingProfile = await authRepository.findByEmailOrUsername(
      data.email,
      data.username
    );

    if (existingProfile) {
      throw createAppError("Dados de cadastro inválidos", 400);
    }

    const hashedPassword = await this.hashPassword(data.password);
    const newProfile = await profileRepository.create({
      ...data,
      password: hashedPassword,
    });

    const token = this.generateToken({
      id: String(newProfile.id),
      username: newProfile.username,
      email: newProfile.email,
    });

    return {
      token,
      profile: toSafeProfile(newProfile),
    };
  },

  async login(data: LoginData): Promise<TokenData> {
    const profile = await authRepository.findByIdentifier(data.identifier);

    if (!profile) {
      throw createAppError("Credenciais inválidas!");
    }

    const isPasswordValid = await this.comparePassword(
      data.password,
      profile.password
    );
    if (!isPasswordValid) {
      throw createAppError("Credenciais inválidas!");
    }

    const token = this.generateToken({
      id: String(profile.id),
      username: profile.username,
      email: profile.email,
    });
    return {
      token,
    };
  },

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 12;
    return bcrypt.hash(password, saltRounds);
  },

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  },

  generateToken(payload: JwtPayload): string {
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET não está configurado");
    }
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
  },
};
