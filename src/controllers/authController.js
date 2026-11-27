import AuthService from "../services/authService.js";

class AuthController {
    static async cadastrar(req, res) {
        try {
            const {
                nome,
                email,
                senha,
                tipo_usuario,
                num_registro
            } = req.body;

            if (!nome || !email || !senha || !tipo_usuario || !num_registro) {
                return res.status(400).json({
                    error: `Preencha todos os campos obrigatórios`
                });
            }

            const tiposPermitidos = [
                "Apoio",
                "Auxiliar",
                "Docente"
            ];

            if (!tiposPermitidos.includes(tipo_usuario)) {
                return res.status(400).json({
                    error: `Tipo de usuário inválido`
                });
            }

            const resultado = await AuthService.cadastrar(
                nome,
                email,
                senha,
                tipo_usuario,
                num_registro
            );

            return res.status(201).json({
                mensagem: `Cadastro feito com sucesso!`,
                usuario: resultado.dadosUsuario,
                auth: resultado.auth.user,
                session: resultado.auth.session,
                requerConfirmacao: !resultado.auth.session
            });
        }
        catch (error) {
            return res.status(400).json({
                error: `Falha ao cadastrar: ${error.message}`
            });
        }
    }

    static async login(req, res) {
        try {
            const { email, senha } = req.body;

            if (!email || !senha) {
                return res.status(400).json({
                    error: `Preencha todos os campos obrigatórios`
                });
            }

            const resultado = await AuthService.login(email, senha);

            return res.status(200).json({
                mensagem: `Login feito com sucesso!`,
                usuario: resultado.user,
                token: resultado.session.access_token
            });
        }
        catch (error) {
            return res.status(400).json({
                error: `Falha ao logar: ${error.message}`
            });
        }
    }
}

export default AuthController;
