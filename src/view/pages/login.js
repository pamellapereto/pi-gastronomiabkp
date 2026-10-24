const renderLoginPage = () => {
    const container = document.createElement('div');
    container.style.height = '100vh';
    
    const form = document.createElement('form');
    const labelEmail = document.createElement('label');
    labelEmail.setAttribute('for', 'email');

    const inputEmail = document.createElement('input');
    inputEmail.id = 'email';
    inputEmail.type = 'email';
    inputEmail.name = 'email';
    inputEmail.placeholder = 'example@email.com';
    inputEmail.required = 'true';

    const labelSenha = document.createElement('label');
    labelSenha.setAttribute('for', 'senha');

    const inputSenha = document.createElement('input');
    inputSenha.id = 'senha';
    inputSenha.type = 'password';
    inputSenha.name = 'senha';
    inputSenha.required = 'true';

    const button = document.createElement('button');
    button.type = 'submit';
    button.textContent = 'Entrar'

    form.appendChild(labelEmail);
    form.appendChild(inputEmail);
    form.appendChild(labelSenha);
    form.appendChild(inputSenha);
    form.appendChild(button);
    container.appendChild(form);
    
    return container;
}

export default renderLoginPage;