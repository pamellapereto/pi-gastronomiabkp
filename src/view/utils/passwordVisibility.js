const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';

const renderIcon = (element, icon) => {
    const svg = document.createElementNS(SVG_NAMESPACE, 'svg');
    const width = icon.width || 16;
    const height = icon.height || 16;

    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.setAttribute('aria-hidden', 'true');
    svg.innerHTML = icon.body;

    element.replaceChildren(svg);
};

const createPasswordField = (input, icons) => {
    const field = document.createElement('div');
    field.className = 'password-field';

    const lock = document.createElement('span');
    lock.className = 'password-lock';
    renderIcon(lock, icons.lock);

    const visibilityButton = document.createElement('button');
    visibilityButton.type = 'button';
    visibilityButton.className = 'password-visibility';
    visibilityButton.setAttribute('aria-label', 'Mostrar senha');
    visibilityButton.setAttribute('aria-pressed', 'false');
    renderIcon(visibilityButton, icons.visible);

    visibilityButton.addEventListener('click', () => {
        const passwordIsVisible = input.type === 'text';

        input.type = passwordIsVisible ? 'password' : 'text';
        visibilityButton.setAttribute(
            'aria-label',
            passwordIsVisible ? 'Mostrar senha' : 'Ocultar senha'
        );
        visibilityButton.setAttribute(
            'aria-pressed',
            String(!passwordIsVisible)
        );
        renderIcon(
            visibilityButton,
            passwordIsVisible ? icons.visible : icons.invisible
        );
    });

    field.append(lock, input, visibilityButton);

    return field;
};

export default createPasswordField;
