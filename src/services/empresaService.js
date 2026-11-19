import EmpresaModel from "../models/empresaModel";

class EmpresaService {
    static async completarPerfil(id_usuario, dados) {
        const {
            razao_social,
            tipo_empresa,
            porte
        } = dados;
        const razao_socialLimpo = razao_social.trim();
        //Aplicar trim() para os outros valores => tipo_empresaLimpo, porteLimpo

        if (!razao_socialLimpo || !tipo_empresa || !porte) {
            throw new Error(`Todos os campos são obrigatórios!`);
        }
        const empresaExistente =
        await EmpresaModel.buscarPorUsuarioPerfilEmpresa(id_usuario);
        if(empresaExistente) {
            throw new Error(`O perfil dessa empresa já foi cadastrado!`);
        }
        
        const empresa = await EmpresaModel.criar(id_usuario, dados);
        return empresa;
    }
}
export default EmpresaService;