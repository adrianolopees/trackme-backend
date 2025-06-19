import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "../config/jwtConfig";

interface CustomRequest extends Request {
  user?: string | JwtPayload; // pode ser o payload decodificado do token
}

const authenticateToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  // token deve vir no formato: "Bearer <token>"
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Token não fornecido" });
    return;
  }

  if (!JWT_SECRET) {
    res
      .status(500)
      .json({ message: "JWT_SECRET não está definido no ambiente" });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // armazena os dados do token na req
    next(); // segue a proxima etapa (rota protegida)
  } catch (error) {
    res.status(403).json({ message: "Token inválido ou expirado!" });
    return;
  }
};

export default authenticateToken;
