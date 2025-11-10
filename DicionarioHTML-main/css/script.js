// script dropdown
// script.js

function activateCurrentPage() {
    const currentPath = window.location.pathname;
    const links = document.querySelectorAll('.main-nav a');
    
    // Remove todas as classes ativas primeiro
    links.forEach(link => {
        link.classList.remove('ativo');
        link.classList.remove('active-parent');
    });
    
    // Encontra o link correspondente à página atual
    links.forEach(link => {
        const linkPath = new URL(link.href).pathname;
        
    });
}

function setupMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            menuToggle.textContent = mainNav.classList.contains('active') ? '✕ Fechar' : '☰ Menu';
        });
    }
}

