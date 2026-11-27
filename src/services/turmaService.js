import TurmaModel from "../models/turmaModel.js";

class TurmaService {
    static async cadastrar(id_usuario, dados) {
        const {
            cod_oferta,
            dataInicio,
            periodo,
            fk_curso
        } = dados;

        if (!cod_oferta || !dataInicio || !periodo || !fk_curso) {
            throw new Error(`Todos os campos são obrigatórios!`);
        }

        const periodoLimpo = periodo.trim();

        if (!periodoLimpo) {
            throw new Error(`Todos os campos são obrigatórios!`);
        }

        const turmaExistente =
            await TurmaModel.buscarPorCodOferta(cod_oferta);

        if (turmaExistente) {
            throw new Error(`Já existe uma turma com esse código de oferta!`);
        }

        return await TurmaModel.criar(
            id_usuario,
            {
                cod_oferta,
                dataInicio,
                periodo: periodoLimpo,
                fk_curso
            }
        );
    }
}

export default TurmaService;
