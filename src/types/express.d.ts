import "express-serve-static-core";

// Extendendo o Request para adicionar profile
declare module "express-serve-static-core" {
  interface Request {
    profile: { id: number };
  }
}
