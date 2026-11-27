import TurmaService from "../services/turmaService.js";

class TurmaController {
    static async cadastrar(req, res) {
        try {
            const requisicao = await TurmaService.cadastrar(
                req.usuario.id,
                req.body
            );

            return res.status(201).json({
                mensagem: `Turma cadastrada com sucesso`,
                turma: requisicao
            });
        }
        catch (error) {
            return res.status(400).json({
                mensagem: `Falha ao cadastrar turma: ${error.message}`
            });
        }
    }
}

export default TurmaController;
