import RecrutadorModel from "../models/recrutadorModel.js";

class RecrutadorService {
    static async completarPerfil(id_usuario, dados) {
        const {
            cargo,
            id_empresa
        } = dados;

        if (!cargo || !id_empresa) {
            throw new Error(`Todos os campos são obrigatórios!`);
        }

        const cargoLimpo = cargo.trim();

        if (!cargoLimpo) {
            throw new Error(`Todos os campos são obrigatórios!`);
        }

        const recrutadorExistente =
            await RecrutadorModel.buscarPorUsuario(id_usuario);

        if (recrutadorExistente) {
            throw new Error(`O perfil desse recrutador já foi cadastrado!`);
        }

        const recrutador = await RecrutadorModel.criar(
            id_usuario,
            {
                cargo: cargoLimpo,
                id_empresa
            }
        );

        return recrutador;
    }
}

export default RecrutadorService;
