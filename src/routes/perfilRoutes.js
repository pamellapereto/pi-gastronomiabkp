import { Router } from "express";
import EmpresaController from "../controllers/empresaController.js";
import AuthMiddleware from "../middlewares/authMiddleware.js";


const router = Router();

router.post("/cadastrar/empresa", 
    AuthMiddleware.validarToken,
    EmpresaController.completarPerfil
);
// router.post("/cadastrar/recrutador",
        //AuthMiddleware.validarToken,
//     RecrutadorController.completarPerfil
// );
// router.post("/cadastrar/candidato",
        //AuthMiddleware.validarToken,
//     CandidatoController.completarPerfil
// );
// router.post("/cadastrar/administrador",
        //AuthMiddleware.validarToken,
//     AdministradorController.completarPerfil
// );
export default router;