import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './src/routes/authRoutes.js';
import turmaRoutes from './src/routes/turmaRoutes.js';
import cursoRoutes from './src/routes/cursoRoutes.js';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const require = createRequire(import.meta.url);
const googleFonts = require('google-fonts');
const visibleIcon = require('@iconify/icons-basil/eye-solid').default;
const invisibleIcon = require('@iconify/icons-basil/eye-closed-outline').default;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/home", (req, res) => {
    res.sendFile(path.join(__dirname, "src", "view", "index.html"));
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "src", "view", "index.html"));
});

app.get("/cadastro", (req, res) => {
    res.sendFile(path.join(__dirname, "src", "view", "index.html"));
});

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
app.use('/turmas', turmaRoutes);
app.use('/cursos', cursoRoutes);

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
