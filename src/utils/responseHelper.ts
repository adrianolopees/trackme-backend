import { Response } from "express";

export const sendSuccess = (
  res: Response,
  data: any,
  message: string = "Sucesso"
) => {
  return res.status(200).json({
    success: true,
    data,
    message,
  });
};

export const sendCreated = (
  res: Response,
  data: any,
  message: String = "Criado com sucesso"
) => {
  return res.status(201).json({
    success: true,
    data,
    message,
  });
};

export const sendError = (
  res: Response,
  message: String,
  statusCode: number = 400,
  errors?: any
) => {
  return res.status(statusCode).json({
    success: false,
    message,
    ...(errors && { errors }),
  });
};
