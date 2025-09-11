import { Response } from "express";

export const sendSuccess = <T>(
  res: Response,
  data: T,
  message: string = "Sucesso"
) => {
  return res.status(200).json({
    success: true,
    data,
    message,
  });
};

export const sendCreated = <T>(
  res: Response,
  data: T,
  message: string = "Criado com sucesso"
) => {
  return res.status(201).json({
    success: true,
    data,
    message,
  });
};

export const sendError = (
  res: Response,
  message: string,
  statusCode: number = 400,
  errors?: any
) => {
  return res.status(statusCode).json({
    success: false,
    message,
    ...(errors && { errors }),
  });
};
