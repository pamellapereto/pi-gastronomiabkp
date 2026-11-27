import { Router } from "express";
import CursoController from "../controllers/cursoController.js";
import AuthMiddleware from "../middlewares/authMiddleware.js";
import ApoioMiddleware from "../middlewares/apoioMiddleware.js";

const router = Router();

router.post(
    "/cadastrar",
    AuthMiddleware.validarToken,
    ApoioMiddleware.validarPerfil,
    CursoController.cadastrar
);

export default router;
