import { connAdmin } from "../config/database";

class EmpresaModel {
    static async criar(id_usuario, dados) {
        const {
            data,
            error
        } = await connAdmin.from("empresa").insert({//PIGas:"curso" (se for arquivo cursoModel.js)/"turma" (se for arquivo turmaModel.js)
            id_usuario: id_usuario, //seja curso ou seja turma, passa id_usuario: id_usuario
            //PIGas: titulo: dados.titulo/cod_oferta: dados.cod_oferta
            razao_social: dados.razao_social, 
            //PIGas: cargaHoraria: dados.cargaHoraria/dataInicio: dados.dataInicio
            tipo_empresa: dados.tipo_empresa,
            //PIGas: modalidade: dados.modalidade/periodo: dados.periodo
            porte: dados.porte
            //PIGas: formato: dados.formato/fk_curso: dados.fk_curso
        }).select().single();

        if (error) {
            throw error;
        }

        return data;
    }
}

export default EmpresaModel;