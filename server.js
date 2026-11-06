import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './src/routes/authRoutes.js';
/*createRequire => função para localizar o caminho de subdiretórios
e/ou arquivos presentes em um certo módulo do Node, quando este módulo já
estiver instalado*/
import { createRequire } from 'node:module';
/*fileURLToPath => função que obtém o caminho do arquivo atual em que
esta função está sendo executada; ou seja, o caminho absoluto do arquivo
server.js => "C:\\Users\\pamel\\Documents\\pi-senacgastronomia\\server.js*
Obs.: Tanto createRequire como fileURLToPath são duas funções que aguardam
um parâmetro do tipo string, neste caso, um caminho*/
import { fileURLToPath } from 'node:url';
/*path => obter o caminho absoluto do diretório do projeto onde o arquivo server.js está, ou seja:
C:\\Users\\pamel\\Documents\\pi-senacgastronomia*/
import path from 'node:path';

//Carrega as variáveis de ambiente
dotenv.config();

//Responsável pela API: definir rotas e processar
// requisições
const app = express();
const PORT = process.env.PORT;
const require = createRequire(import.meta.url);
const googleFonts = require('google-fonts');
const visibleIcon = require('@iconify/icons-basil/eye-solid').default;
const invisibleIcon = require('@iconify/icons-basil/eye-closed-outline')
.default;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/home", (req, res) => {
    res.sendFile(
        path.join(__dirname,
            "src",
            "view",
            "index.html"
            //"C:\\Users\\pamel\\Documents\\pi-senacgastronomia\\src\\view\\index.html"
        )
    );
});

app.get("/login", (req, res) => {
    res.sendFile(
        path.join(__dirname,
            "src",
            "view",
            "index.html"
        )
    );
});

app.get("/cadastro", (req, res) => {
    res.sendFile(
        path.join(__dirname,
            "src",
            "view",
            "index.html"
        )
    );
});



app.get('/interface-config', (req, res) => {
    const fontFamily = googleFonts({'League Spartan': ['400', '700']});
    const urlFonts = fontFamily.match(/href="([^"]+)"/)[1];

    res.json({
        urlComplete: `https:${urlFonts}`,
        icons: {
            visibleIcon: visibleIcon,
            invisibleIcon: invisibleIcon
        },
    });
});

app.use(express.json());
app.use(express.static("./src/view"));
app.use("/src/view", express.static("./src/view/pages"));

app.use('/autenticacao',
    authRoutes);

app.listen(PORT, () => console.log
(`Servidor rodando na porta ${PORT}`));
