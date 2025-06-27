import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";
import { Profile } from "../models/Profile";
import { JWT_SECRET } from "../config/jwtConfig";
import { LoginData, RegisterData } from "../validators/profileValidator";

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

  // Lógica de registro de usuário
  static async register(data: RegisterData) {
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
      bio: data.bio ?? undefined,
      avatar: data.avatar ?? undefined,
      password: hashedPassword,
    });

    return {
      id: newProfile.id,
      username: newProfile.username,
      email: newProfile.email,
      name: newProfile.name,
      bio: newProfile.bio,
      avatar: newProfile.avatar,
    };
  }

  //  Lógica de login de usuário
  static async login({ identifier, password }: LoginData) {
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
      profile: {
        id: profile.id,
        email: profile.email,
        username: profile.username,
      },
    };
  }
}
