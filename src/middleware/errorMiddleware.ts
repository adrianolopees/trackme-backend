import { Request, Response, NextFunction } from "express";

export interface AppError extends Error {
  statusCode?: number;
  status?: string;
  isOperational?: boolean;
}

export const errorHandler = (
  error: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error("Error occurred:", {
    message: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString(),
  });

  // Erro operacional conhecido
  if (error.isOperational) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
      ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
    });
    return;
  }

  // Erro específico do Sequelize
  if (error.name === "SequelizeValidationError") {
    res.status(400).json({
      success: false,
      message: "Erro de validação do banco de dados",
      errors: error.message,
    });
    return;
  }

  // Erro de perfil não encontrado
  if (error.message.includes("Perfil não encontrado")) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
    return;
  }

  // Erro genérico - não expor detalhes em produção
  res.status(500).json({
    success: false,
    message:
      process.env.NODE_ENV === "production"
        ? "Erro interno do servidor"
        : error.message,
    ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
  });
};

// Factory para criar erros operacionais
export const createAppError = (
  message: string,
  statusCode: number
): AppError => {
  const error = new Error(message) as AppError;
  error.statusCode = statusCode;
  error.isOperational = true;
  return error;
};
