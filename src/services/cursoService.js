import CursoModel from "../models/cursoModel.js";

class CursoService {
    static async cadastrar(id_usuario, dados) {
        const {
            titulo,
            cargaHoraria,
            modalidade,
            formato
        } = dados;

        if (!titulo || !cargaHoraria || !modalidade || !formato) {
            throw new Error(`Todos os campos são obrigatórios!`);
        }

        const tituloLimpo = titulo.trim();
        const modalidadeLimpa = modalidade.trim();
        const formatoLimpo = formato.trim();

        if (!tituloLimpo || !modalidadeLimpa || !formatoLimpo) {
            throw new Error(`Todos os campos são obrigatórios!`);
        }

        const cursoExistente = await CursoModel.buscarPorTitulo(tituloLimpo);

        if (cursoExistente) {
            throw new Error(`Já existe um curso cadastrado com esse título!`);
        }

        return await CursoModel.criar(
            id_usuario,
            {
                titulo: tituloLimpo,
                cargaHoraria,
                modalidade: modalidadeLimpa,
                formato: formatoLimpo
            }
        );
    }
}

export default CursoService;
