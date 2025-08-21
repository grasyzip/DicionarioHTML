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