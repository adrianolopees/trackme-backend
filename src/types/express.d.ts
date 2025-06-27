import "express-serve-static-core";

// Extendendo o Request para adicionar user
declare module "express-serve-static-core" {
  interface Request {
    profile?: { id: number };
  }
}
