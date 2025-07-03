import multer from "multer";

export const upload = multer({
  storage: multer.memoryStorage(), // Armazena o arquivo na memória
}); // 'avatar' é o nome do campo no formulário
