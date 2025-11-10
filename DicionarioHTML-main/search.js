document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const tagCards = document.querySelectorAll('.tag-card');
    const noResults = document.getElementById('noResults');
    const tagList = document.querySelector('.tag-list');
    
    function searchTags() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        let hasMatches = false;
        
        // resetar todos os cards antes de nova pesquisa
        tagCards.forEach(card => {
            card.classList.remove('hidden', 'match');
        });
        
        // campo vazio, mostrar todos
        if (searchTerm === '') {
            noResults.classList.remove('show');
            return;
        }
        
        // filtra tags
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
        
        // mensagem se não houver resultados
        noResults.classList.toggle('show', !hasMatches);
    }
    
    // event listeners
    searchInput.addEventListener('input', searchTags);
    
    // atalho de teclado Ctrl+K para focar na pesquisa
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            searchInput.focus();
        }
    });
    
    // focar na barra de pesquisa ao carregar a página
    searchInput.focus();
});