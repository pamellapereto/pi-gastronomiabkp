import AuthService from "../services/authService.js"

class EmpresaMiddleware { //ApoioMiddleware
    static async validarPerfil(req, res, next) {
        try {
            const perfil = await AuthService
            .buscarPorIdUsuario(req.usuario.id);  
            if (!perfil) {
                return res.status(403).json({
                    error: `Usuário não encontrado no sistema, portanto,
                    não possui um perfil`
                });
            }
                if (perfil.perfil_usuario !== "Empresa") { //Apoio
                    return res.status(403).json ({
                        error: `Acesso permitido apenas para o perfil Empresa` //Apoio
                    });
                }
                req.usuario = perfil;

                next();
        }
        catch (error) {
            return res.status(500).json({
                error: `error ao validar perfil de empresa: ${error.message}` //Apoio
            })
        }
    }
}
export default EmpresaMiddleware;