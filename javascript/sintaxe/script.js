document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.btn-exemplo').forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const isVisible = targetElement.style.display === 'block';
                targetElement.style.display = isVisible ? 'none' : 'block';
                button.textContent = isVisible ? 'Ver Exemplo' : 'Ocultar Exemplo';
            }
        });
    });
});

// Atualiza o ano no footer
function updateFooterYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Funções de pesquisa (compartilhado entre páginas)
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const noResults = document.getElementById('noResults');
    const searchTerm = document.getElementById('searchTerm');
    const tagCards = document.querySelectorAll('.tag-card');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const term = this.value.toLowerCase().trim();
            let resultsFound = false;
            
            if (term === '') {
                // Mostrar todos os cards se a pesquisa estiver vazia
                tagCards.forEach(card => {
                    card.style.display = 'block';
                });
                noResults.style.display = 'none';
                return;
            }
            
            // Filtrar os cards
            tagCards.forEach(card => {
                const tagName = card.querySelector('.tag-name').textContent.toLowerCase();
                const tagDesc = card.querySelector('.tag-desc').textContent.toLowerCase();
                
                if (tagName.includes(term) || tagDesc.includes(term)) {
                    card.style.display = 'block';
                    resultsFound = true;
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Mostrar mensagem se não houver resultados
            if (!resultsFound) {
                noResults.style.display = 'block';
                searchTerm.textContent = term;
            } else {
                noResults.style.display = 'none';
            }
        });
    }
});
