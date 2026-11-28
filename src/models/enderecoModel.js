/*Tarefa - desenvolver a criação de endereço e a exclusão
dele pelo método EnderecoModel.excluir(id_endereco) -
isso é MUITO PRÓXIMO DE UMA CÓPIA IDÊNTICA DE
EmpresaModel.excluir(id_empresa) */
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