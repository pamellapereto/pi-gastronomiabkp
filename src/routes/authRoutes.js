import { Router } from "express";
import AuthController from
"../controllers/authController.js";

const router = Router();


router.post("/cadastrar", function (req, res) {
    AuthController.cadastrar(req, res)
});



/* 
http://localhost:3000/autenticacao/cadastrar
http://localhost:3000/autenticacao/login

*/
export default router;
