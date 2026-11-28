import { connAdmin } from "../config/database.js"
class UnidadeModel {
    static async criar(id_empresa, id_endereco, dados){
        const {
            data,
            error
        } = await connAdmin.from("unidade").insert({
            id_empresa: id_empresa,
            id_endereco: id_endereco,
            nome_fantasia: dados.nome_fantasia,
            cnpj: dados.cnpj,
            tipo_unidade: dados.tipo_unidade
        }).select().single();
        if (error) {
            throw error;
        }
        return data;
    }
}
export default UnidadeModel;