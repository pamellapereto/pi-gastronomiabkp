import renderCadastroPage from "./pages/cadastro.js";
import renderLoginPage from "./pages/login.js";
import renderHomePage from "./pages/home.js";   
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
//1ª estratégia de navegação por hash
function navegarPorHash() {
    const hash = window.location.hash;
    switch (hash) {
        case '#home':
            app.replaceChildren(renderHomePage());
            break;
        case '#login': 
            navegarParaLogin();
            break;
        case '#cadastro':
            navegarParaCadastro();
            break;
    }}
window.addEventListener(
    "hashchange",
    navegarPorHash
);

//2ª estratégia de navegação por requisição de caminho (path) 