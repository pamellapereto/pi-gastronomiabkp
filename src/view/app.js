import renderCadastroPage from "./pages/cadastro.js";
import renderLoginPage from
"./pages/login.js";

const app = document.querySelector('#root');

const response = await fetch('/interface-config');
const interfaceConfig = await response.json();

const fontLink = document.createElement('link');
fontLink.rel = 'stylesheet';
fontLink.href = interfaceConfig.fontUrl;
document.head.appendChild(fontLink);

app.replaceChildren(renderCadastroPage(interfaceConfig.icons));
