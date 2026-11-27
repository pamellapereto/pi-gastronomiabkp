import { connAdmin } from "../config/database.js";

class CursoModel {
    static async criar(id_usuario, dados) {
        const {
            data,
            error
        } = await connAdmin.from("curso").insert({
            id_usuario: id_usuario,
            titulo: dados.titulo,
            cargaHoraria: dados.cargaHoraria,
            modalidade: dados.modalidade,
            formato: dados.formato
        }).select().single();

        if (error) throw error;
        return data;
    }

    static async buscarPorTitulo(titulo) {
        const {
            data,
            error
        } = await connAdmin.from("curso")
            .select("*")
            .eq("titulo", titulo)
            .maybeSingle();

        if (error) throw error;
        return data;
    }
}

export default CursoModel;
