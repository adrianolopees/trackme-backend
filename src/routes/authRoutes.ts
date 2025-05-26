import express from "express";
import { register, login } from "../controllers/authController";

const router = express.Router();

router.post("/register", async (req, res, next) => {
  try {
    await register(req, res);
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    await login(req, res);
  } catch (err) {
    next(err);
  }
});

export default router;
