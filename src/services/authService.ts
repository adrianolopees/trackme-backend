import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/jwtConfig";
import { LoginData, RegisterData } from "../schemas/authSchemas";
import { AuthResponse, TokenResponse } from "../schemas/authSchemas";
import { profileRepository } from "../repositories/profileRepository";
import { createAppError } from "../middleware/errorHandler";

export const authService = {
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
      profile: {
        id: newProfile.id,
        username: newProfile.username,
        email: newProfile.email,
        name: newProfile.name,
        profileSetupDone: newProfile.profileSetupDone,
        createdAt: newProfile.createdAt,
        updatedAt: newProfile.updatedAt,
      },
    };
  },

  async login({ identifier, password }: LoginData): Promise<TokenResponse> {
    const profile = await profileRepository.findByIdentifier(identifier);

    if (!profile) {
      throw createAppError("Credenciais inválidas!", 401);
    }

    const isPasswordValid = await this.comparePassword(
      password,
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
};
