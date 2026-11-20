import { Router } from "express";
import EmpresaController from "../controllers/empresaController.js";

const router = Router();

router.post("/cadastrar/empresa", (req, res) => {
    EmpresaController.completarPerfil(req, res)
});
// router.post("/cadastrar/recrutador", (req, res) => {
//     RecrutadorController.completarPerfil(req, res)
// });
// router.post("/cadastrar/candidato", (req, res) => {
//     CandidatoController.completarPerfil(req, res)
// });
// router.post("/cadastrar/administrador", (req, res) => {
//     AdministradorController.completarPerfil(req, res)
// });
export default router;