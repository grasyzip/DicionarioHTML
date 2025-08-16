document.addEventListener('DOMContentLoaded', function() {
    // Atualiza o ano no footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Adiciona classe ativa ao link correspondente à página atual
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        
        // Remove parâmetros de URL para comparação
        const cleanLinkPage = linkPage.split('?')[0];
        const cleanCurrentPage = currentPage.split('?')[0];
        
        if (cleanCurrentPage === cleanLinkPage || 
            (cleanCurrentPage === '' && cleanLinkPage === 'index.html')) {
            link.classList.add('ativo');
        } else {
            link.classList.remove('ativo');
        }
    });
    
    // Efeito suave ao clicar nos links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Melhoria para cards - adiciona hover em dispositivos touch
    const cards = document.querySelectorAll('.categoria-card');
    cards.forEach(card => {
        card.addEventListener('click', function() {
            // Se for um dispositivo touch, segue o link
            if ('ontouchstart' in window || navigator.maxTouchPoints) {
                const link = this.querySelector('h3 a');
                if (link) {
                    window.location.href = link.href;
                }
            }
        });
    });
    
    // Adiciona exemplo interativo simples
    const interactiveExample = document.createElement('div');
    interactiveExample.innerHTML = `
        <div style="margin: 2rem auto; padding: 1rem; background: #fef9e7; border-radius: 8px; text-align: center;">
            <h3 style="color: #323330;">Experimente JavaScript</h3>
            <button id="demo-btn" style="background: #f0db4f; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer;">
                Clique para ver um alerta
            </button>
        </div>
    `;
    
    document.querySelector('.hero').after(interactiveExample);
    
    document.getElementById('demo-btn').addEventListener('click', function() {
        alert('Isso é um alerta JavaScript! Bem-vindo ao dicionário JS!');
    });
});