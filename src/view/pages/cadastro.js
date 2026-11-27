import criarInputSenha from "../utils/senhaVisibilidade.js";

const renderCadastroPage = (icons, navegarParaLogin) => {
    const container = document.createElement('div');
    container.style.height = '100vh';
    container.className = 'container';

    const form = document.createElement('form');
    form.className = 'form-login';

    const linha = document.createElement('hr');
    linha.className = 'linha';

    const linkNav = document.createElement('a');
    linkNav.className = "linkNav";
    linkNav.textContent = 'Já possui uma conta? Faça login!';
    linkNav.addEventListener('click', (event) => {
        event.preventDefault();
        navegarParaLogin();
    });

    const labelNome = document.createElement('label');
    labelNome.setAttribute('for', 'nome');
    labelNome.textContent = "Nome";

    const inputNome = document.createElement('input');
    inputNome.id = 'nome';
    inputNome.type = 'text';
    inputNome.name = 'nome';
    inputNome.placeholder = 'Digite seu nome';
    inputNome.required = true;

    const labelEmail = document.createElement('label');
    labelEmail.setAttribute('for', 'email');
    labelEmail.textContent = "E-mail";

    const inputEmail = document.createElement('input');
    inputEmail.id = 'email';
    inputEmail.type = 'email';
    inputEmail.name = 'email';
    inputEmail.placeholder = 'example@email.com';
    inputEmail.required = true;

    const labelTipo = document.createElement('label');
    labelTipo.setAttribute('for', 'tipo_usuario');
    labelTipo.textContent = "Tipo de usuário";

    const inputTipo = document.createElement('select');
    inputTipo.id = 'tipo_usuario';
    inputTipo.name = 'tipo_usuario';
    inputTipo.required = true;

    ["", "Candidato", "Recrutador", "Administrador", "Empresa"]
        .forEach((tipo) => {
            const option = document.createElement('option');
            option.value = tipo;
            option.textContent = tipo || "Selecione";
            inputTipo.appendChild(option);
        });

    const labelSenha = document.createElement('label');
    labelSenha.setAttribute('for', 'senha');
    labelSenha.textContent = "Senha";

    const inputSenha = document.createElement('input');
    inputSenha.id = 'senha';
    inputSenha.type = 'password';
    inputSenha.name = 'senha';
    inputSenha.placeholder = 'Digite sua senha';
    inputSenha.required = true;
    const campoSenha = criarInputSenha(inputSenha, icons);

    const labelConfirmarSenha = document.createElement('label');
    labelConfirmarSenha.setAttribute('for', 'confirmar-senha');
    labelConfirmarSenha.textContent = "Confirme sua senha";

    const inputConfirmarSenha = document.createElement('input');
    inputConfirmarSenha.id = 'confirmar-senha';
    inputConfirmarSenha.type = 'password';
    inputConfirmarSenha.name = 'confirmar-senha';
    inputConfirmarSenha.placeholder = 'Redigite sua senha';
    inputConfirmarSenha.required = true;
    const campoConfirmarSenha = criarInputSenha(inputConfirmarSenha, icons);

    const button = document.createElement('button');
    button.type = 'submit';
    button.className = 'btn-submit';
    button.textContent = 'Cadastrar';
    button.disabled = true;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const usuario = {
            nome: inputNome.value.trim(),
            email: inputEmail.value.trim(),
            senha: inputConfirmarSenha.value.trim(),
            tipo_usuario: inputTipo.value
        };

        try {
            const resultado = await fetch('/autenticacao/cadastrar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(usuario)
            });

            const confirmacao = await resultado.json();

            if (!resultado.ok) {
                alert(confirmacao.error || 'Erro ao cadastrar!');
            }
            else {
                alert('Cadastro realizado com sucesso!');
            }

            return confirmacao;
        }
        catch (erro) {
            console.error(erro);
            alert('Erro ao cadastrar!');
        }
    });

    inputConfirmarSenha.addEventListener('focusout', (event) => {
        if (inputSenha.value !== inputConfirmarSenha.value) {
            event.target.style.border = '2px solid red';
            alert('Senhas não coincidem');
            button.disabled = true;
        }
        else {
            event.target.style.border = '2px solid rgb(48, 58, 255)';
            button.disabled = false;
        }
    });

    form.appendChild(labelNome);
    form.appendChild(inputNome);
    form.appendChild(labelEmail);
    form.appendChild(inputEmail);
    form.appendChild(labelTipo);
    form.appendChild(inputTipo);
    form.appendChild(labelSenha);
    form.appendChild(campoSenha);
    form.appendChild(labelConfirmarSenha);
    form.appendChild(campoConfirmarSenha);
    form.appendChild(button);
    form.appendChild(linha);
    form.appendChild(linkNav);
    container.appendChild(form);

    return container;
};

export default renderCadastroPage;
