import { Router } from "express";
import TurmaController from "../controllers/turmaController.js";
import AuthMiddleware from "../middlewares/authMiddleware.js";
import ApoioMiddleware from "../middlewares/apoioMiddleware.js";

const router = Router();

router.post(
    "/cadastrar",
    AuthMiddleware.validarToken,
    ApoioMiddleware.validarPerfil,
    TurmaController.cadastrar
);

export default router;
