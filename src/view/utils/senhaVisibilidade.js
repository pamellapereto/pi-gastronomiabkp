const SVG_RENDER = 'http://www.w3.org/2000/svg';
//Cria um elemento SVG a partir dos dados disponbilizados pela Iconify
const renderIcons = (data, icon) => {
    const svg = document.createElementNS(
        SVG_RENDER,
        'svg'
    );
    const width = icon.width || 16;
    const height = icon.height || 16;
    svg.setAttribute(
        'viewBox',
        `0 0 ${width} ${height}`
    );
    svg.setAttribute('aria-hidden', 'true');
    svg.innerHTML = icon.body
    data.replaceChildren(svg);
}
//Cria um campo de senha com botão de visibilidade
const criarInputSenha = (input, icons) => {
    const divSenha = document.createElement('div');
    divSenha.className = 'divSenha';
    //Botão para mostrar ou ocultar a senha
    const btnVisibilidade = document.createElement('button');
    btnVisibilidade.type = 'button';
    btnVisibilidade.className = 'btnVisibilidade';
    btnVisibilidade.setAttribute('aria-label', 'Senha visível');
    btnVisibilidade.setAttribute('aria-pressed', 'false');
    renderIcons(btnVisibilidade, icons.visibleIcon);

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
            inputEstaVisivel ? icons.visibleIcon : icons.invisibleIcon
        );
    });
    divSenha.append(input, btnVisibilidade);
}
export default criarInputSenha;