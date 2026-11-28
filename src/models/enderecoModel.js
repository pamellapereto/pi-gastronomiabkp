/*Tarefa - desenvolver: */
import { connAdmin } from "../config/database.js";

class EnderecoModel {

    static async criar(dados) {
      const {
        data,
        error
      } = await connAdmin.from("endereco").insert({
        logradouro: dados.logradouro,
        //numero, complemento, bairro, cidade, estado, cep
      }).select().single();

        if (error) {
            throw error;
        }
        return data;
    }
}

export default EnderecoModel;