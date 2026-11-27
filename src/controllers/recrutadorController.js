import RecrutadorService from "../services/recrutadorService.js";

class RecrutadorController {
    static async completarPerfil(req, res) {
        try {
            const requisicao = await RecrutadorService.completarPerfil(
                req.usuario.id,
                req.body
            );

            return res.status(201).json({
                mensagem: `Perfil de recrutador cadastrado com sucesso`,
                recrutador: requisicao
            });
        }
        catch (error) {
            return res.status(400).json({
                mensagem: `Falha ao cadastrar recrutador: ${error.message}`
            });
        }
    }
}

export default RecrutadorController;
