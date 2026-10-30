const SVG_RENDER = 'http://www.w3.org/2000/svg';
//Cria um elemento SVG a partir dos dados disponbilizados pela Iconify
const renderIcons = (btnIcon, data) => {
    const svg = document.createElementNS(
        SVG_RENDER,
        'svg'
    );
    const width = data.width || 16;
    const height = data.height || 16;
    svg.setAttribute(
        'viewBox',
        `0 0 ${width} ${height}`
    );
    svg.setAttribute('aria-hidden', 'true');
    svg.innerHTML = data.body
    btnIcon.replaceChildren(svg);
}
//Cria um campo de senha com botão de visibilidade
const criarInputSenha = (input, icons) => {
    const divSenha = document.createElement('div');
    divSenha.className = 'divSenha';
    //Botão para mostrar ou ocultar a senha
    const btnVisibilidade = document.createElement('button');
    btnVisibilidade.type = 'button';
    btnVisibilidade.className = 'btnVisibilidade';
    btnVisibilidade.setAttribute('aria-label', 'Senha oculta');
    btnVisibilidade.setAttribute('aria-pressed', 'false');
    renderIcons(btnVisibilidade, icons.invisibleIcon);

    // Evento de clique
    btnVisibilidade.addEventListener('click', () => {
        const inputEstaVisivel = input.type === 'text';

        //Alterna o tipo do input
        input.type = inputEstaVisivel ? 'password' : 'text';

        //Atualiza a descricao do botao
        btnVisibilidade.setAttribute(
            'aria-label',
            inputEstaVisivel ? 'Senha visível' : 'Senha oculta'
        );
        btnVisibilidade.setAttribute('aria-pressed', String(!inputEstaVisivel));
        //Alterna o ícone
        renderIcons(
            btnVisibilidade,
            inputEstaVisivel ? icons.invisibleIcon : icons.visibleIcon
        );
    });
    divSenha.append(input, btnVisibilidade);
    
    return divSenha;
}
export default criarInputSenha;