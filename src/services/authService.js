import conn from "../config/database.js";
class AuthService {
    async cadastrar(nome, email, senha) {
        const { data, error } = await conn.auth.signUp(
            {
                email,
                password: senha,
                options: {
                    data: {
                        nome
                    }
                }
            });
            if (error) throw error;
            return data;
    }
}
export default AuthService;