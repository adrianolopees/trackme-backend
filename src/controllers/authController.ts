import { Request, Response, NextFunction } from "express";
import { registerSchema, loginSchema } from "../validators/userValidator";
import User from "../models/User";
import { Op } from "sequelize";
import { AuthService } from "../services/authService";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const validation = registerSchema.safeParse(req.body);
  if (!validation.success) {
    res.status(400).json({
      message: "Dados inválidos",
      errors: validation.error.format(),
    });
    return;
  }

  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ username }, { email }],
      },
    });

    if (existingUser) {
      res.status(400).json({ message: "Usuário ou email já existe!" });
      return;
    }

    const hashedPassword = await AuthService.hashPassword(password);

    const newUser = await User.create({
      username,
      email,
      password_hash: hashedPassword,
    });

    res.status(201).json({
      message: "Usuário registrado com sucesso!",
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(500).json({ message: "Erro no servidor", error: errorMessage });
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const validation = loginSchema.safeParse(req.body);

  if (!validation.success) {
    res.status(400).json({
      message: "Dados inválidos!",
      error: validation.error.format(),
    });
    return;
  }

  const { identifier, password } = req.body;

  try {
    const isEmail = AuthService.isEmail(identifier);

    const user = await User.findOne({
      where: isEmail ? { email: identifier } : { username: identifier },
    });

    if (!user) {
      res.status(401).json({ message: "Credenciais inválidas!" });
      return;
    }

    const isPasswordValid = await AuthService.comparePassword(
      password,
      user.password_hash
    );
    if (!isPasswordValid) {
      res.status(401).json({ message: "Credenciais inválidas!" });
      return;
    }

    const token = AuthService.generateToken({
      id: user.id,
      username: user.username,
    });

    res.json({
      message: "Login bem-sucedido!",
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error: any) {
    res.status(500).json({ message: "Erro no servidor", error: error.message });
  }
};
