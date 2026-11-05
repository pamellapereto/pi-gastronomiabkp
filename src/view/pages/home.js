import navbar from "../components/navbar.js";

const renderHomePage = () => {
    const container = document.createElement('div');
    container.style.height = '100vh';
    container.className = 'container';

    const navigation = navbar();
    container.appendChild(navigation);

    return container;
}

export default renderHomePage;