const renderLoginPage = () => {
    const container = document.createElement('div');
    container.style.height = '100vh';
    container.className = 'container';

    const form = document.createElement('form');
    form.className = 'form-login';

    const divImg = document.createElement('div');
    divImg.className = 'div-img-login';

    const img = document.createElement('img');
    img.src = "./assets/senac.png";
    img.className = 'img-login';

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
    inputSenha.required = 'true';

    const button = document.createElement('button');
    button.type = 'submit';
    button.textContent = 'Entrar'

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = inputEmail.value.trim();
        const senha = inputSenha.value.trim();
        const usuario = {
            email,
            senha
        }
        try {
            const resultado = await fetch(
                "http://localhost:3000/autenticacao/login",
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
                alert("Conta inexistente!")
            }
            else {
                alert("Login realizado com sucesso!");

            }
            return confirmacao;
        }
        catch (erro) {
            console.error(erro);
            alert("Erro ao logar!");
        }
    });

    form.appendChild(labelEmail);
    form.appendChild(inputEmail);
    form.appendChild(labelSenha);
    form.appendChild(inputSenha);
    container.appendChild(form);
    form.appendChild(button);
    divImg.appendChild(img);
    container.appendChild(divImg)
    

    return container;
}

export default renderLoginPage;
