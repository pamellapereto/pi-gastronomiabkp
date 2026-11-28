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

    static async excluir(id_empresa, /*se fosse para atualizar, passaria também dados*/) {
        const {
            //Se fosse atualizar teria data
            error                          //Se fosse para atualizar, seria update()
        } = await connAdmin.from("empresa").delete().eq("id_empresa",
            id_empresa);
            if (error) {
                throw error;
            }
    }
}

export default EmpresaModel;
