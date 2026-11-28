import EmpresaModel from "../models/empresaModel.js";
import EnderecoModel from "../models/enderecoModel.js";
import UnidadeModel from "../models/unidadeModel.js";

class EmpresaService {
    static async completarPerfil(id_usuario, dados) {
        const {
            razao_social,
            tipo_empresa,
            porte,
            unidade
        } = dados;

        const {
            nome_fantasia,
            cnpj,
            endereco
        } = unidade; /*Desestruturacao do objeto unidade com novos dados a serem informados pelo usuario
        (a primeira unidade é necessariamente matriz, portanto não é o usuario que informa */

        const {
            logradouro,
            numero,
            complemento,
            bairro,
            cidade,
            estado,
            cep
        } = endereco; /*Desestruturar objeto endereco com todas as informações que o usuário indicar */

        const razao_socialLimpo = razao_social.trim();
        const tipo_empresaLimpo = tipo_empresa.trim();
        const porteLimpo = porte.trim();
        const nome_fantasiaLimpo = nome_fantasia.trim();
        const cnpjLimpo = cnpj.trim();
        const logradouroLimpo = logradouro.trim();
        const numeroLimpo = numero.trim();
        const bairroLimpo = bairro.trim();
        const cidadeLimpo = cidade.trim();
        const estadoLimpo = estado.trim();
        const cepLimpo = cep.trim();

        if (!razao_socialLimpo || !tipo_empresaLimpo || !porteLimpo || !nome_fantasiaLimpo || !cnpjLimpo ||
            !logradouroLimpo || !numeroLimpo || !bairroLimpo || !cidadeLimpo || !estadoLimpo || !cepLimpo) {
            throw new Error(`Todos os campos da unidade matriz devem ser preenchidos!`);
        }

        const empresaExistente =
            await EmpresaModel.buscarPorUsuarioPerfilEmpresa(id_usuario);

        if (empresaExistente) {
            throw new Error(`O perfil dessa empresa já foi cadastrado!`);
        }

        const empresa = await EmpresaModel.criar(
            id_usuario,
            {
                razao_social: razao_socialLimpo,
                tipo_empresa: tipo_empresaLimpo,
                porte: porteLimpo
            }
        );
        let enderecoCriado = null;

        try {
            //Cadastrar o endereço da primeira unidade
            enderecoCriado = await EnderecoModel.criar({
                logradouro: logradouroLimpo,
                numero: numeroLimpo,
                complemento: complemento?.trim() || null,
                bairro: bairroLimpo,
                cidade: cidadeLimpo,
                estado: estadoLimpo,
                cep: cepLimpo
            });

            //Cadastrar a unidade matriz
            const unidadeCriada = await UnidadeModel.criar(
                empresa.id_empresa,
                enderecoCriado.id_endereco,
                {
                    nome_fantasia: nome_fantasiaLimpo,
                    cnpj: cnpjLimpo,
                    tipo_unidade: "Matriz"
                }
            );
            return {
                empresa,
                unidade: unidadeCriada,
                endereco: enderecoCriado
            }
        }
        catch (error) {
            if (enderecoCriado) {
                await EnderecoModel.excluir(
                    enderecoCriado.id_endereco
                );
            }
            await EmpresaModel.excluir(
                empresa.id_empresa
            );
            throw error;
        }
    }
}
export default EmpresaService;
