import express from 'express';
import dotenv from 'dotenv';
import { createRequire } from 'node:module';
import authRoutes from './src/routes/authRoutes.js';

const require = createRequire(import.meta.url);
const googleFonts = require('google-fonts');
const lockIcon = require('@iconify/icons-icons8/lock-2').default;
const visibleIcon = require('@iconify/icons-mdi/eye').default;
const invisibleIcon = require('@iconify/icons-mdi/eye-off').default;

//Carrega as variáveis de ambiente
dotenv.config();

//Responsável pela API: definir rotas e processar
// requisições
const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.get('/interface-config', (req, res) => {
    const fontLink = googleFonts({ Roboto: ['400', '700'] });
    const fontUrl = fontLink.match(/href="([^"]+)"/)[1];

    res.json({
        fontUrl: `https:${fontUrl}`,
        icons: {
            lock: lockIcon,
            visible: visibleIcon,
            invisible: invisibleIcon
        }
    });
});

app.use(express.static("./src/view"));
app.use("/src/view", express.static("./src/view/pages"));

app.use('/autenticacao',
    authRoutes);

app.listen(PORT, () => console.log
(`Servidor rodando na porta ${PORT}`));
