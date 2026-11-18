import { connAdmin } from "../config/database";

class EmpresaModel {
    static async criar(id_usuario, dados) {
        const {
            data,
            error
        } = await connAdmin.from("empresa").insert({
            id_usuario: id_usuario,
            razao_social: dados.razao_social,
            tipo_empresa: dados.tipo_empresa,
            porte: dados.porte
        }).select().single();

            if(error) {
                throw error;
            }
            
        return data;
    }
}

export default EmpresaModel;