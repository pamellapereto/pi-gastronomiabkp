import AuthService from "../services/authService.js";

class EmpresaMiddleware {
    static async validarPerfil(req, res, next) {
        try {
            const perfil = await AuthService
                .buscarPorIdUsuario(req.usuario.id);

            if (!perfil) {
                return res.status(403).json({
                    error: `Usuário não encontrado no sistema, portanto, não possui um perfil`
                });
            }

            if (perfil.perfil_usuario !== "Empresa") {
                return res.status(403).json({
                    error: `Acesso permitido apenas para o perfil Empresa`
                });
            }

            req.usuarioPerfil = perfil;
            next();
        }
        catch (error) {
            return res.status(500).json({
                error: `Erro ao validar perfil de empresa: ${error.message}`
            });
        }
    }
}

export default EmpresaMiddleware;
