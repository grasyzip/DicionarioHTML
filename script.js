// script dropdown
// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Carrega o cabeçalho
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('afterbegin', data);
            activateCurrentPage();
            setupMobileMenu();
        });
});

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
        
        if (currentPath.includes(linkPath)) {
            link.classList.add('ativo');
            
            // Ativa o dropdown pai se for um subitem
            const dropdown = link.closest('.dropdown-menu');
            if (dropdown) {
                const parentLink = dropdown.previousElementSibling;
                parentLink.classList.add('active-parent');
                const dropdownContainer = dropdown.closest('.dropdown');
                dropdownContainer.classList.add('active');
            }
            
            // Se for um link de dropdown principal, ativa o dropdown
            if (link.classList.contains('dropdown-toggle')) {
                link.closest('.dropdown').classList.add('active');
            }
        }
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

// para funcionalidade de pesquisa filtrada

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const tagCards = document.querySelectorAll('.tag-card');
    const noResults = document.getElementById('noResults');
    const tagList = document.querySelector('.tag-list');
    
    function searchTags() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        let hasMatches = false;
        
        // Resetar todos os cards antes de nova pesquisa
        tagCards.forEach(card => {
            card.classList.remove('hidden', 'match');
        });
        
        // Se campo vazio, mostrar todos
        if (searchTerm === '') {
            noResults.classList.remove('show');
            return;
        }
        
        // Filtrar tags
        tagCards.forEach(card => {
            const tagName = card.querySelector('.tag-name').textContent.toLowerCase();
            const tagDesc = card.querySelector('.tag-desc').textContent.toLowerCase();
            
            if (tagName.includes(searchTerm) || tagDesc.includes(searchTerm)) {
                card.classList.add('match');
                card.classList.remove('hidden');
                hasMatches = true;
            } else {
                card.classList.add('hidden');
            }
        });
        
        // Mostrar mensagem se não houver resultados
        noResults.classList.toggle('show', !hasMatches);
    }
    
    // Event listeners
    searchInput.addEventListener('input', searchTags);
    
    // Atalho de teclado Ctrl+K para focar na pesquisa
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            searchInput.focus();
        }
    });
    
    // Focar na barra de pesquisa ao carregar a página
    searchInput.focus();
});