import renderCadastroPage from "./pages/cadastro.js";
import renderLoginPage from
    "./pages/login.js";

const app = document.querySelector('#root');
const res = await fetch(`/interface-config`);
const interfaceConfig = await res.json();

const tagLink = document.createElement('link');
tagLink.rel = 'stylesheet';
tagLink.href = interfaceConfig.urlComplete;
document.head.appendChild(tagLink);

function navegarParaCadastro() {
    app.replaceChildren(renderCadastroPage(
        interfaceConfig.icons,
        navegarParaLogin
    ));
}
function navegarParaLogin() {
    app.replaceChildren(renderLoginPage(
        interfaceConfig.icons,
        navegarParaCadastro
    ));
}


navegarParaLogin();