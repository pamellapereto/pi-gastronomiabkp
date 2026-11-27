import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './src/routes/authRoutes.js';
import perfilRoutes from './src/routes/perfilRoutes.js';
import { createRequire } from 'node:module';

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const require = createRequire(import.meta.url);
const googleFonts = require('google-fonts');
const visibleIcon = require('@iconify/icons-basil/eye-solid').default;
const invisibleIcon = require('@iconify/icons-basil/eye-closed-outline').default;


app.get('/interface-config', (req, res) => {
    const fontFamily = googleFonts({'League Spartan': ['400', '700']});
    const urlFonts = fontFamily.match(/href="([^"]+)"/)[1];

    res.json({
        urlComplete: `https:${urlFonts}`,
        icons: {
            visibleIcon: visibleIcon,
            invisibleIcon: invisibleIcon
        }
    });
});

app.use(express.json());
app.use(express.static("./src/view"));
app.use("/src/view", express.static("./src/view/pages"));

app.use('/autenticacao', authRoutes);
app.use('/perfil', perfilRoutes);

app.listen(PORT, () => console.log(`Servidor rodando na porta http://localhost:${PORT}`));
