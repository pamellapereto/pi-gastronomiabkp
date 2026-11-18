// Uso do token: usuário se autentica, é gerado um token pelo próprio Supabase;
// uma vez gerado, o token deve ser reaproveitado para VALIDAR este usuário
// PI Conecta Talent - exemplo: apenas empresa gerencia um recrutador
// PI Gastronomia - exemplo: apenas auxiliar registra a saída de um insumo do estoque

class AuthMiddleware {
    static async validarToken(req, res) {
        try {
            const authorization = req.headers.authorization;
            if (!authorization?.startsWith("Bearer ")) {
                return res.status(401).json({
                    erro: `Token não informado: ${erro.message}`
                });
            }
            const tokenExtraction = authorization.slice(7);
            const {
                data,
                erro
            } = await conn.auth.getUser(tokenExtraction);

            if (erro || !data.user) {
                return res.status(401).json({
                    erro: `Token inválido ou expirado: ${erro.message}`
                });
            }
            req.usuario = data.user;
            req.tokenExtraction = tokenExtraction;
        }
        catch (erro) {
            return res.status(500).json({
            erro: `Erro ao validar autenticação: ${erro.message}`
            });
        }
    }
}
export default AuthMiddleware;