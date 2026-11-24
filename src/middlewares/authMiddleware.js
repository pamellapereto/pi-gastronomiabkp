// Uso do token: usuário se autentica, é gerado um token pelo próprio Supabase;
// uma vez gerado, o token deve ser reaproveitado para VALIDAR este usuário
// PI Conecta Talent - exemplo: apenas empresa gerencia um recrutador
// PI Gastronomia - exemplo: apenas auxiliar registra a saída de um insumo do estoque
import conn from "../config/database.js";
class AuthMiddleware {
    static async validarToken(req, res, next) {
        try {
            const authorization = req.headers.authorization;
            if (!authorization?.startsWith("Bearer ")) {
                return res.status(401).json({
                    error: `Token não informado: ${error.message}`
                });
            }
            const tokenExtraction = authorization.slice(7);
            const {
                data,
                error
            } = await conn.auth.getUser(tokenExtraction);
            if (error || !data.user) {
                return res.status(401).json({
                    error: `Token inválido ou expirado: ${error.message}`
                });
            }
            req.usuario = data.user;
            req.tokenExtraction = tokenExtraction;
            next();
        } catch (error) {
            return res.status(500).json({
                error: `error ao validar autenticação: ${error.message}`
            });
        }
    }
}
export default AuthMiddleware;