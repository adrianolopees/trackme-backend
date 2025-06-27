import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/jwtConfig";

interface JwtPayload {
  id: number;
  iat: number;
  exp: number;
}

// Extendendo o Request para adicionar user
declare module "express-serve-static-core" {
  interface Request {
    user?: { id: number };
  }
}

export const authMiddleware: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Token não fornecido" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET!) as JwtPayload;

    req.user = { id: decoded.id };

    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido ou expirado" });
    return;
  }
};
