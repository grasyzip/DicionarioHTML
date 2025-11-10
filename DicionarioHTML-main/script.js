document.addEventListener('DOMContentLoaded', function() {
    // atualiza o ano no footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // ativa a página atual no menu
    const currentPage = location.pathname.split('/').pop();
    const links = document.querySelectorAll('.main-nav a');
    
    links.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (currentPage === linkPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('ativo');
        }
    });
});