const renderCadastroPage = () => {
    const container = document.createElement('div');
    container.style.height = '100vh';
    container.className = 'container';

    const form = document.createElement('form');
    form.className = 'form-login';

    const labelNome = document.createElement('label');
    labelNome.setAttribute('for', 'nome');
    labelNome.textContent = "Nome";

    const inputNome = document.createElement('input');
    inputNome.id = 'nome';
    inputNome.type = 'text';
    inputNome.name = 'nome';
    inputNome.placeholder = 'Digite seu nome';
    inputNome.required = 'true';

    const labelEmail = document.createElement('label');
    labelEmail.setAttribute('for', 'email');
    labelEmail.textContent = "E-mail";

    const inputEmail = document.createElement('input');
    inputEmail.id = 'email';
    inputEmail.type = 'email';
    inputEmail.name = 'email';
    inputEmail.placeholder = 'example@email.com';
    inputEmail.required = 'true';

    const labelSenha = document.createElement('label');
    labelSenha.setAttribute('for', 'senha');
    labelSenha.textContent = "Senha";

    const inputSenha = document.createElement('input');
    inputSenha.id = 'senha';
    inputSenha.type = 'password';
    inputSenha.name = 'senha';
    inputSenha.placeholder = 'Digite sua senha'
    inputSenha.required = 'true';

    const labelConfirmarSenha = document.createElement('label');
    labelConfirmarSenha.setAttribute('for', 'confirmar-senha');
    labelConfirmarSenha.textContent = "Confirme sua senha";

    const inputConfirmarSenha = document.createElement('input');
    inputConfirmarSenha.id = 'confirmar-senha';
    inputConfirmarSenha.type = 'password';
    inputConfirmarSenha.name = 'confirmar-senha';
    inputConfirmarSenha.placeholder = 'Redigite sua senha'
    inputConfirmarSenha.required = 'true';

    const button = document.createElement('button');
    button.type = 'submit';
    button.textContent = 'Cadastrar'
    button.disabled = true;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nome = inputNome.value.trim();
        const email = inputEmail.value.trim();
        const senha = inputConfirmarSenha.value.trim();
        const usuario = {
            nome,
            email,
            senha
        }
        try {
            const resultado = await fetch(
                "http://localhost:3000/autenticacao/cadastrar",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(usuario)
                }
            );
            const confirmacao = await resultado.json();
            if (!resultado.ok) {
                alert("Já existe uma conta com este e-mail!");
            }
            else {
                alert("Cadastro realizado com sucesso!");

            }
            return confirmacao;
        }
        catch (erro) {
            console.error(erro);
            alert("Erro ao cadastrar!");
        }
    });

    inputConfirmarSenha.addEventListener("focusout", (event) => {
        if (inputSenha.value !== inputConfirmarSenha.value) {
            event.target.style.border = "2px solid red";
            alert("Senhas não coincidem")
            button.disabled = true;
        }
        else {
            event.target.style.border = "2px solid rgb(48, 58, 255);";
            button.disabled = false;
        }
    });


    form.appendChild(labelNome);
    form.appendChild(inputNome);
    form.appendChild(labelEmail);
    form.appendChild(inputEmail);
    form.appendChild(labelSenha);
    form.appendChild(inputSenha);
    form.appendChild(labelConfirmarSenha);
    form.appendChild(inputConfirmarSenha);
    container.appendChild(form);
    form.appendChild(button);

    return container;
}

export default renderCadastroPage;
