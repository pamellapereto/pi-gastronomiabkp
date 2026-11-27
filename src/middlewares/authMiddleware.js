// Valida o Bearer Token gerado pelo Supabase.
import conn from "../config/database.js";

class AuthMiddleware {
    static async validarToken(req, res, next) {
        try {
            const authorization = req.headers.authorization;

            if (!authorization?.startsWith("Bearer ")) {
                return res.status(401).json({
                    error: `Token não informado`
                });
            }

            const tokenExtraction = authorization.slice(7);

            const {
                data,
                error
            } = await conn.auth.getUser(tokenExtraction);

            if (error || !data.user) {
                return res.status(401).json({
                    error: `Token inválido ou expirado`
                });
            }

            req.usuario = data.user;
            req.tokenExtraction = tokenExtraction;
            next();
        }
        catch (error) {
            return res.status(500).json({
                error: `Erro ao validar autenticação: ${error.message}`
            });
        }
    }
}

export default AuthMiddleware;
