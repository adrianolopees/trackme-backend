import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/jwtConfig";
import { JwtPayload } from "../types/jwt";

export const authMiddleware: RequestHandler = (req, res, next) => {
  console.log("🔍 AuthMiddleware executado");
  console.log("Authorization header:", req.headers.authorization);
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("❌ Token não fornecido");
    res.status(401).json({ message: "Token não fornecido" });
    return;
  }

  const token = authHeader.split(" ")[1];
  console.log("🎯 Token extraído:", token.substring(0, 20) + "...");

  try {
    const decoded = jwt.verify(token, JWT_SECRET!) as JwtPayload;
    console.log("✅ Token decodificado:", decoded);
    req.profile = { id: decoded.id };

    next();
  } catch (error) {
    console.log("❌ Erro ao verificar token:", error);
    res.status(401).json({ message: "Token inválido ou expirado" });
    return;
  }
};
