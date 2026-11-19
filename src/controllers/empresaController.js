import EmpresaService from "../services/empresaService";

class EmpresaController {
    static async completarPerfil(req, res) {
        try {
            const requisicao = await
            EmpresaService.completarPerfil(req.body);
            return res.status(201).json({
                mensagem: `Cadastro realizado com sucesso ${requisicao}`
            });
        }
        catch(error) {
            return res.status(400).json({mensagem: `Falha ao cadastrar ${error}`});
        }
    }
} 
export default EmpresaController;