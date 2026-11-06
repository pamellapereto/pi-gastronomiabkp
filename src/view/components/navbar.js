const navbar = () => {
    const container = document.createElement('div');
    /*medidas: vw = view width (horizontal);
    vh = view height (vertical)*/
    container.style.width = '100vw';
    container.style.height = '4rem';
    container.style.backgroundColor = '#3632a8';
    container.className = 'div-menu';

    const menu = document.createElement('ul');
    // const itens = ['Vagas', 'Minhas candidaturas']; //Conecta Talent (exemplo)
    const itens = ['Estoque', 'Pedidos']; //Senac (ex.)

    for (var i = 0; i < itens.length; i++) {
        console.log(itens[i]);
        const item = document.createElement('li');
        item.textContent = itens[i];
        menu.appendChild(item);
    }
    container.appendChild(menu);
    return container;
}
export default navbar;