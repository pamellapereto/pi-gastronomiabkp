import conn, { connAdmin } from "../config/database.js";
class AuthService {
    static async cadastrar(nome, email, senha, tipo_usuario) {
        //1. Cadastra no SUPABASE AUTH
        const {
            data: auth, 
            error } = await conn.auth.signUp(
                {
                    email,
                    password: senha,
                    options: {
                        data: {
                            display_name: nome
                        }
                    }
                });
        if (error) throw error;

        //2. Obtém o UUID criado pelo SUPABASE AUTH
        const id_usuario = auth.user.id;

        //3. Cadastra na tabela usuario (SCHEMA public)
        const {
            data: dadosUsuario,
            error: erroUsuario } = await connAdmin.from("usuario").insert({
                id_usuario: id_usuario,
                perfil_usuario: tipo_usuario
            }).select().single();
        if(erroUsuario) {
            await connAdmin.auth.admin.deleteUser(id_usuario);
        }
        //4. Retorna os dados de auth.users e da tabela usuario (SCHEMA public)
        return {
            auth,
            dadosUsuario
        };
    }

    static async login(email, senha) {
        const { data, error } = await
            conn.auth.signInWithPassword(
                {
                    email,
                    password: senha
                });
        if (error) throw error;
        return data;
    }
}
export default AuthService;