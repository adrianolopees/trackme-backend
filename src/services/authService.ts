import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/jwtConfig";
import {
  LoginData,
  RegisterData,
  AuthResponse,
  TokenResponse,
} from "../schemas/authSchemas";
import { profileRepository } from "../repositories/profileRepository";
import { createAppError } from "../middleware/errorHandler";
import { toSafeProfile } from "../utils/toSafeProfile";

export const authService = {
  async register(data: RegisterData): Promise<AuthResponse> {
    const existingProfile = await profileRepository.findByEmailOrUsername(
      data.email,
      data.username
    );

    if (existingProfile) {
      throw createAppError("Usuário ou email já existe!", 409);
    }

    const hashedPassword = await this.hashPassword(data.password);
    const newProfile = await profileRepository.create({
      ...data,
      password: hashedPassword,
    });

    const token = this.generateToken({
      id: newProfile.id,
      username: newProfile.username,
      email: newProfile.email,
    });

    return {
      token,
      profile: toSafeProfile(newProfile),
    };
  },

  async login(data: LoginData): Promise<TokenResponse> {
    const profile = await profileRepository.findByIdentifier(data.identifier);

    if (!profile) {
      throw createAppError("Credenciais inválidas!", 401);
    }

    const isPasswordValid = await this.comparePassword(
      data.password,
      profile.password
    );

    if (!isPasswordValid) {
      throw createAppError("Credenciais inválidas!", 401);
    }

    const token = this.generateToken({
      id: profile.id,
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

  generateToken(payload: {
    id: number;
    username: string;
    email: string;
  }): string {
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET não está configurado");
    }

    return jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
  },
};
