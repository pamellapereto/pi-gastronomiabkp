import { connAdmin } from "../config/database.js";

class RecrutadorModel {
    static async criar(id_usuario, dados) {
        const {
            data,
            error
        } = await connAdmin.from("recrutador").insert({
            cargo: dados.cargo,
            id_usuario: id_usuario,
            id_empresa: dados.id_empresa
        }).select().single();

        if (error) throw error;
        return data;
    }

    static async buscarPorUsuario(id_usuario) {
        const {
            data,
            error
        } = await connAdmin.from("recrutador")
            .select("*")
            .eq("id_usuario", id_usuario)
            .maybeSingle();

        if (error) throw error;
        return data;
    }
}

export default RecrutadorModel;
