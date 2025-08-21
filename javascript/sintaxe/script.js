let nome = prompt("Qual seu nome?");
        alert(`Olá, ${nome}! Bem-vindo ao tutorial de sintaxe JavaScript.`);

    // Função para executar exemplos de código
function executarExemplo(id) {
    const codigo = document.querySelector(`#${id} pre code`).textContent;
    try {
        const resultado = eval(codigo);
        document.querySelector(`#${id} .resultado`).innerHTML = 
            `<strong>Resultado:</strong><br>${JSON.stringify(resultado, null, 2)}`;
    } catch (e) {
        document.querySelector(`#${id} .resultado`).innerHTML = 
            `<strong>Erro:</strong><br>${e.message}`;
    }
}

        // Atualizar ano no footer
document.getElementById('current-year').textContent = new Date().getFullYear();

        // Função principal quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Configurar botões de exemplo
    setupExampleButtons();
    
    // Configurar a funcionalidade de pesquisa
    setupSearch();
    
    // Atualizar o ano no footer
    updateFooterYear();
});

// Configura os botões que mostram/exemplos os exemplos
function setupExampleButtons() {
    const buttons = document.querySelectorAll('.btn-exemplo');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Alternar a exibição do elemento alvo
                if (targetElement.style.display === 'none' || !targetElement.style.display) {
                    targetElement.style.display = 'block';
                    this.textContent = 'Ocultar Exemplo';
                } else {
                    targetElement.style.display = 'none';
                    this.textContent = 'Ver Exemplo';
                }
            }
        });
    });
}

// Configura a funcionalidade de pesquisa
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    const noResultsDiv = document.getElementById('noResults');
    const searchTermSpan = document.getElementById('searchTerm');
    const tagCards = document.querySelectorAll('.tag-card');
    
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.trim().toLowerCase();
        let hasResults = false;
        
        if (searchTerm === '') {
            // Se o campo estiver vazio, mostra todos os cards
            tagCards.forEach(card => {
                card.style.display = 'block';
            });
            noResultsDiv.style.display = 'none';
            return;
        }
        
        // Procura nos cards
        tagCards.forEach(card => {
            const cardText = card.textContent.toLowerCase();
            
            if (cardText.includes(searchTerm)) {
                card.style.display = 'block';
                hasResults = true;
            } else {
                card.style.display = 'none';
            }
        });
        
        // Mostra ou esconde a mensagem de nenhum resultado
        if (!hasResults) {
            noResultsDiv.style.display = 'block';
            searchTermSpan.textContent = searchTerm;
        } else {
            noResultsDiv.style.display = 'none';
        }
    });
}

// Atualiza o ano no footer
function updateFooterYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Função para executar exemplos de código (global para ser acessível nos botões HTML)
function executarExemplo(id) {
    const codigoElement = document.querySelector(`#${id} pre code`);
    const resultadoElement = document.querySelector(`#${id} .resultado`);
    
    if (!codigoElement || !resultadoElement) return;
    
    const codigo = codigoElement.textContent;
    
    try {
        // Cria um bloco de código para capturar console.log
        let output = '';
        const originalConsoleLog = console.log;
        
        console.log = function(...args) {
            output += args.join(' ') + '\n';
            originalConsoleLog.apply(console, args);
        };
        
        // Executa o código
        const resultado = eval(codigo);
        
        // Restaura o console.log original
        console.log = originalConsoleLog;
        
        // Se o código não imprimiu nada, mostra o resultado direto
        if (output === '' && resultado !== undefined) {
            output = resultado;
        }
        
        resultadoElement.innerHTML = `<strong>Resultado:</strong><pre>${output}</pre>`;
    } catch (e) {
        resultadoElement.innerHTML = `<strong>Erro:</strong><pre>${e.message}</pre>`;
    }
}

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