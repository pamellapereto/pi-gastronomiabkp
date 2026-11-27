import { connAdmin } from "../config/database.js";

class TurmaModel {
    static async criar(id_usuario, dados) {
        const {
            data,
            error
        } = await connAdmin.from("turma").insert({
            id_usuario: id_usuario,
            cod_oferta: dados.cod_oferta,
            dataInicio: dados.dataInicio,
            periodo: dados.periodo,
            fk_curso: dados.fk_curso,
            ativo: true
        }).select().single();

        if (error) throw error;
        return data;
    }

    static async buscarPorCodOferta(cod_oferta) {
        const {
            data,
            error
        } = await connAdmin.from("turma")
            .select("*")
            .eq("cod_oferta", cod_oferta)
            .maybeSingle();

        if (error) throw error;
        return data;
    }
}

export default TurmaModel;
