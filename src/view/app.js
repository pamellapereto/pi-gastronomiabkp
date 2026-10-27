import renderCadastroPage from "./pages/cadastro.js";
import renderLoginPage from
"./pages/login.js";

const app = document.querySelector('#root');
app.replaceChildren(renderCadastroPage());