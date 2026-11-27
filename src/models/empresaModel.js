import { connAdmin } from "../config/database.js";

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

        if (error) throw error;
        return data;
    }

    static async buscarPorUsuarioPerfilEmpresa(id_usuario) {
        const {
            data,
            error
        } = await connAdmin.from("empresa")
            .select("*")
            .eq("id_usuario", id_usuario)
            .maybeSingle();

        if (error) throw error;
        return data;
    }
}

export default EmpresaModel;
