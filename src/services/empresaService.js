import EmpresaModel from "../models/empresaModel.js";

class EmpresaService {
    static async completarPerfil(id_usuario, dados) {
        const {
            razao_social,
            tipo_empresa,
            porte
        } = dados;

        if (!razao_social || !tipo_empresa || !porte) {
            throw new Error(`Todos os campos são obrigatórios!`);
        }

        const razao_socialLimpo = razao_social.trim();
        const tipo_empresaLimpo = tipo_empresa.trim();
        const porteLimpo = porte.trim();

        if (!razao_socialLimpo || !tipo_empresaLimpo || !porteLimpo) {
            throw new Error(`Todos os campos são obrigatórios!`);
        }

        const empresaExistente =
            await EmpresaModel.buscarPorUsuarioPerfilEmpresa(id_usuario);

        if (empresaExistente) {
            throw new Error(`O perfil dessa empresa já foi cadastrado!`);
        }

        const empresa = await EmpresaModel.criar(
            id_usuario,
            {
                razao_social: razao_socialLimpo,
                tipo_empresa: tipo_empresaLimpo,
                porte: porteLimpo
            }
        );

        return empresa;
    }
}

export default EmpresaService;
