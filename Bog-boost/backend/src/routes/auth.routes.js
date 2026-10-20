import { Router } from "express";

import authMiddleware from "../middlewares/auth.js";

import {
  register,
  login,
  logout,
  me,
  recuperarPassword,
  cambiarPassword
}
  from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", authMiddleware, logout);
router.get("/me", authMiddleware, me);
router.post("/recuperar-password", recuperarPassword);
router.put("/cambiar-password", cambiarPassword);

export default router;