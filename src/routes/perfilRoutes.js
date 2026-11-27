import { Router } from "express";
import EmpresaController from "../controllers/empresaController.js";
import RecrutadorController from "../controllers/recrutadorController.js";
import AuthMiddleware from "../middlewares/authMiddleware.js";
import EmpresaMiddleware from "../middlewares/empresaMiddleware.js";
import AdministradorMiddleware from "../middlewares/administradorMiddleware.js";

const router = Router();

router.post(
    "/cadastrar/empresa",
    AuthMiddleware.validarToken,
    EmpresaMiddleware.validarPerfil,
    EmpresaController.completarPerfil
);

router.post(
    "/cadastrar/recrutador",
    AuthMiddleware.validarToken,
    EmpresaMiddleware.validarPerfil,
    RecrutadorController.completarPerfil
);

export default router;
