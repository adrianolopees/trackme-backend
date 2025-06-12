import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { registerSchema } from "../validators/userValidator";
import { loginSchema } from "../validators/userValidator";
import { JWT_SECRET } from "../config/jwtConfig";
import User from "../models/User"; // Adjust the import path as necessary
import { Op } from "sequelize";

export const register = async (req: Request, res: Response) => {
  const validation = registerSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({
      message: "Dados inválidos",
      errors: validation.error.format(),
    });
  }

  const { username, email, name, password, profilePicture } = req.body;

  try {
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ username }, { email }],
      },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Usuário ou email já existe!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

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

export const login = async (req: Request, res: Response) => {
  const validation = loginSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({
      message: "Dados inválidos!",
      error: validation.error.format(),
    });
  }

  const { identifier, password } = req.body;

  try {
    const isEmail = identifier.includes("@");

    const user = await User.findOne({
      where: isEmail ? { email: identifier } : { username: identifier },
    });

    if (!user) {
      return res.status(400).json({ message: "Usuário não encontrado!" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Senha inválida!" });
    }

    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
      JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    return res.json({
      message: "Login bem-sucedido!",
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Erro no servidor", error: error.message });
  }
};
