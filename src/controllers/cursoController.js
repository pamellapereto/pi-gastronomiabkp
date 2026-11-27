import CursoService from "../services/cursoService.js";

class CursoController {
    static async cadastrar(req, res) {
        try {
            const requisicao = await CursoService.cadastrar(
                req.usuario.id,
                req.body
            );

            return res.status(201).json({
                mensagem: `Curso cadastrado com sucesso`,
                curso: requisicao
            });
        }
        catch (error) {
            return res.status(400).json({
                mensagem: `Falha ao cadastrar curso: ${error.message}`
            });
        }
    }
}

export default CursoController;
