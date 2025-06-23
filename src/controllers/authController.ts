import { Request, Response } from "express";
import { registerSchema, loginSchema } from "../validators/userValidator";
import { Op } from "sequelize";
import { AuthService } from "../services/authService";
import { Profile } from "../models/Profile";

export const register = async (req: Request, res: Response): Promise<void> => {
  const validation = registerSchema.safeParse(req.body);
  if (!validation.success) {
    res.status(400).json({
      message: "Dados inválidos",
      errors: validation.error.format(),
    });
    return;
  }

  const { username, email, password, name } = req.body;

  try {
    const existingUser = await Profile.findOne({
      where: {
        [Op.or]: [{ username }, { email }],
      },
    });

    if (existingUser) {
      res.status(400).json({ message: "Usuário ou email já existe!" });
      return;
    }

    const hashedPassword = await AuthService.hashPassword(password);

    const newUser = await Profile.create({
      username,
      email,
      password: hashedPassword,
      name,
      bio: req.body.bio || null,
      avatar: req.body.avatar || null,
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

export const login = async (req: Request, res: Response): Promise<void> => {
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

    const profile = await Profile.findOne({
      where: isEmail ? { email: identifier } : { username: identifier },
    });

    if (!profile) {
      res.status(401).json({ message: "Credenciais inválidas!" });
      return;
    }

    const isPasswordValid = await AuthService.comparePassword(
      password,
      profile.password
    );
    if (!isPasswordValid) {
      res.status(401).json({ message: "Credenciais inválidas!" });
      return;
    }

    const token = AuthService.generateToken({
      id: profile.id,
      username: profile.username,
    });

    res.json({
      message: "Login bem-sucedido!",
      token,
      user: {
        id: profile.id,
        email: profile.email,
        username: profile.username,
      },
    });
  } catch (error: any) {
    res.status(500).json({ message: "Erro no servidor", error: error.message });
  }
};
