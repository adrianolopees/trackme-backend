import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";
import { Profile } from "../models/Profile";
import { JWT_SECRET } from "../config/jwtConfig";
import { LoginData, RegisterData } from "../validators/profileValidator";
import { AuthResponse, SafeProfile } from "../types/profile";

export class AuthService {
  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 12;
    return bcrypt.hash(password, saltRounds);
  }

  private async comparePassword(
    password: string,
    hash: string
  ): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  private generateToken(payload: {
    id: number;
    username: string;
    email: string;
  }): string {
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET não está configurado");
    }

    return jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
  }

  private isEmail(identifier: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(identifier);
  }

  /**
   * Registra um novo usuário
   * @param data - Dados validados para registro
   * @returns Promise<AuthResponse> - Perfil criado sem senha e autenticação
   */
  async register(data: RegisterData): Promise<AuthResponse> {
    const existingProfile = await Profile.findOne({
      where: {
        [Op.or]: [{ username: data.username }, { email: data.email }],
      },
    });

    if (existingProfile) {
      throw new Error("Usuário ou email já existe!");
    }

    const hashedPassword = await this.hashPassword(data.password);
    const newProfile = await Profile.create({
      username: data.username,
      email: data.email,
      name: data.name ?? undefined,
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
      },
    };
  }

  /**
   * Realiza login do usuário
   * @param loginData - Dados validados para login
   * @returns Promise<AuthResponse> - Token e perfil do usuário
   */
  async login({ identifier, password }: LoginData): Promise<AuthResponse> {
    const isEmail = this.isEmail(identifier);

    const profile = await Profile.findOne({
      where: isEmail ? { email: identifier } : { username: identifier },
    });

    if (!profile) {
      throw new Error("Credenciais inválidas!");
    }

    const isPasswordValid = await this.comparePassword(
      password,
      profile.password
    );

    if (!isPasswordValid) {
      throw new Error("Credenciais inválidas!");
    }

    const token = this.generateToken({
      id: profile.id,
      username: profile.username,
      email: profile.email,
    });

    return {
      token,
      profile: {
        id: profile.id,
        email: profile.email,
        username: profile.username,
        name: profile.name,
        bio: profile.bio,
        avatar: profile.avatar,
      },
    };
  }
}
