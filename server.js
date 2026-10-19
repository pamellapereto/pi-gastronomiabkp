import express from 'express';
import dotenv from 'dotenv';

//Carrega as variáveis de ambiente
dotenv.config();

//Responsável pela API: definir rotas e processar requisições
const app = express();
const PORT = process.env.PORT;

// app.get('/usuarios', async (req, res) => {
//     try {
//         const [rows] = await conn.query('SELECT * FROM usuario');
//         res.json(rows);
//     }
//     catch (erro) {
//         res
//             .status(500)
//             .json({
//                 mensagem: erro.message
//             });
//     }
// });

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));