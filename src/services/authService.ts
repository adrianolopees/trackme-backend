import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/jwtConfig";

/**
 * Service para operações de autenticação
 */
export class AuthService {
  /**
   * Gera hash da senha
   * @param password - Senha em texto plano
   * @returns Promise com a senha hasheada
   */
  static async hashPassword(password: string): Promise<string> {
    const saltRounds = 12; // Mais seguro que 10
    return bcrypt.hash(password, saltRounds);
  }

  /**
   * Compara senha com hash
   * @param password - Senha em texto plano
   * @param hash - Hash armazenado no banco
   * @returns Promise com resultado da comparação
   */
  static async comparePassword(
    password: string,
    hash: string
  ): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  /**
   * Gera token JWT
   * @param payload - Dados do usuário para o token
   * @returns Token JWT
   */
  static generateToken(payload: { id: number; username: string }): string {
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET não está configurado");
    }

    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: "24h", // 24 horas é mais comum que 1h
    });
  }

  /**
   * Verifica se o identificador é um email
   * @param identifier - String a ser verificada
   * @returns boolean indicando se é email
   */
  static isEmail(identifier: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(identifier);
  }
}
