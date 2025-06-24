import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";
import { Profile } from "../models/Profile";
import { JWT_SECRET } from "../config/jwtConfig";

export class AuthService {
  static async hashPassword(password: string): Promise<string> {
    const saltRounds = 12;
    return bcrypt.hash(password, saltRounds);
  }

  static async comparePassword(
    password: string,
    hash: string
  ): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  static generateToken(payload: {
    id: number;
    username: string;
    email: string;
  }): string {
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET não está configurado");
    }

    return jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
  }

  static isEmail(identifier: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(identifier);
  }

  // 🚀 Mover para cá a lógica de criação
  static async register(data: {
    username: string;
    email: string;
    password: string;
    name: string;
    bio?: string;
    avatar?: Buffer | null;
  }) {
    const existingProfile = await Profile.findOne({
      where: {
        [Op.or]: [{ username: data.username }, { email: data.email }],
      },
    });

    if (existingProfile) {
      throw new Error("Usuário ou email já existe!");
    }

    const hashedPassword = await AuthService.hashPassword(data.password);

    const newProfile = await Profile.create({
      ...data,
      password: hashedPassword,
      avatar: data.avatar ?? undefined,
    });

    return {
      id: newProfile.id,
      username: newProfile.username,
      email: newProfile.email,
    };
  }

  // 🚀 Mover para cá a lógica do login
  static async login(identifier: string, password: string) {
    const isEmail = AuthService.isEmail(identifier);

    const profile = await Profile.findOne({
      where: isEmail ? { email: identifier } : { username: identifier },
    });

    if (!profile) {
      throw new Error("Credenciais inválidas!");
    }

    const isPasswordValid = await AuthService.comparePassword(
      password,
      profile.password
    );
    if (!isPasswordValid) {
      throw new Error("Credenciais inválidas!");
    }

    const token = AuthService.generateToken({
      id: profile.id,
      username: profile.username,
      email: profile.email,
    });

    return {
      token,
      user: {
        id: profile.id,
        email: profile.email,
        username: profile.username,
      },
    };
  }
}
